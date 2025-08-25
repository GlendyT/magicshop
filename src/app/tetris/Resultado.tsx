import useTetris from "@/hooks/useTetris";
import React from "react";
import ButtonControls from "./ButtonControls";
import { colors } from "./Data/TetrisSize";
import { tiny } from "@/utils/Fonts";
import useRequestInfo from "@/hooks/useRequestInfo";
import { ButtonUtils } from "@/utils/ButtonUtils";
import { formatDate } from "@/utils/FormatDates";
import Gift2 from "../../utils/gift2/page";

const Resultado = () => {
  const {
    score,
    highScore,
    gameOver,
    renderBoard,
    level,
    resetAll,
    birthdaysLatest,
  } = useTetris();
  const { usuario } = useRequestInfo();
  const { name } = usuario;
  return (
    <div
      className={`flex flex-col items-center pb-3  gap-1  px-3 ${tiny.className} `}
    >
      <div className="flex flex-row max-sm:flex-col gap-2">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-2 max-sm:flex-col">
            {/* //TODO: TETRIS BOARD */}
            <div className=" flex flex-col">
              <div className="bg-purple-950 p-4 rounded-lg bg-tetris2   ">
                <div className="grid grid-cols-10 gap-px bg-purple-950   p-2 ">
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
              <div
                className={`bg-purple-950 flex items-center text-white justify-center px-2 text-center text-xl h-8 rounded-lg drop-shadow-[0_5px_0px_#000000]  ${
                  !gameOver ? "" : " animate-pulse "
                }`}
              >
                {!gameOver ? "BTS-BTS-BTS-BTS-BTS" : "Game Over!"}
              </div>
              <ButtonControls />
            </div>

            {/* //TODO: STATS */}
            <div className="flex flex-col items-center gap-3 text-white ">
              <div className=" backdrop-blur-sm bg-black/50 p-2 w-full flex flex-col justify-center rounded-md">
                <div className="flex flex-col max-sm:flex-row gap-4 w-full  ">
                  <span className="flex flex-col w-full   border-b  border-gray-300">
                    Score{" "}
                    <span className="flex items-end justify-end">{score}</span>{" "}
                  </span>
                  <span className="flex flex-col w-full border-b border-gray-300 ">
                    High Score
                    <span className="flex items-end justify-end">
                      {highScore}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col  max-sm:flex-row gap-4 w-full">
                  <span className="flex flex-col w-full border-b border-gray-300">
                    Level:{" "}
                    <span className="flex items-end justify-end">{level}</span>
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
                  className={`bg-purple-800 text-white py-2 px-4 rounded-lg mt-4 hover:bg-purple-700 transition-colors duration-300 cursor-pointer `}
                  disabled={gameOver}
                />
              </div>
            </div>
          </div>

          {/* //TODO: GIFTS */}
          <div className="flex flex-col max-sm:flex-wrap  gap-1 items-center justify-center   ">
            {birthdaysLatest.map((bday, index) => (
              <div
                key={index}
                className=" bg-violet-300 rounded-md text-violet-950 flex flex-col items-center justify-center  "
              >
                <Gift2
                  level={level}
                  isClosest={index < level} 
                  name={bday.shortAka}
                />
                {formatDate(bday.date)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resultado;
