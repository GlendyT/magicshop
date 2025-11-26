// Constants
export const LASTFM_BASE_URL = process.env.LASTFM_API_URL;
export const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
export const ONE_HOUR_IN_SECONDS = 3600;
export const RECENT_TRACKS_LIMIT = 50;

export interface TargetSongInfo {
  id: number;
  name: string;
  artist: string;
  album: string;
  image: string;
}

export const TARGET_SONGS_INFO: TargetSongInfo[] = [
  {
    id: 1,
    name: "Wild Flower (with youjeen)",
    artist: "RM",
    album: "Indigo",
    image:
      "https://lastfm.freetls.fastly.net/i/u/300x300/27378cd645051d4c14ea809187bdf43b.jpg",
  },
  {
    id: 2,
    name: "Don’t Say You Love Me",
    artist: "Jin",
    album: "echo",
    image:
      "https://lastfm.freetls.fastly.net/i/u/300x300/a363a7b06089ccc1d7c86c8a4068be4f.jpg",
  },
  {
    id: 3,
    name: "Haegeum",
    artist: "Agust D",
    album: "D-DAY",
    image:
      "https://lastfm.freetls.fastly.net/i/u/300x300/074a8b263e09843098c775531215390e.jpg",
  },
  {
    id: 4,
    name: "Killin' It Girl (feat. GloRilla)",
    artist: "j-hope",
    album: "Killin' It Girl (feat. GloRilla)",
    image:
      "https://lastfm.freetls.fastly.net/i/u/300x300/ee5016fe3324be051b32ef1a873ee31d.jpg",
  },
  // {
  //   name: "Set Me Free Pt.2",
  //   artist: "Jimin",
  //   album: "FACE",
  //   image: "https://lastfm.freetls.fastly.net/i/u/300x300/269bc4df38f43f4f72bd31c9bfdbf020.jpg",
  // },
];
