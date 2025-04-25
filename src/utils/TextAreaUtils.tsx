import useRequestInfo from "@/hooks/useRequestInfo";
import React from "react";
import { TextAreaProps } from "../types";

const TextAreaUtils = ({ label, placeholder }: TextAreaProps) => {
  const {
    isMaxCharLimitReached,
    charCount,
    maxCharLimit,
    usuario,
    handleContent,
  } = useRequestInfo();
  const { content } = usuario;
  return (
    <div className="">
      <label className="flex float-start text-sm mb-2" htmlFor="descripcion">
        {label}
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
        placeholder={placeholder}
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
  );
};

export default TextAreaUtils;
