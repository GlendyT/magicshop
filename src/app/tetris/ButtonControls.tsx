import useTetris from "@/hooks/useTetris";
import { ButtonUtils } from "@/utils/ButtonUtils";
import React from "react";
import {
  LuArrowDown,
  LuArrowLeft,
  LuArrowRight,
  LuRefreshCw,
} from "react-icons/lu";

const ButtonControls = () => {
  const {
    rotatePiece,
    movePiece,
    isPlaying,
    startGame,
    pauseGame,
    isPaused,
    gameOver,
  } = useTetris();
  return (
    <div className="flex flex-col items-center gap-2 w-full p-2 bg-red-600 rounded-lg">
      <div className="flex flex-row gap-4 items-center justify-start w-full">
        <div className="flex flex-col gap-2 items-center justify-center  ">
          <div className="flex flex-row gap-4">
            <ButtonUtils
              onClick={() => movePiece(-1, 0)}
              className="bg-blue-950 text-white p-2 cursor-pointer flex items-center justify-center text-center drop-shadow-[0_5px_10px_#000000] hover:scale-105 transition-transform duration-200"
              icon={<LuArrowLeft />}
            />

            <ButtonUtils
              onClick={() => movePiece(1, 0)}
              className="bg-blue-950 text-white p-2 cursor-pointer flex items-center justify-center text-center drop-shadow-[0_5px_10px_#000000] hover:scale-105 transition-transform duration-200  "
              icon={<LuArrowRight />}
            />
          </div>
          <ButtonUtils
            onClick={() => movePiece(0, 1)}
            className="bg-blue-950 text-white p-2 cursor-pointer flex items-center justify-center text-center drop-shadow-[0_5px_10px_#000000]  hover:scale-105 transition-transform duration-200 "
            icon={<LuArrowDown />}
          />
        </div>
        <div>
          <ButtonUtils
            onClick={rotatePiece}
            className="bg-blue-950 text-white p-2 cursor-pointer flex items-center justify-center text-center drop-shadow-[0_5px_10px_#000000] hover:scale-105 transition-transform duration-200  "
            icon={<LuRefreshCw />}
          />
        </div>
      </div>
      <div className="flex flex-row gap-2 items-end justify-end w-full">
        <ButtonUtils
          label={
            !isPlaying || gameOver ? "Start" : isPaused ? "Resume" : "Pause"
          }
          onClick={!isPlaying || gameOver ? startGame : pauseGame}
          className={`${
            !isPlaying || gameOver ? "bg-green-500" : "bg-yellow-500"
          } text-white px-2 py-2 rounded cursor-pointer`}
        />
      </div>
    </div>
  );
};

export default ButtonControls;
