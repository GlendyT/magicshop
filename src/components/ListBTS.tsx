import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiPlayLargeLine } from "react-icons/ri";

type ListBTSProps = {
  artistData: {
    topTracks: {
      id: string;
      name: string;
      album: {
        images: { url: string }[];
        name: string;
      };
      external_urls: { spotify: string };
    }[];
  };
};

const ListBTS = ({ artistData }: ListBTSProps) => {
  return (
    <div className=" flex flex-col gap-1  ">
      <h2 className="text-xl font-bold">Top Tracks</h2>
      {artistData.topTracks.slice(0, 6).map((track) => (
        <div
          key={track.id}
          className="bg-black/50 backdrop-blur-sm rounded-lg p-2 flex items-center flex-wrap gap-2  "
        >
          {track.album?.images?.[0] && (
            <Image
              src={track.album.images[track.album.images.length - 1].url}
              alt={track.name}
              width={50}
              height={50}
              className="rounded"
            />
          )}
          <div className="flex-grow  ">
            <h4 className="font-semibold text-sm">{track.name}</h4>
            <p className="text-gray-300 text-xs">{track.album?.name}</p>
          </div>
          {track.external_urls?.spotify && (
            <Link
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 text-lg"
            >
              <RiPlayLargeLine />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListBTS;
