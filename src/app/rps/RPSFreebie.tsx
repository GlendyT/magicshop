import useRequestInfo from "@/hooks/useRequestInfo";
import useRPS from "@/hooks/useRPS";
import Image from "next/image";

const RPSFreebie = () => {
  const { usuario } = useRequestInfo();
  const { userWins, computerWins } = useRPS();
  const { name, song } = usuario;
  return (
    <div className="flex items-center fixed inset-14 z-10 bg-black px-4 bg-opacity-70">
      <div className="w-auto my-2">
        <div className="relative" id="print">
          <Image
            src="/RPS/freebie.webp"
            alt="Freebie"
            width={500}
            height={500}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center">
              <div
                className={`flex flex-col items-center justify-center gap-2 `}
              >
                <div className="font-extrabold text-black gap-1 flex flex-col">
                  <span className="text-2xl max-sm:text-xl">
                    {userWins >= 2 ? name : computerWins >= 2 ? song : ""}
                  </span>
                  <span className="text-sm max-sm:text-[0.5rem]">Won against</span>
                  <span className="text-2xl max-sm:text-xl">
                    {computerWins >= 2 ? name : userWins >= 2 ? song : ""}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center gap-0 text-black text-xs font-extrabold max-sm:text-[0.5rem]">
                  <span>Thanks for plaking the game</span>
                  <span>Rock-Paper-Scissors</span>
                  <span>Keep supporting BTS projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RPSFreebie;
