import useRequestInfo from "@/hooks/useRequestInfo";
import React from "react";
import { dmmono, glich, pixel } from "@/utils/Fonts";
import SelectUtils from "@/utils/SelectUtils";
import { sugaStyles } from "./Data/sugaStyles";
import TextAreaUtils from "@/utils/TextAreaUtils";
import { ButtonUtils } from "@/utils/ButtonUtils";
import InputNameUtils from "@/utils/InputNameUtils";

const Formulario = () => {
  const { handleSubmit, usuario } = useRequestInfo();
  const { content, diseño, name } = usuario;

  return (
    <div className="text-white max-sm:text-xs w-96">
      <div className="px-10 rounded-2xl py-6 bg-black/30 backdrop-blur-lg">
        <div
          className={`block mt-1 text-4xl text-center ${dmmono.className} font-bold text-white max-md:text-2xl`}
        >
          Into the
          <div
            className={`uppercase ${glich.className}  font-thin text-5xl max-md:text-4xl`}
          >
            suga-verse
          </div>
          <h1
            className={`text-center text-sm pb-5 max-md:text-1xl ${dmmono.className} text-white`}
          >
            Create and share your lyrics inspired by Yoongi´s extraordinary
            lyricism
          </h1>
        </div>
        <form
          data-testid="form"
          className={`mt-5 flex flex-col gap-2 ${dmmono.className}`}
          onSubmit={handleSubmit}
        >
          <TextAreaUtils
            label="Your Lyrics"
            placeholder="write something first"
          />
          <InputNameUtils
            from="From"
            placeholder="Your Name"
            className="text-white placeholder-gray-400"
            disabled={!content}
          />

          <SelectUtils
            id="diseño"
            name="diseño"
            label="Choose Your favorite song"
            value={diseño}
            options={sugaStyles}
            disabled={!name}
            placeholder="Select your art work"
            className="appearance-none transition-all border-white border disabled:border-gray-600 disabled:text-gray-400 rounded w-full py-2 px-3 text-white"
          />
          <ButtonUtils
            label="Create Post"
            disabled={!diseño}
            className="w-full p-3 uppercase bg-black text-white  "
            disableColors={`disabled:bg-opacity-25 disabled:cursor-not-allowed disabled:bg-black/30 disabled:text-gray-500 ${pixel.className}`}
          />
        </form>
      </div>
    </div>
  );
};

export default Formulario;
