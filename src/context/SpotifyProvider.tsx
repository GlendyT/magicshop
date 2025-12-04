"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import { AllProviderProps, Spotify2ContextType } from "../types/index";
import { SpotifyTrack, SelectedTrack } from "../types/types.spotify";
import { useSearchParams } from "next/navigation";
import { ARTISTS } from "@/app/spotify/Data/btspotify";
import { loadFullArtistData } from "@/services/spotify";
import { createSpotifyPlaylist } from "@/services/spotifyAuth";
import { toast } from "react-toastify";

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
  const [targetDurationHours, setTargetDurationHours] = useState<number | null>(
    null
  );
  const [fillArtistIds, setFillArtistIds] = useState<string[]>([]);
  const [isFilling, setIsFilling] = useState(false);
  const [expandedPlaylist, setExpandedPlaylist] = useState<SpotifyTrack[]>([]);

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
    updateExpandedPlaylist(newSelected);
  };

  const updateQuantity = (trackId: string, delta: number) => {
    const newSelected = new Map(selectedTracks);
    const selected = newSelected.get(trackId);
    if (selected) {
      const newQuantity = Math.max(1, Math.min(10, selected.quantity + delta));
      newSelected.set(trackId, { ...selected, quantity: newQuantity });
      setSelectedTracks(newSelected);
      updateExpandedPlaylist(newSelected);
    }
  };

  const updateExpandedPlaylist = (tracks: Map<string, SelectedTrack>) => {
    const expanded: SpotifyTrack[] = [];
    tracks.forEach(({ track, quantity }) => {
      for (let i = 0; i < quantity; i++) {
        expanded.push(track);
      }
    });
    // Shuffle randomly
    const shuffled = [...expandedPlaylist];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setExpandedPlaylist(shuffled);
  };

  const shufflePlaylist = () => {
    const shuffled = [...expandedPlaylist].sort(() => Math.random() - 0.5);
    setExpandedPlaylist(shuffled);
    toast.info("Playlist shuffled!");
  };

  const removeTrackFromPreview = (trackId: string, indexToRemove: number) => {
    // Remove only one instance from the preview
    const newExpandedPlaylist = expandedPlaylist.filter(
      (_, i) => i !== indexToRemove
    );
    setExpandedPlaylist(newExpandedPlaylist);

    // Update selectedtracks
    const newSelected = new Map(selectedTracks);
    const selected = newSelected.get(trackId);

    if (selected) {
      if (selected.quantity > 1) {
        // Decrease quantity by 1
        newSelected.set(trackId, {
          ...selected,
          quantity: selected.quantity - 1,
        });
      } else {
        // Remove completely if quantity is 1
        newSelected.delete(trackId);
      }
      setSelectedTracks(newSelected);
    }
  };

  const reorderPlaylist = (newOrder: SpotifyTrack[]) => {
    setExpandedPlaylist(newOrder);
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
      // Usar la playlist expandida que ya está mezclada
      const trackUris = expandedPlaylist.map(
        (track) => `spotify:track:${track.id}`
      );

      // Create playlist name with date
      const date = new Date().toLocaleDateString();
      const playlistName = `BTS Playlist - ${date}`;
      const description = `BTS playlist ${expandedPlaylist.length} songs generated with The Magic Shop`;

      const result = await createSpotifyPlaylist(
        accessToken,
        playlistName,
        trackUris,
        description
      );

      if (result.success) {
        toast.success("Playlist created successfully!");
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

        toast.error("Session expired. Please log in again.");
      } else {
        // Error genérico
        toast.error("Failed to create playlist. Please try again.");
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
    toast.info("Logged out from Spotify");
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
    setExpandedPlaylist([]);
    setTargetDurationHours(null);
    setFillArtistIds([]);
    setSearchQuery("");
    setArtistFilter("all");
    toast.info("Cleared all selections");
  };

  const fillPlaylistToTarget = async () => {
    if (fillArtistIds.length === 0 || !targetDurationHours) {
      toast.error(
        "Please select at least one artist and set a target duration"
      );
      return;
    }

    if (selectedTracks.size === 0) {
      toast.error("Please select at least one track in your playlist");
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
        if (
          artistData &&
          artistData.allTracks &&
          artistData.allTracks.length > 0
        ) {
          allArtistTracks.push(...artistData.allTracks);
          if (artistData.artist?.name) {
            artistNames.push(artistData.artist.name);
          }
        }
      });

      if (allArtistTracks.length === 0) {
        toast.error("No tracks found for the selected artists");
        return;
      }

      const targetMs = targetDurationHours * 60 * 60 * 1000;
      const currentMs = currentDuration.totalMs;
      const remainingMs = targetMs - currentMs;

      if (remainingMs <= 0) {
        toast.info(
          "Your playlist already meets or exceeds the target duration"
        );
        return;
      }

      // Filtrar canciones que no estén ya en la playlist
      const selectedTrackIds = new Set(Array.from(selectedTracks.keys()));
      const availableTracks = allArtistTracks.filter(
        (track) => !selectedTrackIds.has(track.id)
      );

      if (availableTracks.length === 0) {
        toast.error("No additional tracks available to fill the playlist");
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
      updateExpandedPlaylist(newSelected);

      const finalHours = Math.floor((currentMs + filledMs) / (1000 * 60 * 60));
      const finalMinutes = Math.floor(
        ((currentMs + filledMs) % (1000 * 60 * 60)) / (1000 * 60)
      );

      const artistsText =
        artistNames.length > 1
          ? `${artistNames.slice(0, -1).join(", ")} and ${
              artistNames[artistNames.length - 1]
            }`
          : artistNames[0];

      toast.success(
        `Added ${tracksAdded} songs from ${artistsText}. New duration: ${finalHours}h ${finalMinutes}m`
      );
    } catch (error) {
      console.error("Error filling playlist:", error);
      toast.error("Failed to fill playlist. Please try again.");
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
        expandedPlaylist,
        shufflePlaylist,
        removeTrackFromPreview,
        reorderPlaylist,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

export { SpotifyProvider };
export default SpotifyContext;
