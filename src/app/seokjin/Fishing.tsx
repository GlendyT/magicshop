import useFish from "@/hooks/useFish";
import Image from "next/image";
import Keyboard from "./Keyboard";

const VerticalLine = () => {
  return (
    <div className="w-[0.3rem] h-6 bg-blue-950 mx-10 max-sm:mx-8 max-xl:mx-16 max-sm:w-[0.2rem] max-sm:h-2"></div>
  );
};
const Fishing = () => {
  const {
    isWinner,
    isLoser,
    correctGuessCount,
    wordToGuess,
    guessedLetters,
    reveal,
  } = useFish();
  return (
    <div className="flex flex-col px-20 max-sm:px-8 items-center  gap-6 relative z-10">
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
          width={500}
          height={500}
          className={` w-96 transition-all duration-500 ease-in-out transform ${
            isWinner ? "" : isLoser ? "w-96" : "w-80"
          }`}
        />
        <div className="absolute right-0 top-44 max-sm:top-32 max-xl:top-80 flex flex-col items-center">
          {!isWinner &&
            !isLoser &&
            Array.from({ length: correctGuessCount }).map((_, index) => (
              <VerticalLine key={index} />
            ))}
        </div>
      </div>
      <div className="flex gap-1 text-4xl font-extrabold uppercase font-mono">
        {wordToGuess.split("").map((letter, index) => (
          <span style={{ borderBottom: ".1rem solid black" }} key={index}>
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
    </div>
  );
};

export default Fishing;
