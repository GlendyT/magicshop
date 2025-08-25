import useTetris from "@/hooks/useTetris";
import ButtonControls from "./ButtonControls";
import { colors } from "./Data/TetrisSize";
import { tiny } from "@/utils/Fonts";
import useRequestInfo from "@/hooks/useRequestInfo";
import { ButtonUtils } from "@/utils/ButtonUtils";
import { formatDate, isFutureDate } from "@/utils/FormatDates";
import Gift2 from "../../utils/gift2/page";
import ImageModal from "./ImageModal";

const Resultado = () => {
  const {
    score,
    highScore,
    gameOver,
    renderBoard,
    level,
    resetAll,
    birthdaysLatest,
    selectedImage,
    setSelectedImage,
    isGiftLocked,
  } = useTetris();
  const { usuario } = useRequestInfo();
  const { name } = usuario;

  return (
    <div
      className={`flex flex-col items-center pb-6 py-1  gap-1  px-3 ${tiny.className} `}
    >
      <div className="flex flex-row max-sm:flex-col gap-2">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-2 max-sm:flex-col">
            {/* //TODO: TETRIS BOARD */}
            <div className=" flex flex-col">
              <div className="bg-purple-950 px-5.5 py-4 rounded-lg  ">
                <div className="grid grid-cols-10 gap-px bg-purple-950   p-2 ">
                  {renderBoard().map((row, y) =>
                    row.map((cell, x) => (
                      <div
                        key={`${y}-${x}`}
                        className="w-3.8 h-3 max-sm:w-4 max-sm:h-4"
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
            <div className="flex flex-col items-center gap-1 text-white  ">
              <div className=" backdrop-blur-sm bg-black/50 p-2 w-full flex flex-col justify-center rounded-md">
                <div className="flex flex-col max-sm:flex-row gap-4 w-full  ">
                  <span className="flex flex-col w-full   border-b  border-gray-300">
                    Score{" "}
                    <span className="flex items-end justify-end">{score}</span>{" "}
                  </span>
                  <span className="flex flex-col w-full border-b border-gray-300">
                    Level:{" "}
                    <span className="flex items-end justify-end">{level}</span>
                  </span>
                </div>
                <div className="flex flex-col  max-sm:flex-row gap-4 w-full">
                  <span className="flex flex-col w-full border-b border-gray-300 ">
                    High Score
                    <span className="flex items-end justify-end">
                      {highScore}
                    </span>
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
              <div
                className={`backdrop-blur-sm bg-black/50 p-2 w-36  max-sm:w-56 h-auto flex flex-col text-center justify-center rounded-md font-sans`}
              >
                <span className="text-white text-sm">
                  When you reach level 1, you can unlock a gift on the first
                  birthday.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* //TODO: GIFTS */}
      <div className="flex flex-row max-sm:flex-wrap  gap-1 items-center justify-center   ">
        {birthdaysLatest.map((bday, index) => (
          <div
            key={index}
            className=" bg-violet-300 rounded-md text-violet-950 text-sm flex flex-col items-center justify-center  "
          >
            <Gift2
              level={level}
              isClosest={index === 0}
              name={bday.shortAka}
              imageUrl={bday.birthdaycard}
              onClick={() =>
                !isGiftLocked(bday.date, index) &&
                setSelectedImage(bday.birthdaycard)
              }
              isLocked={index === 0 ? level === 0 : true}
            />
            {formatDate(bday.date)}
          </div>
        ))}
      </div>
      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage || ""}
      />
    </div>
  );
};

export default Resultado;
