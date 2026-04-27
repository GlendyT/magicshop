"use client";

import Image from "next/image";
import useDownload from "@/hooks/useDownload";
import {  jinora } from "@/utils/Fonts";
import { ButtonUtils } from "@/utils/ButtonUtils";
import { useBTSPolaroid} from "../../lib/useBTS"

// Force dynamic rendering to avoid prerendering issues
export const dynamic = 'force-dynamic';

const Polaroid = () => {
  const { handleDownloadImage } = useDownload();
  const { btsPhrases, isLoading } = useBTSPolaroid()
  
  const randomIndex = Math.floor(Math.random() * (btsPhrases?.length || 0));
  const randomPhrase = btsPhrases?.[randomIndex];
  
  return (
    <div className="relative min-h-screen flex flex-col items-center gap-4 text-xl justify-center max-sm:px-10  max-sm:bg-center pt-16 bg-polaroid">
      <div
        className="bg-white border-pink-300 border-4 p-6  justify-items-center"
        id="print"
      >
        {isLoading ? (
          <div className="w-72 h-72 border-pink-300 border-4 flex items-center justify-center bg-gray-100">
            <p className="text-pink-300">Loading BTS phrases...</p>
          </div>
        ) : randomPhrase?.image ? (
          <Image
            src={randomPhrase.image}
            alt="btsphrase"
            width={200}
            height={200}
            className="w-72 justify-center border-pink-300 border-4"
          />
        ) : (
          <div className="w-72 h-72 border-pink-300 border-4 flex items-center justify-center bg-gray-100">
            <p className="text-pink-300 text-center px-4">Image not available</p>
          </div>
        )}
        <div className="pt-4 flex flex-row-2 h-28 justify-between w-full items-center text-pink-300">
          <Image
            src="/Polaroid/Only-graphic-darkpurple.webp"
            alt="logoarmy"
            width={100}
            height={100}
            className="w-14 h-14 pl-2"
          />
          <div className="text-lg max-sm:text-sm">
            <div
              className={`flex flex-col
               italic ${jinora.className}`}
            >
              Special thanks to{" "}
              <span className={`font-bold italic font-libre`}>
                {isLoading ? "Loading..." : randomPhrase?.title || "BTS"} ,
              </span>{" "}
              <span className="font-extrabold">ARMY</span>
            </div>
            <p className={`font-antonio text-end font-bold uppercase`}>
              - {isLoading ? "Loading..." : randomPhrase?.btsGroup?.name || "Unknown"}
            </p>
          </div>
        </div>
      </div>
      <ButtonUtils
        label="Download"
        onClick={handleDownloadImage}
        className={`bg-black text-white px-4 py-2 cursor-pointer  ${jinora.className} italic font-extrabold ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
      />
    </div>
  );
};

export default Polaroid;