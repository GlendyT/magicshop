import useTetris from "@/hooks/useTetris";
import React from "react";
import ButtonControls from "./ButtonControls";
import { colors } from "./Data/TetrisSize";
import { tiny } from "@/utils/Fonts";

const Resultado = () => {
  const { score, highScore, gameOver, renderBoard, level } = useTetris();
  return (
    <div className={`flex flex-col items-center  gap-1 text-white ${tiny.className}`}>
      <h1 className={`text-6xl font-bold max-sm:text-5xl `}>Tetris</h1>
      <div className="flex flex-row max-sm:flex-col gap-2">
        <div className=" flex flex-col">
          <div className="bg-purple-900 p-2 rounded-lg ">
            <div className="grid grid-cols-10 gap-px bg-gray-700 p-2 ">
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
          <div className="bg-purple-900 h-6 rounded-lg drop-shadow-[0_5px_10px_#000000]"></div>
          <ButtonControls />
        </div>

        <div className="flex flex-col h-full gap-2">
          <span className="flex flex-col w-full  border-b border-gray-300">
            Score <span className="flex items-end justify-end">{score}</span>{" "}
          </span>
          <span className="flex flex-col w-full  border-b border-gray-300">
            High Score
            <span className="flex items-end justify-end">{highScore}</span>
          </span>
          <span className="flex flex-col w-full  border-b border-gray-300">
            Level: <span className="flex items-end justify-end">{level}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Resultado;
