"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import { AllProviderProps, Spotify2ContextType } from "../types/index";
import {
  SpotifyTrack,
  Notification,
  SelectedTrack,
} from "../types/types.spotify";
import { useSearchParams } from "next/navigation";
import { ARTISTS } from "@/app/spotify/Data/btspotify";
import { loadFullArtistData } from "@/services/spotify";
import { createSpotifyPlaylist } from "@/services/spotifyAuth";

const SpotifyContext = createContext<Spotify2ContextType>(null!);

const SpotifyProvider = ({ children }: AllProviderProps) => {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<SpotifyTrack[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<
    Map<string, SelectedTrack>
  >(new Map());
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [artistFilter, setArtistFilter] = useState<string>("all");
  const [hasSearched, setHasSearched] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [targetDurationHours, setTargetDurationHours] = useState<number | null>(null);
  const [fillArtistIds, setFillArtistIds] = useState<string[]>([]);
  const [isFilling, setIsFilling] = useState(false);

  const showNotification = (
    type: "success" | "error" | "info",
    message: string,
    description?: string
  ) => {
    const id = Date.now();
    const newNotification: Notification = { id, type, message, description };
    setNotifications((prev) => [...prev, newNotification]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    // Check for access token in URL params
    const token = searchParams.get("access_token");
    if (token) {
      setAccessToken(token);
      localStorage.setItem("spotify_access_token", token);
      // Clean URL
      window.history.replaceState({}, "", "/spotify/playlistgenerator");
    } else {
      // Check localStorage
      const savedToken = localStorage.getItem("spotify_access_token");
      if (savedToken) {
        setAccessToken(savedToken);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const searchTracks = async () => {
      // Solo buscar si hay al menos 2 caracteres
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        setHasSearched(false);
        return;
      }

      setLoading(true);
      setHasSearched(true);
      try {
        const artistsToSearch =
          artistFilter === "all"
            ? ARTISTS
            : ARTISTS.filter((a) => a.id === artistFilter);

        const tracksPromises = artistsToSearch.map((artist) =>
          loadFullArtistData(artist.id)
        );
        const artistsData = await Promise.all(tracksPromises);

        const tracks: SpotifyTrack[] = [];
        artistsData.forEach((data) => {
          if (data?.allTracks) {
            tracks.push(...data.allTracks);
          }
        });

        // Remove duplicates based on track ID
        const uniqueTracks = Array.from(
          new Map(tracks.map((track) => [track.id, track])).values()
        );

        // Filter by search query
        const filtered = uniqueTracks.filter(
          (track) =>
            track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            track.artists.some((artist) =>
              artist.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) ||
            track.album.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSearchResults(filtered);
      } catch (error) {
        console.error("Error searching tracks:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(() => {
      searchTracks();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, artistFilter]);

  const toggleTrackSelection = (track: SpotifyTrack) => {
    const newSelected = new Map(selectedTracks);
    if (newSelected.has(track.id)) {
      newSelected.delete(track.id);
    } else {
      newSelected.set(track.id, { track, quantity: 1 });
    }
    setSelectedTracks(newSelected);
  };

  const updateQuantity = (trackId: string, delta: number) => {
    const newSelected = new Map(selectedTracks);
    const selected = newSelected.get(trackId);
    if (selected) {
      const newQuantity = Math.max(1, Math.min(10, selected.quantity + delta));
      newSelected.set(trackId, { ...selected, quantity: newQuantity });
      setSelectedTracks(newSelected);
    }
  };

  const generatePlaylist = async () => {
    if (!accessToken) {
      // Redirect to Spotify auth
      const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
      const redirectUri = `${baseUrl}/api/spotify/auth`;
      const scopes = "playlist-modify-private playlist-modify-public";

      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${encodeURIComponent(scopes)}`;

      window.location.href = authUrl;
      return;
    }

    setIsCreatingPlaylist(true);

    try {
      // Crear array simple con todas las canciones y sus repeticiones
      const allTracks: SpotifyTrack[] = [];
      selectedTracks.forEach(({ track, quantity }) => {
        for (let i = 0; i < quantity; i++) {
          allTracks.push(track);
        }
      });

      // Mezclar completamente todas las canciones de forma aleatoria
      const shuffledPlaylist = allTracks.sort(() => Math.random() - 0.5);

      // Get track URIs
      const trackUris = shuffledPlaylist.map(
        (track) => `spotify:track:${track.id}`
      );

      // Create playlist name with date
      const date = new Date().toLocaleDateString();
      const playlistName = `BTS Playlist - ${date}`;
      const description = `BTS playlist  ${shuffledPlaylist.length} songs generated with The Magic Shop`;

      const result = await createSpotifyPlaylist(
        accessToken,
        playlistName,
        trackUris,
        description
      );

      if (result.success) {
        showNotification(
          "success",
          "Playlist created successfully!",
          `${playlistName} with ${shuffledPlaylist.length} songs has been added to your Spotify`
        );
        setTimeout(() => {
          window.open(result.playlistUrl, "_blank");
        }, 1000);
      }
    } catch (error) {
      // Detectar error de autenticación (401)
      const isAuthError = 
        error instanceof Error && 
        (error.message.includes("session has expired") || 
         error.message.includes("login again") ||
         error.message.includes("401"));

      if (isAuthError) {
        // Limpiar token inválido
        localStorage.removeItem("spotify_access_token");
        setAccessToken(null);
        
        showNotification(
          "error",
          "Session expired",
          "Your Spotify session has expired. Please click 'Login' to continue."
        );
      } else {
        // Error genérico
        showNotification(
          "error",
          "Failed to create playlist",
          error instanceof Error ? error.message : "Please try again or check your connection"
        );
      }
    } finally {
      setIsCreatingPlaylist(false);
    }
  };

  const totalSongs = useMemo(() => {
    let total = 0;
    selectedTracks.forEach(({ quantity }) => {
      total += quantity;
    });
    return total;
  }, [selectedTracks]);

  const currentDuration = useMemo(() => {
    let totalMs = 0;
    selectedTracks.forEach(({ track, quantity }) => {
      totalMs += track.duration_ms * quantity;
    });
    const hours = Math.floor(totalMs / (1000 * 60 * 60));
    const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes, totalMs };
  }, [selectedTracks]);

  const handleLogout = () => {
    localStorage.removeItem("spotify_access_token");
    setAccessToken(null);
    showNotification(
      "success",
      "Logged out successfully",
      "You have been disconnected from Spotify"
    );
  };

  const toggleFillArtist = (artistId: string) => {
    setFillArtistIds((prev) => {
      if (prev.includes(artistId)) {
        return prev.filter((id) => id !== artistId);
      } else {
        return [...prev, artistId];
      }
    });
  };

  const clearAll = () => {
    setSelectedTracks(new Map());
    setTargetDurationHours(null);
    setFillArtistIds([]);
    setSearchQuery("");
    setArtistFilter("all");
    showNotification(
      "info",
      "Selection cleared",
      "All songs, duration, and filters have been reset"
    );
  };

  const fillPlaylistToTarget = async () => {
    if (fillArtistIds.length === 0 || !targetDurationHours) {
      showNotification(
        "error",
        "Missing information",
        "Please select at least one artist and target duration"
      );
      return;
    }

    if (selectedTracks.size === 0) {
      showNotification(
        "error",
        "No songs selected",
        "Please add at least one song to your playlist"
      );
      return;
    }

    setIsFilling(true);
    try {
      // Cargar todas las canciones de los artistas seleccionados
      const artistsDataPromises = fillArtistIds.map((artistId) => 
        loadFullArtistData(artistId)
      );
      const artistsData = await Promise.all(artistsDataPromises);
      
      // Combinar todas las canciones de todos los artistas
      const allArtistTracks: SpotifyTrack[] = [];
      const artistNames: string[] = [];
      
      artistsData.forEach((artistData) => {
        if (artistData && artistData.allTracks && artistData.allTracks.length > 0) {
          allArtistTracks.push(...artistData.allTracks);
          if (artistData.artist?.name) {
            artistNames.push(artistData.artist.name);
          }
        }
      });
      
      if (allArtistTracks.length === 0) {
        showNotification(
          "error",
          "No tracks found",
          "Could not load tracks from the selected artists"
        );
        return;
      }

      const targetMs = targetDurationHours * 60 * 60 * 1000;
      const currentMs = currentDuration.totalMs;
      const remainingMs = targetMs - currentMs;

      if (remainingMs <= 0) {
        showNotification(
          "info",
          "Playlist already complete",
          `Your playlist duration (${currentDuration.hours}h ${currentDuration.minutes}m) already meets or exceeds the target (${targetDurationHours}h)`
        );
        return;
      }

      // Filtrar canciones que no estén ya en la playlist
      const selectedTrackIds = new Set(Array.from(selectedTracks.keys()));
      const availableTracks = allArtistTracks.filter(
        (track) => !selectedTrackIds.has(track.id)
      );

      if (availableTracks.length === 0) {
        showNotification(
          "error",
          "No available tracks",
          "All songs from this artist are already in your playlist"
        );
        return;
      }

      // Mezclar canciones disponibles
      const shuffled = [...availableTracks].sort(() => Math.random() - 0.5);

      // Agregar canciones hasta completar la duración
      const newSelected = new Map(selectedTracks);
      let filledMs = 0;
      let tracksAdded = 0;

      for (const track of shuffled) {
        if (filledMs >= remainingMs) break;
        
        newSelected.set(track.id, { track, quantity: 1 });
        filledMs += track.duration_ms;
        tracksAdded++;
      }

      setSelectedTracks(newSelected);
      
      const finalHours = Math.floor((currentMs + filledMs) / (1000 * 60 * 60));
      const finalMinutes = Math.floor(((currentMs + filledMs) % (1000 * 60 * 60)) / (1000 * 60));
      
      const artistsText = artistNames.length > 1 
        ? `${artistNames.slice(0, -1).join(", ")} and ${artistNames[artistNames.length - 1]}`
        : artistNames[0];
      
      showNotification(
        "success",
        "Playlist completed!",
        `Added ${tracksAdded} songs from ${artistsText}. Duration: ${finalHours}h ${finalMinutes}m`
      );
    } catch (error) {
      console.error("Error filling playlist:", error);
      showNotification(
        "error",
        "Failed to fill playlist",
        "Please try again or select a different artist"
      );
    } finally {
      setIsFilling(false);
    }
  };

  return (
    <SpotifyContext.Provider
      value={{
        searchResults,
        setSearchQuery,
        loading,
        setArtistFilter,
        hasSearched,
        isCreatingPlaylist,
        notifications,
        removeNotification,
        toggleTrackSelection,
        updateQuantity,
        generatePlaylist,
        totalSongs,
        handleLogout,
        accessToken,
        selectedTracks,
        searchQuery,
        artistFilter,
        targetDurationHours,
        setTargetDurationHours,
        fillArtistIds,
        toggleFillArtist,
        currentDuration,
        fillPlaylistToTarget,
        isFilling,
        clearAll,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

export { SpotifyProvider };
export default SpotifyContext;
