import usePhotobooth from "@/hooks/usePhotobooth";
import { ballet } from "@/utils/Fonts";
import Image from "next/image";
import { ChangeEvent } from "react";

type PhotoProps = {
  preview: string | null;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  backgroundImage: string | null;
};

const Photo = ({ preview, handleFileChange, backgroundImage }: PhotoProps) => {
  const { changeColor } = usePhotobooth();
  return (
    <div data-test-id="Photo" className="flex flex-col items-center m-1">
      <label
        htmlFor="avatarInput"
        className={` ${preview ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        {preview ? (
          <Image
            src={preview}
            alt="photoboothbts"
            height={192}
            width={192}
            className={`object-cover h-40 max-sm:px-0 w-40`}
          />
        ) : (
          <div
            className={`cursor-grab bg-white ${
              changeColor === true
                ? ""
                : "w-40 h-40 max-sm:w-40 max-sm:h-36 border-4"
            } ${
              backgroundImage
                ? "border-dashed"
                : "border-purple-500"
            }`}
          >
            <h1
              className={`text-center ${ballet.className} ${
                changeColor === true
                  ? "text-transparent max-sm:text-xs max-sm:truncate"
                  : " max-sm:text-xs max-lg:text-sm max-xl:text-sm text-purple-900"
              } `}
            >
              Click to Add Your Photo
            </h1>
          </div>
        )}
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
