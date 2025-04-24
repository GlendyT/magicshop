import useRequestInfo from "@/hooks/useRequestInfo";
import InputName from "@/utils/InputName";
import React from "react";
import SelectDesign from "./SelectDesign";
import { Button } from "@/utils/Button";
import { dmmono, glich, pixel } from "@/utils/Fonts";

const Formulario = () => {
  const {
    handleSubmit,
    isMaxCharLimitReached,
    maxCharLimit,
    charCount,
    handleContent,
    usuario,
  } = useRequestInfo();
  const { content, diseño } = usuario;

  return (
    <div className="text-white max-sm:text-xs w-96">
      <div className="px-10 rounded-2xl py-6 bg-black/30 backdrop-blur-lg">
        <div className={`block mt-1 text-4xl text-center ${dmmono.className} font-bold text-white max-md:text-2xl`}>
          Into the
          <div className={`uppercase ${glich.className}  font-thin text-5xl max-md:text-4xl`}>
            suga-verse
          </div>
          <h1 className={`text-center text-sm pb-5 max-md:text-1xl ${dmmono.className} text-white`}>
            Create and share your lyrics inspired by Yoongi´s extraordinary
            lyricism
          </h1>
        </div>
        <form className={`mt-5 ${dmmono.className}`} onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              className="flex float-start text-sm mb-2"
              htmlFor="descripcion"
            >
              Your Lyrics
            </label>
            <div
              className={`text-sm mb-2 float-end ${
                isMaxCharLimitReached ? "text-red-500" : "text-white"
              }`}
            >
              {isMaxCharLimitReached && (
                <span className="text-red-500">Too long!</span>
              )}{" "}
              {charCount}/200
            </div>
            <textarea
              maxLength={maxCharLimit}
              placeholder="write something first"
              rows={5}
              id="content"
              name="content"
              value={content}
              onChange={handleContent}
              className={`appearance-none border rounded w-full py-2 px-3 text-white transition-all leading-tight placeholder-gray-400 focus:outline-none focus:shadow-outline resize-none ${
                isMaxCharLimitReached
                  ? "border-red-500 text-red-500"
                  : "border-gray-300"
              }`}
            />
          </div>
          <InputName
            from="From"
            placeholder="Your Name"
            className="text-white placeholder-gray-400"
            disabled={!content}
          />
          <SelectDesign />
          <Button
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
