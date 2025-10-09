import AlbumDropdown from "@/app/spotify/[id]/AlbumDropdown";
import { SpotifyAlbum, SpotifyTrack } from "@/types/types.spotify";
import { ButtonUtils } from "@/utils/ButtonUtils";
import { formatDuration } from "@/utils/FormatDates";
import Link from "next/link";
import React from "react";
import {
  RiAddFill,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiPlayLargeLine,
} from "react-icons/ri";

type GridBlocksBTSProps = {
  artistData: {
    albumsWithTracks: SpotifyAlbum[];
  };
  visibleAlbums: SpotifyAlbum[];
  handlePrevAlbums: () => void;
  handleNextAlbums: () => void;
  currentAlbumIndex: number;
  albumsPerPage: number;
  handleAlbumSelect: (album: SpotifyAlbum) => void;
  selectedAlbum: SpotifyAlbum | null;
  handleBackToAlbums: () => void;
};

const GridBlocksBTS = ({
  artistData,
  handlePrevAlbums,
  handleNextAlbums,
  currentAlbumIndex,
  visibleAlbums,
  handleAlbumSelect,
  selectedAlbum,
  handleBackToAlbums,
  albumsPerPage,
}: GridBlocksBTSProps) => {
  return (
    <div className="flex flex-col items-center ">
      <h2 className="text-xl font-bold mb-2 text-white">
        Complete Discography
      </h2>

      {!selectedAlbum ? (
        // Vista de álbumes (carrusel)
        <>
          <div className="flex items-center gap-2 w-full max-w-6xl">
            <ButtonUtils
              icon={<RiArrowLeftLine className="text-black" />}
              onClick={handlePrevAlbums}
              className={`cursor-pointer p-2 rounded-full bg-white/90  ${
                currentAlbumIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-white/20"
              }`}
              disabled={currentAlbumIndex === 0}
            />

            <div className="grid grid-cols-2 grid-rows-2 gap-1 flex-1">
              {visibleAlbums.map((album) => (
                <div
                  key={album.id}
                  className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/20 transition-colors cursor-pointer"
                  style={{
                    backgroundImage: `url(${album.images[0].url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleAlbumSelect(album)}
                >
                  <div className="absolute inset-0 bg-black/70"></div>
                  <div className="p-4 relative z-10">
                    <div className="flex flex-col w-auto h-32">
                      <div className="w-32">
                        <h3 className="font-semibold break-all break-words text-sm max-sm:text-xs">
                          {album.name}
                        </h3>
                      </div>
                      <p className="text-gray-300 text-xs">
                        {new Date(album.release_date).getFullYear()} •{" "}
                        {album.tracks?.length || 0} tracks
                      </p>
                      <p className="text-gray-400 text-xs capitalize">
                        {album.album_type}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Link
                        href={album.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 font-medium text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <RiPlayLargeLine className="cursor-pointer" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <ButtonUtils
              icon={<RiArrowRightLine className="text-black" />}
              onClick={handleNextAlbums}
              className={`cursor-pointer p-2 rounded-full bg-white/70 ${
                currentAlbumIndex + albumsPerPage >=
                artistData.albumsWithTracks.length
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-white/50"
              }`}
              disabled={
                currentAlbumIndex + albumsPerPage >=
                artistData.albumsWithTracks.length
              }
            />
          </div>

          {artistData.albumsWithTracks.length > albumsPerPage && (
            <div className=" text-sm text-gray-50">
              Showing {currentAlbumIndex + 1}-
              {Math.min(
                currentAlbumIndex + albumsPerPage,
                artistData.albumsWithTracks.length
              )}{" "}
              of {artistData.albumsWithTracks.length}
            </div>
          )}
        </>
      ) : (
        // Vista de tracks del álbum seleccionado
        <AlbumDropdown
          handleBackToAlbums={handleBackToAlbums}
          selectedAlbum={selectedAlbum}
          formatDuration={formatDuration}
        />
      )}
    </div>
  );
};

export default GridBlocksBTS;
