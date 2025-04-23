import useRPS from "@/hooks/useRPS";
import Image from "next/image";

type ResultIconProp = {
  result: number | null;
  isUser?: boolean;
};
type EmojiesRPSProps = {
  emoji: string;
  bgColor: string;
};

const ResultIcon = ({ result, isUser }: ResultIconProp) => {
  if (result === null) return null;

  if (result === 0) return <p className="text-6xl max-md:text-4xl">🟰</p>;

  const isWin = isUser ? result === 1 : result === 2;
  return <p className="text-6xl max-md:text-4xl">{isWin ? "✅" : "❌"}</p>;
};

const EmojiDisplay = ({ emoji, bgColor }: EmojiesRPSProps) => (
  <Image
    src={emoji}
    alt="emoji"
    className={`w-20 max-md:w-14 rounded-full p-2 ${bgColor}`}
    width={100}
    height={100}
  />
);

export const UserImgRPS = () => {
  const { result, userChoice, options, userMessage } = useRPS();
  const userBgColor =
    result === 1
      ? "border-4 border-green-400"
      : result === 2
      ? "border-4 border-red-400"
      : "border-4 border-blue-400";

  const emoji = userChoice !== null ? options[userChoice]?.emoji : null;

  return (
    <div className="w-full flex flex-row items-center justify-center py-2">
      <ResultIcon result={result} isUser={true} />
      <p className="text-xl text-center py-4 flex flex-col items-center justify-center">
        {userMessage && emoji && (
          <EmojiDisplay emoji={emoji} bgColor={userBgColor} />
        )}
      </p>
      <ResultIcon result={result} isUser={true} />
    </div>
  );
};

export const BtsImgRPS = () => {
  const { result, computerChoice, options, userMessage } = useRPS();
  const btsBgColor =
    result === 2
      ? "border-4 border-green-400"
      : result === 1
      ? "border-4 border-red-400"
      : "border-4 border-blue-400";

  const emoji = computerChoice !== null ? options[computerChoice]?.emoji : null;

  return (
    <div
      className={`w-full bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center py-4 cursor-not-allowed rounded-b-xl ${btsBgColor}`}
    >
      <div className="w-full flex flex-row items-center justify-center">
        <ResultIcon result={result} isUser={false} />
        <p className="text-xl text-center py-4 flex flex-col items-center justify-center">
          {userMessage && emoji && (
            <EmojiDisplay emoji={emoji} bgColor={btsBgColor} />
          )}
        </p>
        <ResultIcon result={result} isUser={false} />
      </div>
      <div className="flex flex-row items-center justify-center">
        {options.map((option) => (
          <div
            key={option.id}
            className="px-4 py-2 m-2 text-xl text-white rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Image
              src={option.emoji}
              alt="option"
              className="w-20 max-md:w-10"
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
