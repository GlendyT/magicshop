import useRequestInfo from "@/hooks/useRequestInfo";
import { ButtonUtils } from "@/utils/ButtonUtils";
import InputNameUtils from "@/utils/InputNameUtils";
import React from "react";

const Formulario = () => {
  const { handleSubmit } = useRequestInfo();
  return (
    <>
      <div className="w-96 h-96 relative flex flex-col items-center justify-center outline-none focus:outline-none rounded-lg backdrop-blur-xl bg-white/5 ">
        <div className="flex flex-col items-center justify-center text-white">
          <h1
            data-testid="title"
            className="text-2xl max-md:text-xl pt-6 text-center font-extrabold uppercase max-sm:text-xs pb-2"
          >
            Play Time
          </h1>
          <h3 className="text-2xl  max-sm:text-xs">TETRIS</h3>
        </div>
        <div className="max-sm:px-10 max-sm:py-10 w-96 px-8">
          <form
            data-testid="form"
            className=" rounded-xl p-4 flex flex-col gap-6 text-white max-sm:text-xs "
            onSubmit={handleSubmit}
          >
            <InputNameUtils
              placeholder="write your name"
              className="placeholder:text-violet-200 bg-transparent"
            />
            <ButtonUtils
              label="Start the game"
              className="w-full cursor-pointer uppercase py-2 px-2 max-sm:text-xs bg-gray-800 text-white hover:bg-gray-700"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Formulario;
