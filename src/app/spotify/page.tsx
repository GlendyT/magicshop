import { loadMultipleArtistsData } from "services/spotify";
import { ARTISTS } from "./Data/btspotify";
import SpotifyClient from "./SpotifyClient";
//import Link from "next/link";

const SpotifyPage = async () => {
  const artistIds = ARTISTS.map((artist) => artist.id);
  const artistsData = await loadMultipleArtistsData(artistIds);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-100 to-violet-100 mx-auto px-4 py-2">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-black">BTS</h1>
        <p className="text-[0.7rem]">Data provided by Spotify Web API</p>
      </div>
      <SpotifyClient artists={ARTISTS} artistsData={artistsData} />
      {/* <div className="text-center mt-8">
        <Link
          href={"/spotify/playlistgenerator"}
          className="inline-block text-2xl font-semibold text-purple-600 hover:text-purple-800 underline transition-colors"
        >
          Create Custom Playlist →
        </Link>
      </div> */}
    </div>
  );
};

export default SpotifyPage;
