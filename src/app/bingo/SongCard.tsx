import { SongCardProps } from "@/types/lastfmtypes";
import Image from "next/image";
import { FaMusic } from "react-icons/fa";

const SongCard = ({ song, isFound = false }: SongCardProps) => (
  <div
    className={`w-full shadow-lg py-2 px-4 transition-all duration-500 flex flex-row gap-2 justify-between  items-center ${
      isFound
        ? " border  bg-black/70  border-purple-300 "
        : "bg-gradient-to-r from-slate-900/80 to-slate-800/70   "
    }`}
    style={{
      boxShadow: isFound ? "0 0 0.75rem #a126e3" : "",
    }}
  >
    <div className="flex flex-row gap-4">
      <h4
        className={`font-extrabold text-center text-lg max-sm:text-[0.5rem] ${
          isFound ? "text-gray-200" : "text-gray-900"
        }`}
      >
        {song.id}
      </h4>
      <h3
        className={`font-semibold flex flex-col items-start uppercase justify-start text-[0.6rem] max-sm:text-[0.5rem] ${
          isFound ? "text-gray-200" : "text-gray-900"
        }`}
      >
        {song.name}
        <span className="text-[0.4rem]"> {song.artist}</span>
      </h3>
    </div>

    <div
      className={`w-10 h-10 flex-shrink-0 overflow-hidden mb-2 ${
        !isFound ? " grayscale opacity-20 " : ""
      }`}
    >
      {song.image ? (
        <Image
          src={song.image}
          alt={`${song.name} album cover`}
          width={50}
          height={50}
          className="w-auto h-full object-cover"
        />
      ) : (
        <div className="w-20 h-20 bg-gray-800 rounded-md flex items-center justify-center">
          <span className="text-white text-xs">
            <FaMusic />
          </span>
        </div>
      )}
    </div>
  </div>
);

export default SongCard;
