import useRequestInfo from "@/hooks/useRequestInfo";
import { hobiPersonalized } from "./Data/hobiPersonalized";
import React from "react";

const StyleSelect = () => {
  const { usuario, isMobile, usuarioGenerado } = useRequestInfo();
  const { diseño, content } = usuario;

  const selectedStyle = isMobile
    ? hobiPersonalized.find((style) => style.name === "Vertical Style")
    : hobiPersonalized.find((style) => style.name === "Square Style");

  return (
    <div className="flex flex-col items-center justify-center text-black font-extrabold">
      <label className="pt-4">Select your Card</label>
      <div className="py-2 flex flex-row justify-between">
        {selectedStyle?.styles.map((hobistyle) => (
          <label
            key={hobistyle.name}
            className=" px-1 py-2  flex flex-row gap-4 cursor-pointer items-center justify-center capitalize text-base max-sm:text-xs"
          >
            <input
              id="diseño"
              name="diseño"
              type="radio"
              onChange={usuarioGenerado}
              value={hobistyle.name}
              checked={diseño === hobistyle.name}
              className="hidden"
              disabled={!content}
            />

            <span
              className={`w-8 h-6 object-cover rounded  ${
                diseño === hobistyle.name
                  ? "ring-4 bg-black"
                  : "bg-gray-400 outline-gray-600 outline"
              }`}
            ></span>
            {hobistyle.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default StyleSelect;
