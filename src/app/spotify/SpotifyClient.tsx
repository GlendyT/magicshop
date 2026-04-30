"use client";

import { SpotifyData } from "@/types/types.spotify";
import ArtistCard from "./ArtistCard";

interface SpotifyClientProps {
  artists: { name: string; spotifyUrl: string }[];
  artistsData: Record<string, SpotifyData>;
}

export default function SpotifyClient({
  artists,
  artistsData,
}: SpotifyClientProps) {
  const loadArtistData = async (
    artistId: string,
  ): Promise<SpotifyData | null> => {
    return artistsData[artistId] || null;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
      {artists.map((artist) => (
        <ArtistCard
          key={artist.spotifyUrl}
          artistName={artist.name}
          artistId={artist.spotifyUrl}
          onLoadArtist={loadArtistData}
        />
      ))}
    </div>
  );
}
