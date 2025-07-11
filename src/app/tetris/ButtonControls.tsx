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
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-row gap-2">
        <ButtonUtils
          label={
            !isPlaying || gameOver
              ? "Start Game"
              : isPaused
              ? "Resume"
              : "Pause"
          }
          onClick={!isPlaying || gameOver ? startGame : pauseGame}
          className={`${
            !isPlaying || gameOver ? "bg-green-500" : "bg-yellow-500"
          } text-white px-4 py-2 rounded cursor-pointer`}
        />
      </div>
      <div className="flex flex-row gap-2 sm:hidden">
        <ButtonUtils
          onClick={() => movePiece(-1, 0)}
          className="bg-blue-600 text-white p-2 cursor-pointer flex items-center justify-center text-center"
          icon={<LuArrowLeft />}
        />
        <ButtonUtils
          onClick={() => movePiece(0, 1)}
          className="bg-blue-600 text-white p-2 cursor-pointer flex items-center justify-center text-center"
          icon={<LuArrowDown />}
        />
        <ButtonUtils
          onClick={rotatePiece}
          className="bg-blue-600 text-white p-2 cursor-pointer flex items-center justify-center text-center"
          icon={<LuRefreshCw />}
        />
        <ButtonUtils
          onClick={() => movePiece(1, 0)}
          className="bg-blue-600 text-white p-2 cursor-pointer flex items-center justify-center text-center"
          icon={<LuArrowRight />}
        />
      </div>
      <div className=" text-center">
        <div>Use arrow keys or buttons to play:</div>
        <div>← → to move, ↓ to drop, ↑ to rotate</div>
      </div>
    </div>
  );
};

export default ButtonControls;
