"use server";

import {
  LastfmResponse,
  TrackResult,
  UserInfo,
  SongDetails,
  LastfmTrack,
} from "@/types/lastfmtypes";
import {
  ONE_HOUR_IN_SECONDS,
  RECENT_TRACKS_LIMIT,
  TARGET_SONGS_INFO,
} from "constants/constants";
import { buildLastfmUrl, handleApiError } from "./handlerLastFm";



const fetchWithTimeout = async (url: string, timeout = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "MagicShop/1.0",
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// Utility functions
const getLargestImage = (
  images: Array<{ "#text": string }> | undefined
): string => {
  return images && images.length > 0 ? images[images.length - 1]["#text"] : "";
};

const normalizeName = (name: string): string => {
  return name.toLowerCase().trim();
};

const fetchLastfmData = async (
  method: string,
  params: Record<string, string>
) => {
  const url = buildLastfmUrl(method, params);
  const response = await fetchWithTimeout(url);

  if (!response.ok) {
    if (response.status === 404) {
      return { error: 6, message: "User not found" };
    }
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

const handleLastfmError = (
  error: unknown,
  operation: string,
  username?: string
) => {
  console.error(`Error ${operation}:`, error);
  if (username) {
    console.error(`Username: ${username}`);
  }
};

const processFoundTrack = (
  targetSong: SongDetails,
  foundTrack: LastfmTrack
): SongDetails => {
  return {
    ...targetSong,
    artist: foundTrack.artist["#text"],
    album: foundTrack.album ? foundTrack.album["#text"] : targetSong.album,
    url: foundTrack.url || targetSong.url,
    image: getLargestImage(foundTrack.image) || targetSong.image,
    streamable: foundTrack.streamable === "1",
    playedAt: foundTrack.date ? foundTrack.date["#text"] : "Currently playing",
    timestamp: foundTrack.date
      ? parseInt(foundTrack.date.uts)
      : Math.floor(Date.now() / 1000),
    isFound: true,
  };
};

const isTrackInTimeRange = (
  track: LastfmTrack,
  oneHourAgo: number
): boolean => {
  if (!track.date) {
    console.log(`Found "${track.name}" - Currently playing`);
    return true;
  }

  const trackTimestamp = parseInt(track.date.uts);
  return trackTimestamp >= oneHourAgo;
};

// Main functions
export const checkUserExists = async (username: string): Promise<boolean> => {
  try {
    const data = await fetchLastfmData("user.getinfo", { user: username });
    return !data.error && !!data.user?.name;
  } catch (error) {
    handleLastfmError(error, "checking user existence", username);
    return false;
  }
};

// Función para obtener información del usuario
export const getUserInfo = async (
  username: string
): Promise<UserInfo | null> => {
  try {
    const data = await fetchLastfmData("user.getinfo", { user: username });

    if (data.error || !data.user) {
      return null;
    }

    return {
      name: data.user.name,
      realname: data.user.realname || "",
      image: getLargestImage(data.user.image),
      playcount: data.user.playcount || "0",
      url: data.user.url || "",
    };
  } catch (error) {
    handleLastfmError(error, "getting user info", username);
    return null;
  }
};

export const checkRecentTrack = async (
  username: string
): Promise<TrackResult> => {
  try {
    if (!username?.trim()) {
      return {
        found: false,
        allTargetSongs: [],
        userExists: false,
        error: "Username is required",
      };
    }

    const userExists = await checkUserExists(username);
    if (!userExists) {
      return {
        found: false,
        allTargetSongs: [],
        userExists: false,
        error: "User not found on Last.fm",
      };
    }

    // Obtener información del usuario
    const userInfo = await getUserInfo(username);

    // Paso 1: Usar TARGET_SONGS_INFO como base de datos
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

    // Paso 2: Obtener el historial reciente del usuario
    const data: LastfmResponse = await fetchLastfmData("user.getrecenttracks", {
      user: username,
      limit: RECENT_TRACKS_LIMIT.toString(),
    });

    if (data.error || !data.recenttracks?.track) {
      return {
        found: false,
        allTargetSongs: targetSongsInfo,
        userExists: true,
        error: "No recent tracks found",
        userInfo: userInfo || undefined,
      };
    }

    // Normalizar tracks: puede ser un array o un solo objeto
    const tracks = Array.isArray(data.recenttracks.track)
      ? data.recenttracks.track
      : [data.recenttracks.track];

    // Paso 3: Verificar cuáles canciones el usuario ha escuchado en la última hora
    const oneHourAgo = Math.floor(Date.now() / 1000) - ONE_HOUR_IN_SECONDS;
    let foundCount = 0;

    const allTargetSongsWithStatus = targetSongsInfo.map((targetSong) => {
      const normalizedTargetName = normalizeName(targetSong.name);

      const foundInHistory = tracks.find((track) => {
        const nameMatches = normalizeName(track.name) === normalizedTargetName;
        return nameMatches && isTrackInTimeRange(track, oneHourAgo);
      });

      if (foundInHistory) {
        foundCount++;
        return processFoundTrack(targetSong, foundInHistory);
      }

      return { ...targetSong, isFound: false };
    });
    return {
      found: foundCount === TARGET_SONGS_INFO.length,
      allTargetSongs: allTargetSongsWithStatus,
      userExists: true,
      userInfo: userInfo || undefined,
    };
  } catch (error) {
    return handleApiError(error);
  }
};
