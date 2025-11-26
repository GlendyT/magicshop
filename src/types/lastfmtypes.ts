import { TargetSongInfo } from "constants/constants";

// Interface for Last.fm track data
export interface LastfmTrack {
  id: number;
  name: string;
  artist: { "#text": string };
  album?: { "#text": string };
  url?: string;
  image?: Array<{ "#text": string }>;
  streamable?: string;
  date?: {
    "#text": string;
    uts: string;
  };
}

export interface LastfmResponse {
  recenttracks?: {
    track: LastfmTrack[] | LastfmTrack;
  };
  error?: number;
  message?: string;
}

export interface SongDetails {
  id: number;
  name: string;
  artist: string;
  album: string;
  url: string;
  image: string; // URL de la imagen más grande disponible
  streamable: boolean;
  playedAt?: string; // Fecha legible
  timestamp?: number; // Unix timestamp
  isFound?: boolean; // Si fue encontrada en el historial del usuario
}

export interface UserInfo {
  name: string;
  realname?: string;
  image: string; // URL de la imagen del usuario
  playcount?: string;
  url?: string;
}

export interface TrackResult {
  found: boolean;
  allTargetSongs: SongDetails[]; // Todas las canciones objetivo con información de Last.fm
  userExists: boolean;
  error?: string;
  userInfo?: UserInfo;
}

export interface SongCardProps {
  song: SongDetails | TargetSongInfo;
  isFound?: boolean;
}

export interface UserSectionProps {
  userExists?: boolean;
  userInfo?: UserInfo;
}

export interface GridLayoutProps {
  songs: (SongDetails | TargetSongInfo)[];
  userExists?: boolean;
  userInfo?: UserInfo;
}
