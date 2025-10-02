"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SpotifyAlbum, SpotifyData } from "@/types/types.spotify";
import { ButtonUtils } from "@/utils/ButtonUtils";
import {
  RiArrowLeftLine,
  RiSpotifyLine,
  RiStarLine,
  RiUserFollowLine,
} from "react-icons/ri";
import Link from "next/link";
import CardBlockBTS from "components/CardBlokBTS";
import SmallCardBlockBTS from "components/SmallCardBlockBTS";
import ListBTS from "components/ListBTS";
import GridBlocksBTS from "components/GridBlocksBTS";

interface ArtistDetailsClientProps {
  artistData: SpotifyData | null;
}

const ArtistDetailsClient = ({ artistData }: ArtistDetailsClientProps) => {
  const router = useRouter();
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  const [selectedAlbum, setSelectedAlbum] = useState<SpotifyAlbum | null>(null);
  const albumsPerPage = 4;

  if (!artistData?.artist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artist not found</h1>
          <button
            onClick={() => router.back()}
            className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  const handleNextAlbums = () => {
    const maxIndex = Math.max(
      0,
      artistData.albumsWithTracks.length - albumsPerPage
    );
    setCurrentAlbumIndex((prev) => Math.min(prev + albumsPerPage, maxIndex));
  };

  const handlePrevAlbums = () => {
    setCurrentAlbumIndex((prev) => Math.max(prev - albumsPerPage, 0));
  };

  const visibleAlbums = artistData.albumsWithTracks.slice(
    currentAlbumIndex,
    currentAlbumIndex + albumsPerPage
  );

  const handleAlbumSelect = (album: SpotifyAlbum) => {
    setSelectedAlbum(album);
  };

  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
  };

  return (
    <div
      className="min-h-screen  text-white "
      style={{
        backgroundImage: `url(${artistData.artist.images?.[0]?.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col justify-center w-full h-full min-h-screen gap-2  relative z-10 px-4 backdrop-blur-sm bg-black/40">
        <div className="flex flex-col items-center gap-2  w-auto">
          <div className="flex flex-row items-center w-full ">
            <ButtonUtils
              icon={<RiArrowLeftLine className=" text-black" />}
              onClick={() => router.back()}
              className=" cursor-pointer animation-pulse hover:bg-white/30 bg-white/40 ml-10 p-2"
            />
            <h1 className="text-4xl text-center w-full flex flex-row gap-2 items-center justify-center font-bold ">
              {artistData.artist.name}{" "}
              {artistData.artist.external_urls?.spotify && (
                <Link
                  href={artistData.artist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  <RiSpotifyLine className="w-10 h-10" />
                </Link>
              )}
            </h1>
          </div>

          <div className="flex flex-wrap justify-center items-center  gap-2">
            <SmallCardBlockBTS
              data={artistData.artist.followers?.total?.toLocaleString() || 0}
              title="Followers"
              icon={<RiUserFollowLine />}
            />
            <SmallCardBlockBTS
              data={artistData.artist.popularity || 0}
              title="/100"
              icon={<RiStarLine />}
            />
            <SmallCardBlockBTS
              data={artistData.artist.genres?.join(", ") || "Unknown"}
            />
          </div>

          <div className="flex flex-wrap w-auto items-center justify-center gap-2 ">
            <CardBlockBTS data={artistData.albums.length} title="Albums" />
            <CardBlockBTS
              data={artistData.allTracks.length}
              title="Total Tracks"
            />
            <CardBlockBTS
              data={artistData.albumsWithTracks.length}
              title="Discography"
            />
          </div>
        </div>

        <div className="flex flex-wrap w-full gap-4 items-center justify-center   ">
          {artistData.topTracks.length > 0 && (
            <ListBTS artistData={artistData} />
          )}

          {artistData.albumsWithTracks.length > 0 && (
            <GridBlocksBTS
              artistData={artistData}
              visibleAlbums={visibleAlbums}
              handleNextAlbums={handleNextAlbums}
              handlePrevAlbums={handlePrevAlbums}
              currentAlbumIndex={currentAlbumIndex}
              albumsPerPage={albumsPerPage}
              handleAlbumSelect={handleAlbumSelect}
              selectedAlbum={selectedAlbum}
              handleBackToAlbums={handleBackToAlbums}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetailsClient;
