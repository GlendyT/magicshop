"use client";

import Image from "next/image";
import useDownload from "@/hooks/useDownload";
import { btsPhrase } from "./btsPhrase";
import {  jinora } from "@/utils/Fonts";
import { ButtonUtils } from "@/utils/ButtonUtils";

const Polaroid = () => {
  const { handleDownloadImage } = useDownload();
  const randomIndex = Math.floor(Math.random() * btsPhrase.length);
  const randomPhrase = btsPhrase[randomIndex];
  return (
    <div className="relative min-h-screen flex flex-col items-center gap-4 text-xl justify-center max-sm:px-10  max-sm:bg-center pt-16 bg-polaroid">
      <div
        className="bg-white border-pink-300 border-4 p-6  justify-items-center"
        id="print"
      >
        <Image
          src={randomPhrase.image}
          alt="btsphrase"
          width={200}
          height={200}
          className="w-72 justify-center border-pink-300 border-4"
        />
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
              <span className={`font-bold italic font-libre.`}>
                {randomPhrase.title} ,
              </span>{" "}
              <span className="font-extrabold">ARMY</span>
            </div>
            <p className={`font-antonio text-end font-bold`}>
              - {randomPhrase.from}
            </p>
          </div>
        </div>
      </div>
      <ButtonUtils
        label="Download"
        onClick={handleDownloadImage}
        className={`bg-black text-white px-4 py-2  ${jinora.className} italic font-extrabold`}
      />
    </div>
  );
};

export default Polaroid;
