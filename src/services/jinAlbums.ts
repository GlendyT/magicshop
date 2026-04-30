"use server";

import { SpotifyTrack } from "@/types/types.spotify";

import { getTokenSpotify, getAllArtistTracks } from "./handlerSpotify";

const JIN_ARTIST_ID = "5vV3bFXnN6D6N3Nj4xRvaV";
const TRACKS_CACHE_KEY = "jin_all_tracks_cache";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

export const getAllJinTracks = async (): Promise<SpotifyTrack[]> => {
  try {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(TRACKS_CACHE_KEY);
      if (cached) {
        const { tracks, timestamp } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_DURATION;

        if (!isExpired) {
          return tracks;
        }
      }
    }

    const token = await getTokenSpotify();
    const tracks = await getAllArtistTracks(token, JIN_ARTIST_ID);

    if (typeof window !== "undefined") {
      const cacheData = {
        tracks: tracks,
        timestamp: Date.now(),
      };
      localStorage.setItem(TRACKS_CACHE_KEY, JSON.stringify(cacheData));
    }

    return tracks;
  } catch (error) {
    console.error("[JIN Albums] Failed to load all JIN tracks:", error);
    return [];
  }
};
