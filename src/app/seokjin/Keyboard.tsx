import useFish from "@/hooks/useFish";
import classNames from "classnames";

const KEYS: string[] = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const Keyboard = () => {
  const {
    handleClick,
    pressedLetter,
    activeLetters,
    disabled,
    inactiveLetters,
  } = useFish();
  return (
    <div className="flex items-center justify-center gap-1 text-xs max-sm:px-4">
      <div className="flex flex-wrap items-center justify-center gap-2 max-sm:gap-1 max-sm:flex-wrap">
        {KEYS.map((key) => {
          const isActive = activeLetters.includes(key);
          const isInactive = inactiveLetters.includes(key);
          const isPressed = pressedLetter === key;

          const buttonClass = classNames(
            "w-8 h-8 py-1 px-2 text-lg max-sm:text-xs uppercase font-bold text-black cursor-grab",
            {
              "bg-purple-600 text-white cursor-not-allowed": isActive,
              "bg-red-400 cursor-not-allowed": isInactive,
              "bg-red-500 text-white": isPressed,
              "bg-blue-500": !isActive && !isInactive && !isPressed,
            }
          );

          return (
            <button
              onClick={() => handleClick(key)}
              className={buttonClass}
              key={key}
              disabled={isActive || isInactive || disabled}
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Keyboard;
