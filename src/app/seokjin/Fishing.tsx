import useFish from "@/hooks/useFish";
import Image from "next/image";
import Keyboard from "./Keyboard";
import { ButtonUtils } from "@/utils/ButtonUtils";

const Fishing = () => {
  const {
    isWinner,
    isLoser,
    wordToGuess,
    guessedLetters,
    reveal,
    handleCloseandRestart,
  } = useFish();
  return (
    <div data-testid="fishing" className="flex flex-col px-20 max-sm:px-8 items-center  gap-4 relative z-10 max-sm:gap-2">
      <div className="relative inline-block">
        <Image
          src={
            isWinner
              ? "/FishJin/jin_winner.webp"
              : isLoser
              ? "/FishJin/jin_loser.webp"
              : "/FishJin/jin_fishing.webp"
          }
          alt="fishingjin"
          width={300}
          height={300}
          className={` transition-all duration-500 ease-in-out transform ${
            isWinner ? "" : isLoser ? "w-[20rem]" : "w-80"
          }`}
        />

      </div>
      <div className="flex gap-1 text-4xl font-extrabold uppercase font-mono">
        {wordToGuess.split("").map((letter, index) => (
          <span
            className="border-b border-black border-solid max-sm:text-2xl "
            key={index}
          >
            <span
              style={{
                visibility:
                  guessedLetters.includes(letter) || reveal
                    ? "visible"
                    : "hidden",
                color:
                  !guessedLetters.includes(letter) && reveal ? "red" : "black",
              }}
            >
              {letter}
            </span>
          </span>
        ))}
      </div>
      <Keyboard />
      {isLoser ? (
        <ButtonUtils
          label={isWinner || isLoser ? "Try again" : ""}
          onClick={handleCloseandRestart}
          className={` ${
            isWinner || isLoser
              ? "px-4 py-2 bg-black text-xs text-white rounded-xl hover:bg-slate-900 hover:text-white transition-all uppercase max-md:text-xs"
              : ""
          }`}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Fishing;
