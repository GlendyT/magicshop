import useTetris from "@/hooks/useTetris";
import React from "react";
import ButtonControls from "./ButtonControls";
import { colors } from "./Data/TetrisSize";

const Resultado = () => {
  const { score, highScore, gameOver, renderBoard } = useTetris();
  return (
    <div className="flex flex-col items-center justify-center gap-1 text-white">
      <h1 className="text-4xl font-bold">Tetris</h1>
      <div className="">
        Score: {score} | High Score: {highScore}
      </div>
      <div className="grid grid-cols-10 gap-px bg-gray-700 p-2 border-2 border-gray-800">
        {renderBoard().map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className="w-5 h-5"
              style={{ backgroundColor: colors[cell] }}
            />
          ))
        )}
      </div>
      <ButtonControls />
    </div>
  );
};

export default Resultado;
