import useDownload from "@/hooks/useDownload";
import useFish from "@/hooks/useFish";
import useRequestInfo from "@/hooks/useRequestInfo";
import { ButtonUtils } from "@/utils/ButtonUtils";
import Image from "next/image";

const Modal = () => {
  const { handleDownloadImage } = useDownload();
  const { usuario } = useRequestInfo();
  const { isWinner, handleCloseandRestart, isLoser } =
    useFish();
  const { name } = usuario;

  return (
    <div data-testid="modal" className="flex flex-col justify-center items-center inset-10 z-40">
      <div className=" my-2 mx-auto">
        <div className="relative font-pressgame" id="print">
          <Image
            src={"/FishJin/certificado2.webp"}
            alt="fishingjin"
            width={600}
            height={600}
          />
          <div className="absolute inset-0 flex items-center justify-center text-center gap-5 px-10 text-sm max-md:text-xs pt-10 max-sm:pt-2">
            <div className="flex flex-col items-center justify-center pb-10 max-md:pb-0 max-md:mb-2">
              <span className="max-md:text-xs max-sm:text-[0.6rem] text-black">
                {name}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-center p-4 max-sm:text-xs">
        <ButtonUtils
          label="Download"
          onClick={handleDownloadImage}
          className="bg-blue-900 hover:bg-blue-700 text-white p-2 rounded-xl uppercase"
        />
        <ButtonUtils
          label={isWinner || isLoser ? "Play again" : ""}
          onClick={handleCloseandRestart}
          className={` ${isWinner || isLoser
              ? "px-4 py-2 bg-black text-white rounded-xl hover:bg-slate-900 hover:text-white transition-all uppercase max-md:text-xs"
              : ""
            }`}
        />
      </div>
    </div>
  );
};

export default Modal;
