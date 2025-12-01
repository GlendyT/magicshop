"use client";

import useTicTacToe from "@/hooks/useTicTacToe";
import Form from "./Form";
import Modal from "./Modal";
import { ButtonUtils } from "@/utils/ButtonUtils";

const TicTacToe = () => {
  const {
    gameState,
    GAME_STATES,
    grid,
    humanMove,
    SQUARE_DIMS,
    PLAYER_X,
    containerWidth,
    strikeStyles,
    startAll,
    PLAYER_0,
    playerChoice,
  } = useTicTacToe();

  if (gameState === GAME_STATES.notStarted) {
    return <Form />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-950">
      <span className="shadow-[0px_1px_6px_18px_rgba(147,_51,_234,_0.5)] border-purple-400 text-center text-white border-2 w-44 text-lg font-extrabold mb-12">
        You are playing as{" "}
        {playerChoice === PLAYER_X
          ? "X"
          : playerChoice === PLAYER_0
          ? "0"
          : "..."}
      </span>
      <div className="flex flex-col items-center justify-center">
        <span className="shadow-[0px_1px_6px_18px_rgba(147,_51,_234,_0.5)] border-purple-400 text-center text-white border-2 w-44 text-lg uppercase font-extrabold rounded-t-xl ">
          TIC-TAC-TOE
        </span>
        <div className="bg-black/50 shadow-[0px_1px_6px_10px_rgba(147,_51,_234,_0.5)] border-purple-400 border-2 p-6 rounded-xl ">
          <div
            className=" grid grid-cols-3 justify-center gap-2  relative"
            style={{ width: `${containerWidth}px` }}
          >
            {grid.map((value, index) => {
              const isActive = value !== null;
              return (
                <div
                  key={index}
                  data-testid={`square_${index}`}
                  onClick={() => humanMove(index)}
                  className={`text-white flex rounded-xl justify-center items-center hover:cursor-pointer shadow-[0px_1px_6px_10px_rgba(147,_51,_234,_0.5)] border-purple-400 border-2 `}
                  style={{
                    width: `${SQUARE_DIMS}px`,
                    height: `${SQUARE_DIMS}px`,
                  }}
                >
                  {isActive && (
                    <p className="text-7xl select-none">
                      {value === PLAYER_X ? "X" : "0"}
                    </p>
                  )}
                </div>
              );
            })}
            <div
              className="absolute bg-red-600"
              style={{
                height: "5px",
                width: strikeStyles?.width || "0px",
                ...strikeStyles,
              }}
            />
            <Modal />
          </div>
        </div>
        <ButtonUtils
          label="Go to Home"
          className="shadow-[0px_1px_6px_4px_rgba(147,_51,_234,_0.5)] border-2 text-white bg-none  px-3 py-0 max-sm:py-2 rounded-md mt-4"
          onClick={startAll}
        />
      </div>
    </div>
  );
};

export default TicTacToe;


//TODO: this is just a test