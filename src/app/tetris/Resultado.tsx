import useTetris from "@/hooks/useTetris";
import React from "react";
import ButtonControls from "./ButtonControls";
import { colors } from "./Data/TetrisSize";

const Resultado = () => {
  const { score, highScore, gameOver, renderBoard, level } = useTetris();
  return (
    <div className="flex flex-col items-center  gap-1 text-white">
      <h1 className="text-xl font-bold">Tetris</h1>
      <div className="flex flex-row gap-2">
        <div className=" flex flex-col p-2">
          <div className="bg-red-700 p-2 rounded-lg ">
            <div className="grid grid-cols-10 gap-px bg-gray-700 p-2 border-2 border-gray-800 ">
              {renderBoard().map((row, y) =>
                row.map((cell, x) => (
                  <div
                    key={`${y}-${x}`}
                    className="w-4 h-4"
                    style={{ backgroundColor: colors[cell] }}
                  />
                ))
              )}
            </div>
          </div>
          <div className="bg-red-600 h-6 rounded-lg drop-shadow-[0_5px_10px_#000000]"></div>
          <ButtonControls />
        </div>

        <div className="flex flex-col h-full ">
          <span>Score: {score} </span>
          <span>High Score: {highScore}</span>
          <span>Level: {level}</span>
        </div>
      </div>
    </div>
  );
};

export default Resultado;
