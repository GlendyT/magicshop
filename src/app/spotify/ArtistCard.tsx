"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SpotifyData } from "@/types/types.spotify";
import {
  RiAlbumLine,
  RiMusicLine,
  RiStarLine,
  RiUserFollowLine,
} from "react-icons/ri";
import TitlesBTS from "components/TitlesBTS";

interface ArtistCardProps {
  artistName: string;
  artistId: string;
  onLoadArtist: (artistId: string) => Promise<SpotifyData | null>;
}

export default function ArtistCard({
  artistName,
  artistId,
  onLoadArtist,
}: ArtistCardProps) {
  const [artistData, setArtistData] = useState<SpotifyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadBasicData = async () => {
      try {
        const data = await onLoadArtist(artistId);
        setArtistData(data);
      } catch (error) {
        console.error("Error loading artist data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBasicData();
  }, [artistId, onLoadArtist]);

  const handleClick = () => {
    router.push(`/spotify/${artistId}`);
  };

  if (isLoading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-auto h-44 bg-white/20 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-6 bg-white/20 rounded w-24"></div>
            <div className="h-4 bg-white/20 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="backdrop-blur-sm rounded-lg p-6 cursor-pointer  w-auto"
      onClick={handleClick}
      style={{
        backgroundImage: `url(${artistData?.artist?.images?.[0]?.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
      <div className="flex items-center flex-col justify-between  h-52 relative z-10">
        <h2 className="text-xl font-bold  text-white">{artistName}</h2>
        {artistData?.artist && (
          <div className="space-y-1 text-sm text-gray-100">
            <TitlesBTS
              icon={<RiUserFollowLine />}
              data={artistData.artist.followers?.total?.toLocaleString() || 0}
              title="followers"
            />
            <TitlesBTS
              icon={<RiAlbumLine />}
              data={
                artistData.albums?.filter(
                  (album) => album.album_type === "album"
                ).length || 0
              }
              title="albums"
            />
            <TitlesBTS
              icon={<RiMusicLine />}
              data={
                artistData.albums?.filter(
                  (album) => album.album_type === "single"
                ).length || 0
              }
              title="singles"
            />
            <TitlesBTS
              icon={<RiStarLine />}
              data={artistData.artist.popularity || 0}
              title="/100
                popularity"
            />
          </div>
        )}
      </div>
    </div>
  );
}
