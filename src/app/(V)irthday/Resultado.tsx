import useFlip from "@/hooks/useFlip";
import { ImageListTypes } from "@/types/index";
import Image from "next/image";

type ResultadoProps = {
  item: ImageListTypes;
};

const Resultado = ({ item }: ResultadoProps) => {
  const { onCardClick, isFlipped, gameStarted } = useFlip();
  return (
    <div
      className={`w-24 h-24 group perspective max-sm:h-16 max-sm:w-16 ${
        gameStarted ? "" : "cursor-not-allowed"
      }`}
      onClick={() => onCardClick(item)}
    >
      <div
        className={`relative preserve-3d w-full h-full duration-1000 ${
          isFlipped(item) ? "my-rotate-y-180" : ""
        }`}
      >
        <div
          className={`absolute bg-virthday2 bg-center bg-cover overflow-hidden inset-0 backface-hidden max-sm:pb-2 max-sm:px-4 ${
            gameStarted ? "" : "opacity-75"
          } `}
        ></div>

        <div
          className={`absolute backface-hidden w-full h-full overflow-hidden my-rotate-y-180`}
        >
          <Image
            src={item.img}
            alt="virthday"
            width={185}
            height={185}
            className={`absolute inset-0 backface-hidden object-contain transition-colors border-8 ${
              item.price === "wrong" ? "border-red-600" : "border-green-600"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Resultado;

