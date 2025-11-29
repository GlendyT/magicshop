export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  followers: {
    total: number;
  };
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  popularity: number;
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  release_date: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  external_urls: {
    spotify: string;
  };
  album_type: string;
  tracks?: SpotifyTrack[];
}

export interface SpotifyTrack {
  id: string;
  name: string;
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
  album: {
    name: string;
    release_date: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
  };
  artists: {
    id: string;
    name: string;
  }[];
  duration_ms: number;
  popularity: number;
  explicit: boolean;
}

export interface SpotifyData {
  artist: SpotifyArtist | null;
  albums: SpotifyAlbum[];
  albumsWithTracks: SpotifyAlbum[];
  topTracks: SpotifyTrack[];
  allTracks: SpotifyTrack[];
}

export interface SelectedTrack {
  track: SpotifyTrack;
  quantity: number;
}

export interface Notification {
  id: number;
  type: 'success' | 'error' | 'info';
  message: string;
  description?: string;
}

export interface PlaylistDuration {
  hours: number;
  minutes: number;
  totalMs: number;
}
