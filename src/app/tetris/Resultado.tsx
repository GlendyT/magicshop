import useTetris from "@/hooks/useTetris";
import React from "react";
import ButtonControls from "./ButtonControls";
import { colors } from "./Data/TetrisSize";
import { tiny } from "@/utils/Fonts";
import useRequestInfo from "@/hooks/useRequestInfo";
import { ButtonUtils } from "@/utils/ButtonUtils";

const Resultado = () => {
  const { score, highScore, gameOver, renderBoard, level, resetAll } =
    useTetris();
  const { usuario } = useRequestInfo();
  const { name } = usuario;
  return (
    <div
      className={`flex flex-col items-center  gap-1 text-white ${tiny.className} `}
    >
      <h1 className={`text-6xl font-bold max-sm:text-3xl `}>Tetris</h1>
      <div className="flex flex-row max-sm:flex-col gap-2">
        <div className=" flex flex-col">
          <div className="bg-purple-950 p-4 rounded-lg bg-tetris2   ">
            <div className="grid grid-cols-10 gap-px bg-blue-950   p-2 ">
              {renderBoard().map((row, y) =>
                row.map((cell, x) => (
                  <div
                    key={`${y}-${x}`}
                    className="w-4 h-4 max-sm:w-5 max-sm:h-5"
                    style={{ backgroundColor: colors[cell] }}
                  />
                ))
              )}
            </div>
          </div>
          <div className="bg-purple-950 px-2 text-center  h-6 rounded-lg drop-shadow-[0_5px_10px_#000000]">
            BTS-BTS-BTS-BTS-BTS
          </div>
          <ButtonControls />
        </div>

        <div className="flex flex-col  h-full gap-2">
          <div className="flex flex-col max-sm:flex-row gap-4 w-full">
            <span className="flex flex-col w-full   border-b  border-gray-300">
              Score <span className="flex items-end justify-end">{score}</span>{" "}
            </span>
            <span className="flex flex-col w-full border-b border-gray-300 ">
              High Score
              <span className="flex items-end justify-end">{highScore}</span>
            </span>
          </div>
          <div className="flex flex-col max-sm:flex-row gap-4 w-full">
            <span className="flex flex-col w-full border-b border-gray-300">
              Level: <span className="flex items-end justify-end">{level}</span>
            </span>
            <span className="flex flex-col w-full border-b border-gray-300">
              Player:{" "}
              <span className="flex items-end justify-end break-all break-words">
                {name}
              </span>
            </span>
          </div>

          <ButtonUtils
            onClick={resetAll}
            label="Restart All"
            className="bg-purple-800 text-white py-2 px-4 rounded-lg mt-4 hover:bg-purple-700 transition-colors duration-300 cursor-pointer"
            disabled={gameOver}
          />
        </div>
      </div>
    </div>
  );
};

export default Resultado;
