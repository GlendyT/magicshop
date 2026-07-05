"use server";

import { TARGET_SONGS_INFO } from "constants/constants";
import { SongDetails, TrackResult, UserInfo } from "@/types/lastfmtypes";

const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played";
const USER_PROFILE_URL = "https://api.spotify.com/v1/me";
const ONE_HOUR_MS = 60 * 60 * 1000;
// Spotify permite máximo 50 items en recently-played
const RECENTLY_PLAYED_LIMIT = 50;

// ─── Tipos internos ────────────────────────────────────────────────────────────

interface SpotifyRecentItem {
  played_at: string; // ISO 8601 timestamp
  track: {
    id: string;
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string; width: number; height: number }>;
    };
    external_urls: { spotify: string };
    duration_ms: number;
  };
}

interface SpotifyUserProfile {
  id: string;
  display_name: string | null;
  email: string;
  images: Array<{ url: string }>;
  external_urls: { spotify: string };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const normalizeName = (name: string): string => name.toLowerCase().trim();

const getLargestImage = (
  images: Array<{ url: string }> | undefined
): string => {
  if (!images || images.length === 0) return "";
  return images[0].url;
};

const fetchWithToken = async (url: string, accessToken: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(8000),
  });

  if (response.status === 401) {
    throw new Error("SPOTIFY_TOKEN_EXPIRED");
  }

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status}`);
  }

  return response.json();
};

// ─── Funciones exportadas ─────────────────────────────────────────────────────

/**
 * Obtiene el perfil del usuario autenticado en Spotify.
 */
export const getSpotifyUserProfile = async (
  accessToken: string
): Promise<UserInfo | null> => {
  try {
    const data: SpotifyUserProfile = await fetchWithToken(
      USER_PROFILE_URL,
      accessToken
    );

    return {
      name: data.display_name || data.id,
      realname: data.display_name || "",
      image: getLargestImage(data.images),
      playcount: "0",
      url: data.external_urls.spotify,
    };
  } catch (error) {
    console.error("[BTS FIFA Spotify] Error fetching user profile:", error);
    return null;
  }
};

/**
 * Verifica si el usuario autenticado escuchó las canciones objetivo
 * en la última hora usando el historial de Spotify.
 */
export const checkSpotifyRecentTracks = async (
  accessToken: string
): Promise<TrackResult> => {
  try {
    if (!accessToken?.trim()) {
      return {
        found: false,
        allTargetSongs: [],
        userExists: false,
        error: "Spotify access token is required",
      };
    }

    // Paso 1: Obtener el perfil del usuario
    const userInfo = await getSpotifyUserProfile(accessToken);

    if (!userInfo) {
      return {
        found: false,
        allTargetSongs: [],
        userExists: false,
        error: "Could not fetch Spotify user profile",
      };
    }

    // Paso 2: Preparar las canciones objetivo como base
    const targetSongsInfo: SongDetails[] = TARGET_SONGS_INFO.map((song) => ({
      id: song.id,
      name: song.name,
      artist: song.artist,
      album: song.album,
      url: "",
      image: song.image,
      streamable: false,
      isFound: false,
    }));

    // Paso 3: Obtener el historial reciente del usuario (última hora)
    const oneHourAgo = new Date(Date.now() - ONE_HOUR_MS).toISOString();
    const url = `${RECENTLY_PLAYED_URL}?limit=${RECENTLY_PLAYED_LIMIT}&after=${new Date(
      Date.now() - ONE_HOUR_MS
    ).getTime()}`;

    const data = await fetchWithToken(url, accessToken);

    const items: SpotifyRecentItem[] = data.items ?? [];

    if (items.length === 0) {
      return {
        found: false,
        allTargetSongs: targetSongsInfo,
        userExists: true,
        error: "No recent tracks found in the last hour",
        userInfo,
      };
    }

    // Paso 4: Filtrar solo las canciones escuchadas en la última hora
    const recentItems = items.filter((item) => {
      const playedAt = new Date(item.played_at).getTime();
      return playedAt >= Date.now() - ONE_HOUR_MS;
    });

    // Paso 5: Verificar cuáles canciones objetivo están en el historial
    let foundCount = 0;

    const allTargetSongsWithStatus = targetSongsInfo.map((targetSong) => {
      const normalizedTarget = normalizeName(targetSong.name);

      const foundItem = recentItems.find((item) => {
        const normalizedTrackName = normalizeName(item.track.name);
        return normalizedTrackName === normalizedTarget;
      });

      if (foundItem) {
        foundCount++;
        return {
          ...targetSong,
          artist: foundItem.track.artists.map((a) => a.name).join(", "),
          album: foundItem.track.album.name,
          url: foundItem.track.external_urls.spotify,
          image:
            getLargestImage(foundItem.track.album.images) || targetSong.image,
          streamable: true,
          playedAt: foundItem.played_at,
          timestamp: new Date(foundItem.played_at).getTime() / 1000,
          isFound: true,
        };
      }

      return { ...targetSong, isFound: false };
    });

    return {
      found: foundCount === TARGET_SONGS_INFO.length,
      allTargetSongs: allTargetSongsWithStatus,
      userExists: true,
      userInfo,
    };
  } catch (error) {
    const isExpired =
      error instanceof Error && error.message === "SPOTIFY_TOKEN_EXPIRED";

    console.error("[BTS FIFA Spotify] Error checking recent tracks:", error);

    return {
      found: false,
      allTargetSongs: [],
      userExists: false,
      error: isExpired
        ? "Tu sesión de Spotify expiró. Por favor vuelve a conectar."
        : "Error al consultar tu historial de Spotify",
    };
  }
};

// Re-export oneHourAgo para uso externo si se necesita
export { ONE_HOUR_MS, RECENTLY_PLAYED_LIMIT };
