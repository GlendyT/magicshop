"use server";

import { SpotifyAlbum } from "@/types/types.spotify";
import {
  getTokenSpotify,
  getAllArtistAlbums,
  getAlbumTracks,
  getAlbumsWithTracks,
} from "./handlerSpotify";

const HOBI_ARTIST_ID = "0b1sIQumIAsNbqAoIClSpy";
const CACHE_KEY = "hobi_albums_cache";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

interface CacheData {
  albums: SpotifyAlbum[];
  timestamp: number;
}

export const getHOBIAlbums = async (): Promise<SpotifyAlbum[]> => {
  try {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { albums, timestamp }: CacheData = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_DURATION;

        if (!isExpired) {
          return albums.filter(
            (album) => album.album_type === "album" || album.album_type === "single"
          );
        }
      }
    }

    const token = await getTokenSpotify();
    const albums = await getAllArtistAlbums(token, HOBI_ARTIST_ID);
    const filteredAlbums = albums.filter(
      (album) => album.album_type === "album" || album.album_type === "single"
    );

    // Opcional: Puedes descomentar esta línea temporalmente para verificar en consola que te trae los álbumes correctos
    // console.log("[HOBI Albums] Fetched albums:", filteredAlbums.map(a => a.name));

    if (typeof window !== "undefined") {
      const cacheData: CacheData = {
        albums: filteredAlbums,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    }

    return filteredAlbums;
  } catch (error) {
    console.error("[HOBI Albums] Failed to load HOBI albums:", error);
    return [];
  }
};

export interface HobiMusicGroup {
  id: string;
  name: string;
  songs: { id: string; title: string }[];
}

export const getHobiGroupedMusic = async (): Promise<HobiMusicGroup[]> => {
  try {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("hobi_grouped_music_cache");
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_DURATION;

        if (!isExpired) {
          return data;
        }
      }
    }

    const token = await getTokenSpotify();
    const allAlbums = await getAlbumsWithTracks(token, HOBI_ARTIST_ID);
    
    const albums: HobiMusicGroup[] = [];
    const singles: HobiMusicGroup = {
      id: "singles_group",
      name: "Singles",
      songs: []
    };

    allAlbums.forEach((album) => {
      if (album.album_type === "album") {
        albums.push({
          id: album.id,
          name: album.name,
          songs: album.tracks?.map((t) => ({ id: t.id, title: t.name })) || []
        });
      } else {
        const singleTracks = album.tracks?.map((t) => ({ id: t.id, title: t.name })) || [];
        singles.songs.push(...singleTracks);
      }
    });

    const uniqueSingleSongs = Array.from(new Map(singles.songs.map((s) => [s.title, s])).values());
    singles.songs = uniqueSingleSongs;

    if (singles.songs.length > 0) {
      albums.push(singles);
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("hobi_grouped_music_cache", JSON.stringify({
        data: albums,
        timestamp: Date.now()
      }));
    }

    return albums;
  } catch (error) {
    console.error("[HOBI Albums] Failed to load grouped HOBI albums:", error);
    return [];
  }
};


export const getAllSongsFromAlbum = async (albumId: string): Promise<string[]> => {
  try {
    const token = await getTokenSpotify();
    const tracks = await getAlbumTracks(token, albumId);
    return tracks.map((track) => track.name);
  } catch (error) {
    console.error("[HOBI Albums] Failed to get all songs from album:", error);
    return [];
  }
};