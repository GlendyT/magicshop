import useTetris from "@/hooks/useTetris";
import { ButtonUtils } from "@/utils/ButtonUtils";
import { tiny } from "@/utils/Fonts";
import React from "react";
import {
  LuArrowDown,
  LuArrowLeft,
  LuArrowRight,
  LuPause,
  LuPlay,
  LuPower,
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
    resetGame,
  } = useTetris();
  return (
    <div
      className={`flex flex-col items-center gap-2 w-full p-2 bg-purple-900 rounded-lg `}
    >
      <div className="flex flex-row gap-4 items-center justify-start w-full">
        <div className="flex flex-col gap-2 items-center justify-center  ">
          <div className="flex flex-row gap-4">
            <ButtonUtils
              onClick={() => movePiece(-1, 0)}
              className={`${
                !isPlaying || gameOver
                  ? "bg-gray-700 cursor-not-allowed"
                  : isPaused
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-950 cursor-pointer hover:scale-105"
              } text-white p-2  flex items-center justify-center text-center drop-shadow-[0_5px_10px_#000000]  transition-transform duration-200`}
              icon={<LuArrowLeft />}
            />

            <ButtonUtils
              onClick={() => movePiece(1, 0)}
              className={`${
                !isPlaying || gameOver
                  ? "bg-gray-700 cursor-not-allowed"
                  : isPaused
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-950 cursor-pointer hover:scale-105"
              } text-white p-2  flex items-center justify-center text-center drop-shadow-[0_5px_10px_#000000] transition-transform duration-200`}
              icon={<LuArrowRight />}
            />
          </div>
          <ButtonUtils
            onClick={() => movePiece(0, 1)}
            className={`${
              !isPlaying || gameOver
                ? "bg-gray-700 cursor-not-allowed"
                : isPaused
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-950 cursor-pointer hover:scale-105"
            } text-white p-2 flex items-center justify-center text-center drop-shadow-[0_5px_10px_#000000]  transition-transform duration-200 `}
            icon={<LuArrowDown />}
          />
        </div>
        <div>
          <ButtonUtils
            onClick={rotatePiece}
            className={`${
              !isPlaying || gameOver
                ? "bg-gray-700 cursor-not-allowed"
                : isPaused
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-950 cursor-pointer hover:scale-105"
            } text-white p-2 flex items-center justify-center text-center drop-shadow-[0_5px_10px_#000000] transition-transform duration-200  `}
            icon={<LuRefreshCw />}
          />
        </div>
      </div>
      <div className="flex flex-row gap-2 items-end justify-end w-full">
        <ButtonUtils
          onClick={!isPlaying || gameOver ? startGame : pauseGame}
          className={`${
            !isPlaying || gameOver
              ? "bg-green-500"
              : isPaused
              ? "bg-yellow-500"
              : "bg-blue-700"
          } text-white px-2 py-2 rounded cursor-pointer`}
          icon={
            !isPlaying || gameOver ? (
              <LuPlay />
            ) : isPaused ? (
              <LuPlay />
            ) : (
              <LuPause />
            )
          }
        />
        <ButtonUtils
          onClick={resetGame}
          className="bg-red-500 text-white px-2 py-2 rounded cursor-pointer"
          icon={<LuPower />}
        />
      </div>
    </div>
  );
};

export default ButtonControls;
