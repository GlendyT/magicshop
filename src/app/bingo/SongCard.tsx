import { SongCardProps } from "@/types/lastfmtypes";
import Image from "next/image";
import { FaMusic } from "react-icons/fa";

const SongCard = ({ song, isFound = false }: SongCardProps) => (
  <div
    className={` shadow-lg py-1 px-1 transition-all duration-500 flex flex-col items-center ${
      isFound
        ? " border-2 "
        : "bg-gradient-to-r from-slate-200 to-slate-200  border-2 border-white "
    }`}

  >
    <div
      className={`w-18 h-28 flex-shrink-0 overflow-hidden mb-2 ${
        !isFound ? " grayscale opacity-20 " : ""
      }`}
    >
      {song.image ? (
        <Image
          src={song.image}
          alt={`${song.name} album cover`}
          width={60}
          height={60}
          className="w-auto h-full object-cover"
        />
      ) : (
        <div className="w-20 h-20 bg-gray-800 rounded-md flex items-center justify-center">
          <span className="text-white text-xs">
            <FaMusic/>
          </span>
        </div>
      )}
    </div>
    <h4
      className={`font-semibold text-center text-[0.4rem] max-sm:text-[0.5rem] ${
        isFound ? "text-gray-900" : "text-gray-600"
      }`}
    >
      {song.name}
    </h4>
  </div>
);

export default SongCard;
