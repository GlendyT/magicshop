import useTetris from "@/hooks/useTetris";
import ButtonControls from "./ButtonControls";
import { colors } from "./Data/TetrisSize";
import { tiny } from "@/utils/Fonts";
import { ButtonUtils } from "@/utils/ButtonUtils";
import { formatDate } from "@/utils/FormatDates";
import Gift2 from "../../utils/gift2/page";
import ImageModal from "./ImageModal";
import { useState, useMemo } from "react";
import { RiCloseFill } from "react-icons/ri";
import Image from "next/image";
import Box from "@/utils/gift2/gift";

const Resultado = () => {
  const {
    gameOver,
    renderBoard,
    level,
    resetAll,
    birthdaysLatest,
    isGiftLocked,
    canOpenGift,
    tableBoard,
  } = useTetris();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [openall, setOpenAll] = useState(false);

  const toggleOpenAll = () => {
    setOpenAll(!openall);
  };

  const memoizedBoardCells = useMemo(() => {
    const view = renderBoard();
    return view.flatMap((row, y) =>
      row.map((cell, x) => ({ cell, x, y, key: `${y}-${x}` }))
    );
  }, [renderBoard]);
  return (
    <div
      className={`flex flex-col max-lg:flex-row  max-sm:gap-4 items-center pb-6 py-1  gap-1 ${tiny.className} `}
    >
      <div className="flex flex-row gap-2 max-sm:flex-col">
        {/* //TODO: TETRIS BOARD */}
        <div className=" flex flex-col ">
          <div className="bg-purple-950 px-5.5 py-4 rounded-lg  ">
            <div className="grid grid-cols-10 gap-px bg-purple-950   p-2 ">
              {memoizedBoardCells.map(({ cell, key }) => (
                <div
                  key={key}
                  className="w-3.8 h-4 max-sm:w-4 max-sm:h-4"
                  style={{ backgroundColor: colors[cell] }}
                />
              ))}
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
          <div className=" backdrop-blur-sm bg-black/50 p-2 w-full flex flex-col justify-center gap-2 rounded-md">
            <div className="flex flex-col max-sm:grid max-sm:grid-cols-2 gap-2 w-full  ">
              {tableBoard.map((item, index) => (
                <span
                  key={index}
                  className="flex flex-col w-full   border-b  border-gray-300"
                >
                  {item.title}
                  <span className="flex items-end justify-end">
                    {item.value}
                  </span>
                </span>
              ))}
              <Box onClick={toggleOpenAll} />
            </div>
            {/* //TODO: GIFTS */}

            <ButtonUtils
              onClick={resetAll}
              label="Restart All"
              className="bg-purple-800 text-white py-1 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 cursor-pointer"
            />
            <div
              className={`  p-2 w-44  max-sm:w-56 h-auto flex flex-col gap-2  text-center justify-center rounded-md font-sans max-sm:text-xs text-sm`}
            >
              <span>
                Gifts for future birthdays will be unlocked on their respective
                dates.
              </span>
            </div>
          </div>
          
          {/* Birthday gifts - rendered but hidden for testing */}
          <div className="hidden">
            {birthdaysLatest.map((bday, index) => {
              const isLocked = isGiftLocked(bday.date, index);
              const canOpen = canOpenGift(bday.date, index);

              return (
                <Gift2
                  key={index}
                  level={level}
                  name={bday.shortAka}
                  imageUrl={bday.birthdaycard}
                  onClick={() => {
                    if (canOpen && bday.birthdaycard) {
                      setSelectedImage(bday.birthdaycard);
                    }
                  }}
                  isLocked={isLocked}
                  canOpen={canOpen}
                />
              );
            })}
          </div>
        </div>
      </div>

      {openall && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative max-w-md max-h-[90vh] overflow-y-auto py-6 px-5 flex flex-wrap items-center justify-center gap-4 bg-purple-950/90 rounded-xl shadow-2xl">
            <ButtonUtils
              onClick={toggleOpenAll}
              className="absolute top-0 right-4 bg-black/80 hover:bg-black text-white p-2 rounded-full transition-colors duration-200 z-10"
              aria-label="Close"
              icon={<RiCloseFill className="w-4 h-4 cursor-pointer" />}
            />

            {birthdaysLatest.map((bday, index) => {
              const isLocked = isGiftLocked(bday.date, index);
              const canOpen = canOpenGift(bday.date, index);
              const shouldShowCard = !isLocked && canOpen;

              return (
                <div
                  key={index}
                  className="bg-violet-300 rounded-md text-violet-950 text-sm flex flex-col items-center justify-center p-2"
                >
                  {shouldShowCard ? (
                    <div
                      className="cursor-pointer transition-transform hover:scale-105"
                      onClick={() => {
                        if (bday.birthdaycard) {
                          setSelectedImage(bday.birthdaycard);
                        }
                      }}
                    >
                      <Image
                        src={bday.birthdaycard}
                        alt={bday.shortAka}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                      <p>
                        {bday.shortAka} {formatDate(bday.date)}{" "}
                      </p>
                    </div>
                  ) : (
                    <>
                      {bday.birthdaycard && (
                        <Image
                          src={bday.birthdaycard}
                          alt=""
                          width={50}
                          height={50}
                        />
                      )}
                      <Gift2
                        level={level}
                        name={bday.shortAka}
                        imageUrl={bday.birthdaycard}
                        onClick={() => {
                          if (canOpen && bday.birthdaycard) {
                            setSelectedImage(bday.birthdaycard);
                          }
                        }}
                        isLocked={isLocked}
                        canOpen={canOpen}
                      />
                      {formatDate(bday.date)}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedImage && (
        <ImageModal
          isOpen={true}
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default Resultado;
