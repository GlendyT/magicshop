"use server";

import { SpotifyData } from "@/types/types.spotify";
import {
  getBasicArtistData,
  getTokenSpotify,
  getMultipleBasicArtistData,
  getArtistDataById,
} from "./handlerSpotify";

export const loadArtistData = async (
  artistId: string
): Promise<SpotifyData | null> => {
  try {
    const token = await getTokenSpotify();
    const artistData = await getBasicArtistData(token, artistId);
    return artistData;
  } catch {
    console.error(`[Spotify] Failed to load artist data for ID ${artistId}`);
    return null;
  }
};

export const loadFullArtistData = async (
  artistId: string
): Promise<SpotifyData | null> => {
  try {
    const token = await getTokenSpotify();
    const artistData = await getArtistDataById(token, artistId);
    return artistData;
  } catch {
    console.error(`[Spotify] Failed to load full artist data for ID ${artistId}`);
    return null;
  }
};

export const loadMultipleArtistsData = async (
  artistIds: string[]
): Promise<Record<string, SpotifyData>> => {
  try {
    const token = await getTokenSpotify();
    const artistsData = await getMultipleBasicArtistData(token, artistIds);
    return artistsData;
  } catch {
    console.error('[Spotify] Failed to load multiple artists data');
    return {}; // Return empty object instead of throwing
  }
};
