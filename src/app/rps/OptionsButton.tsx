import { OptionButtonProps } from "@/types/index";
import Image from "next/image";


const OptionsButton = ({
  option,
  handlePlay,
  disabled,
  turns,
  maxTurns,
}: OptionButtonProps) => {
  return (
    <button
      className={`px-4 py-2 m-2 text-xl font-bold text-white bg-purple-400 rounded-full hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-400`}
      disabled={disabled || turns >= maxTurns}
      onClick={() => handlePlay(option.id)}
      title={option.name}
    >
      <Image
        src={option.emoji}
        alt="rockpaperscissors"
        className="w-20"
        width={100}
        height={100}
      />
    </button>
  );
};

export default OptionsButton;
