import useDownload from "@/hooks/useDownload";
import useTicTacToe from "@/hooks/useTicTacToe";
import { ButtonUtils } from "@/utils/ButtonUtils";
import Image from "next/image";

const Modal = () => {
  const { winner, startNewGame, modalOpen } = useTicTacToe();
  const { handleDownloadImage } = useDownload();

  if (!modalOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-60 flex items-center justify-center z-50 flex-col gap-4">
      <div
        className="relative w-80 bg-white py-6 px-5 border border-gray-300 rounded flex flex-col outline-none items-center justify-center gap-2"
        id="print"
      >
        <p className="text-2xl font-bold upercase flex items-center">
          Game over
        </p>
        <p className={`flex-1 text-center`}> {winner} </p>
        <div>
          <Image
            src="/Logos/xoxo.webp"
            alt="tictactoewithbts"
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <ButtonUtils
          className="text-base bg-white px-6 text-black  py-1 rounded-sm"
          label="Start Over"
          onClick={startNewGame}
        />
        <ButtonUtils
          className="text-base bg-white px-6 text-black py-1 rounded-sm"
          label="Download"
          onClick={handleDownloadImage}
        />
      </div>
    </div>
  );
};

export default Modal;
