import { LastfmTrack, SongDetails, TrackResult } from "@/types/lastfmtypes";
import { LASTFM_API_KEY, LASTFM_BASE_URL, TARGET_SONGS_INFO } from "constants/constants";

// Validation
if (!LASTFM_BASE_URL || !LASTFM_API_KEY) {
  throw new Error("Missing Last.fm API configuration");
}

// Helper functions
export const buildLastfmUrl = (method: string, params: Record<string, string>) => {
   const url = new URL(LASTFM_BASE_URL!);
  url.searchParams.set("method", method);
  url.searchParams.set("api_key", LASTFM_API_KEY!);
  url.searchParams.set("format", "json");

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
};

export const handleApiError = (error: unknown): TrackResult => {
  console.error("Last.fm API error:", error);
  return {
    found: false,
    allTargetSongs: [],
    userExists: false,
    error: error instanceof Error ? error.message : "Unknown error occurred",
  };
};

export const isMatchingTrack = (
  track: LastfmTrack,
  targetSong: string,
  oneHourAgo: number
): boolean => {
  if (track.name !== targetSong) return false;
  if (!track.date) return true; // Currently playing
  return parseInt(track.date.uts) >= oneHourAgo;
};

export const createSongDetails = (track: LastfmTrack): SongDetails => ({
  name: track.name,
  artist: track.artist["#text"],
  album: track.album?.["#text"] || "Unknown Album",
  url: track.url || "",
  image: track.image?.[track.image.length - 1]?.["#text"] || "",
  streamable: track.streamable === "1",
  playedAt: track.date?.["#text"] || "Currently playing",
  timestamp: track.date
    ? parseInt(track.date.uts)
    : Math.floor(Date.now() / 1000),
});

export const findMatchingSongs = (
  tracks: LastfmTrack[],
  oneHourAgo: number
): SongDetails[] => {
  return TARGET_SONGS_INFO.map((targetSong) =>
    tracks.find((track) => isMatchingTrack(track, targetSong.name, oneHourAgo))
  )
    .filter(Boolean)
    .map((track) => createSongDetails(track!));
};
