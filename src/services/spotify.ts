"use server";

import { SpotifyData } from "@/types/types.spotify";
import { getBasicArtistData, getTokenSpotify, getMultipleBasicArtistData, getArtistDataById } from "./express";

export const loadArtistData = async (
  artistId: string
): Promise<SpotifyData | null> => {
  try {
    const token = await getTokenSpotify();
    const artistData = await getBasicArtistData(token, artistId);
    return artistData;
  } catch (error) {
    console.error(`Error loading artist ID ${artistId}:`, error);
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
  } catch (error) {
    console.error(`Error loading full artist data for ID ${artistId}:`, error);
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
  } catch (error) {
    console.error('Error loading multiple artists:', error);
    throw error;
  }
};

