"use client";
import { SpotifyAlbum, SpotifyTrack } from "@/types/types.spotify";
import { RiArrowLeftLine, RiPlayLargeLine, RiStarLine } from "react-icons/ri";
import { ButtonUtils } from "@/utils/ButtonUtils";
import Link from "next/link";

interface AlbumDropdownProps {
  handleBackToAlbums: () => void;
  selectedAlbum: SpotifyAlbum;
  formatDuration: (ms: number) => string;
}

export default function AlbumDropdown({
  handleBackToAlbums,
  selectedAlbum,
  formatDuration,
}: AlbumDropdownProps) {
  return (
    <div className="w-96">
      <div className="flex h-12 bg-black/70 rounded-t-lg  items-center">
        <ButtonUtils
          icon={<RiArrowLeftLine className="hover:scale-105" />}
          onClick={handleBackToAlbums}
          className="cursor-pointer p-2   "
        />
        <div className="flex w-full justify-center   rounded-t items-center gap-4 px-2 ">
          <h3 className="text-sm font-bold ">{selectedAlbum.name}</h3>
          <p className="text-gray-300 text-xs">
            {new Date(selectedAlbum.release_date).getFullYear()}
          </p>
        </div>
      </div>

      {selectedAlbum.tracks && selectedAlbum.tracks.length > 0 && (
        <div
          className=" overflow-hidden"
          style={{
            backgroundImage: `url(${selectedAlbum.images[0].url})`,
            backgroundSize: "cover",
            backgroundPosition: " center",
          }}
        >
          <div className="h-96 bg-black/60 overflow-y-auto">
            {selectedAlbum.tracks.map((track: SpotifyTrack, index: number) => (
              <div
                key={track.id}
                className="px-4 py-2 hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-100 text-sm w-6">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-medium text-xs">{track.name}</h4>
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="text-yellow-100 text-[0.6rem] flex flex-row items-center justify-center ">
                          <RiStarLine /> {track.popularity}
                        </span>
                        {track.explicit && (
                          <span className="text-red-500 text-[0.6rem]">🅴</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-gray-100 text-xs">
                      {formatDuration(track.duration_ms)}
                    </span>
                    <Link
                      href={track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 text-sm"
                    >
                      <RiPlayLargeLine />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/*          */
