import Image from "next/image";
import { btsPhrase } from "./btsPhrase";

const Card = () => {
  const randomIndex = Math.floor(Math.random() * btsPhrase.length);
  const randomPhrase = btsPhrase[randomIndex];
  return (
    <div className="relative min-h-screen flex flex-col items-center gap-4 text-xl justify-center max-sm:px-10  max-sm:bg-center pt-16 bg-polaroid">
      <div className="bg-white border-pink-300 border-4 p-6 grid grid-row-2 justify-items-center">
        <Image
          src={randomPhrase.image}
          alt="btsphrase"
          width={100}
          height={100}
          className="w-72 justify-center border-pink-300 border-4"
        />
        <div className="pt-4 flex flex-row-2 justify-between w-full items-center text-pink-300">
            <Image src="/Only-graphic-darkpurple.png" alt="logoarmy" width={100} height={100} className="w-14 h-14 pl-2"/>
          <div className="text-lg max-sm:text-sm">
            <div className="  italic">
              Special thanks to{" "}
              <p className=" font-bold italic ">{randomPhrase.title} ,</p>{" "}
              <p className="font-extrabold">ARMY</p>
            </div>
            <p className="text-end font-bold">- {randomPhrase.from}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
