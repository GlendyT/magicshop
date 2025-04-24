import InputName from "@/utils/InputName";
import Image from "next/image";
import React from "react";
import SelectAlbum from "./SelectAlbum";
import { Button } from "@/utils/Button";
import useRequestInfo from "@/hooks/useRequestInfo";
import { providence } from "@/utils/Fonts";

const Formulario = () => {
  const { usuario, handleSubmit } = useRequestInfo();
  const { song } = usuario;
  return (
    <div className={`text-white max-sm:text-xs w-96 flex flex-col items-center justify-center ${providence.className}`}>
      <Image
        src="/Hobipalooza/hw.webp"
        alt="hobipalooza"
        className="w-80 h-44"
        width={185}
        height={185}
      />
      <div className=" w-full px-10 text-center">
        <form className="mt-5 flex flex-col gap-6" onSubmit={handleSubmit}>
          <InputName
            placeholder="Use your X @username"
            className="w-full bg-white text-black border-black placeholder:text-gray-400 text-center"
          />
          <SelectAlbum />
          <Button
            label="Generate Card"
            disabled={!song}
            className=" max-sm:mt-2 py-4 bg-pink-600 text-white uppercase  "
            disableColors="disabled:bg-opacity-25 disabled:cursor-not-allowed disabled:bg-black/30 disabled:text-gray-500"
          />
        </form>
      </div>
    </div>
  );
};

export default Formulario;
