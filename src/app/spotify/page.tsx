import { loadMultipleArtistsData } from "services/spotify";
import { ARTISTS } from "./Data/btspotify";
import SpotifyClient from "./SpotifyClient";


const SpotifyPage = async () => {
  const artistIds = ARTISTS.map(artist => artist.id);
  const artistsData = await loadMultipleArtistsData(artistIds);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-violet-400 mx-auto px-4 py-2">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-black">BTS</h1>
        <p className="text-[0.7rem]">Data provided by Spotify Web API</p>
      </div>
      <SpotifyClient artists={ARTISTS} artistsData={artistsData} />
    </div>
  );
};

export default SpotifyPage;
