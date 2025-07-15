import useRequestInfo from "@/hooks/useRequestInfo";
import { ButtonUtils } from "@/utils/ButtonUtils";
import InputNameUtils from "@/utils/InputNameUtils";
import React from "react";

const Formulario = () => {
  const { handleSubmit, usuario } = useRequestInfo();
  const { name } = usuario;
  return (
    <div className="w-96 h-96 relative bg-tetris3">
      <div className=" bg-black/60 h-full flex flex-col items-center justify-center rounded-2xl">
        <div className="flex flex-col items-center justify-center text-purple-100 ">
          <h1
            data-testid="title"
            className="text-3xl max-md:text-xl pt-6 text-center font-extrabold uppercase max-sm:text-md pb-2"
          >
            Play Time
          </h1>
          <h3 className="text-3xl  max-sm:text-md">TETRIS</h3>
        </div>
        <div className="max-sm:px-10 max-sm:py-10 w-96 px-8">
          <form
            data-testid="form"
            className=" rounded-xl p-4 flex flex-col gap-6 text-white max-sm:text-sm "
            onSubmit={handleSubmit}
          >
            <InputNameUtils
              placeholder="write your name"
              className="placeholder:text-violet-200  bg-black/60"
            />
            <ButtonUtils
              label="Start the game"
              className="w-full cursor-pointer uppercase py-2 px-2 max-sm:text-sm bg-gray-800/80 text-white hover:bg-gray-700 disabled:bg-gray-900/70 disabled:cursor-not-allowed disabled:text-gray-600"
              disabled={!name}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
