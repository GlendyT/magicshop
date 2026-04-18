import usePhotobooth from "@/hooks/usePhotobooth";
import { myFont } from "@/utils/Fonts";
import Image from "next/image";
import { ChangeEvent } from "react";

type PhotoProps = {
  preview: string | null;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  backgroundImage: string | null;
  activeTab: "card" | "pfp";
};

const Photo = ({ preview, handleFileChange }: PhotoProps) => {
  const { changeColor } = usePhotobooth();

  const backgroundArirang = "/arirang/bg.webp";
  return (
    <div data-test-id="Photo" className="flex flex-col items-center m-1">
      <label
        htmlFor="avatarInput"
        className={` ${preview ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <div
          className="relative w-80 h-80 max-sm:w-80 max-sm:h-80"
          id="print"
        >
          <Image
            src={backgroundArirang}
            alt="Background"
            className="absolute top-0 z-0 left-0 w-full h-full object-contain"
            width={900}
            height={900}
            quality={100}
          />
          {preview ? (
            <Image
              src={preview}
              alt="photoboothbts"
              className="object-contain relative z-20"
              width={900}
              height={900}
              quality={100}
            />
          ) : (
            <div
              className={`relative flex items-center justify-center w-full h-full cursor-grab  `}
            >
              <h1
                className={`text-center ${myFont.className} ${changeColor === true
                  ? "text-transparent max-sm:text-xs max-sm:truncate"
                  : "max-sm:text-xs max-lg:text-sm max-xl:text-sm text-white"
                  }`}
              >
                Click to Add Your Photo
              </h1>
            </div>
          )}
        </div>
      </label>
      <input
        type="file"
        className="hidden"
        id="avatarInput"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Photo;
