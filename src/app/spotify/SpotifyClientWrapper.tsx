"use client";

import { useBTSMembers } from "lib/useBTS";
import SpotifyClient from "./SpotifyClient";
import { loadMultipleArtistsData } from "services/spotify";
import { useEffect, useState } from "react";

import { SpotifyData } from "@/types/types.spotify";

export default function SpotifyClientWrapper() {
  const { btsMembers, isLoading } = useBTSMembers();
  const [artistsData, setArtistsData] = useState<Record<string, SpotifyData> | null>(null);

  useEffect(() => {
    if (btsMembers.length > 0) {
      const artistIds = btsMembers.map((artist) => artist.spotifyUrl);
      loadMultipleArtistsData(artistIds).then(setArtistsData);
    }
  }, [btsMembers]);

  if (isLoading || !artistsData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-100 to-violet-100 mx-auto px-4 py-2">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-black">BTS</h1>
        <p className="text-[0.7rem]">Data provided by Spotify Web API</p>
      </div>
      <SpotifyClient artists={btsMembers} artistsData={artistsData} />
    </div>
  );
}
