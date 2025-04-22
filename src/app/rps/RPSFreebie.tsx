import useRequestInfo from "@/hooks/useRequestInfo";
import useRPS from "@/hooks/useRPS";
import Image from "next/image";

const RPSFreebie = () => {
  const { usuario } = useRequestInfo();
  const { userWins, computerWins } = useRPS();
  const { name, song } = usuario;
  return (
    <div className="flex items-center fixed inset-14 z-10 bg-black bg-opacity-70">
      <div className="w-auto my-2">
        <div className="relative" id="print">
          <Image
            src="/RPS/freebie.png"
            alt="Freebie"
            width={500}
            height={500}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="font-extrabold text-black gap-1 flex flex-col">
                  <p className="text-3xl">
                    {userWins >= 2 ? name : computerWins >= 2 ? song : ""}
                  </p>
                  <p className="text-sm">Won against</p>
                  <p className="text-3xl">
                    {computerWins >= 2 ? name : userWins >= 2 ? song : ""}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-0 text-black text-sm font-extrabold">
                  <p>Thanks for plaking the game</p>
                  <p>Rock-Paper-Scissors</p>
                  <p>Keep supporting BTS projects</p>
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
