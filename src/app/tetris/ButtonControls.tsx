import useTetris from "@/hooks/useTetris";
import { ButtonUtils } from "@/utils/ButtonUtils";
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
      className={`flex flex-row items-center gap-2 w-full h-36 p-2 bg-purple-950 rounded-lg bg-tetris object-fill `}
      data-testid="button-controls"
    >
      <div className="flex flex-row gap-4 items-center justify-start w-full h-full ">
        <div className="flex flex-col gap-4 items-center justify-items-start h-full  ">
          <div className="flex flex-row gap-4">
            <ButtonUtils
              onClick={() => movePiece(-1, 0)}
              className={` backdrop-blur-sm ${
                !isPlaying || gameOver
                  ? "bg-gray-600/5 cursor-not-allowed border-2 border-gray-800 text-gray-600"
                  : isPaused
                  ? "bg-gray-500 cursor-not-allowed border-2 border-gray-900 text-gray-700"
                  : "bg-blue-950 cursor-pointer hover:scale-105 border-2 border-black text-white font-extrabold"
              }  p-2  flex items-center justify-center text-center drop-shadow-[0_5px_10px_#000000]  transition-transform duration-200`}
              icon={<LuArrowLeft />}
            />

            <ButtonUtils
              onClick={() => movePiece(1, 0)}
              className={`backdrop-blur-sm  ${
                !isPlaying || gameOver
                  ? "bg-gray-600/5 cursor-not-allowed border-2 border-gray-800 text-gray-600"
                  : isPaused
                  ? "bg-gray-500 cursor-not-allowed border-2 border-gray-900 text-gray-700"
                  : "bg-blue-950 cursor-pointer hover:scale-105 border-2 border-black text-white font-extrabold"
              }  p-2  flex items-center justify-center text-center drop-shadow-[0_5px_10px_#000000] transition-transform duration-200`}
              icon={<LuArrowRight />}
            />
          </div>
          <ButtonUtils
            onClick={() => movePiece(0, 1)}
            className={` backdrop-blur-sm  ${
              !isPlaying || gameOver
                ? "bg-gray-600/10 cursor-not-allowed border-2 border-gray-800 text-gray-600"
                : isPaused
                ? "bg-gray-500 cursor-not-allowed border-2 border-gray-900 text-gray-700"
                : "bg-blue-950 cursor-pointer hover:scale-105 border-2 border-black text-white font-extrabold"
            } p-2 flex items-center justify-center text-center drop-shadow-[0_5px_10px_#000000]  transition-transform duration-200 `}
            icon={<LuArrowDown />}
          />
        </div>
        <div className="flex flex-col items-end h-full">
          <ButtonUtils
            onClick={rotatePiece}
            className={` backdrop-blur-sm ${
              !isPlaying || gameOver
                ? "bg-gray-600/10 cursor-not-allowed  border-2 border-gray-800 text-gray-600"
                : isPaused
                ? "bg-gray-500 cursor-not-allowed border-2 border-gray-900 text-gray-700"
                : "bg-blue-950 cursor-pointer hover:scale-105 border-2 border-black text-white font-extrabold"
            } p-2 flex text-center drop-shadow-[0_5px_10px_#000000] transition-transform duration-200  `}
            icon={<LuRefreshCw />}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 items-end justify-end w-full h-full">
        <ButtonUtils
          onClick={!isPlaying || gameOver ? startGame : pauseGame}
          className={` backdrop-blur-sm hover:scale-105 transition-all duration-150 ${
            !isPlaying || gameOver
              ? "bg-green-600 border-2 border-green-800"
              : isPaused
              ? "bg-yellow-500/90 border-2 border-yellow-800"
              : "bg-blue-700/80 border-2 border-black"
          } text-white font-extrabold px-2 py-2 rounded cursor-pointer`}
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
          className={` px-2 py-2 rounded    transition-all duration-200 ${
            isPlaying
              ? "cursor-pointer bg-red-500/80 border-2 border-red-900 hover:scale-105"
              : "cursor-not-allowed border-2 border-gray-800 text-gray-600"
          }
           ${!gameOver ? "" : "animate-pulse"}
          `}
          icon={<LuPower />}
        />
      </div>
    </div>
  );
};

export default ButtonControls;
