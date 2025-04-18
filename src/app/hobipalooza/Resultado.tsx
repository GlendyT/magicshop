import useDownload from "@/hooks/useDownload";
import useRequestInfo from "@/hooks/useRequestInfo";
import { Button } from "@/utils/Button";
import Image from "next/image";
import HobiTitleAnimation from "./HobiTitleAnimation";

const Resultado = () => {
  const { usuario, handleResetContent } = useRequestInfo();
  const { handleDownloadImage } = useDownload();
  const { name, diseño, song } = usuario;
  const titleStyles =
    "bg-black mx-auto px-2 text-white uppercase font-bold text-center max-sm:text-xs";
  const stylesButton =
    "text-white bg-pink-600 py-3 px-2 hover:bg-black hover:text-[#5abecd] uppercase";
  return (
    <div className="flex flex-col gap-2">
      <HobiTitleAnimation/>
      <p className={`${titleStyles}`}>
        Don´t forget to scan your QR code for a surprise!
      </p>
      <p className={`${titleStyles}`}>
        Here it is your ticket, keep supporting j-hope´s work
      </p>
      <div className="relative flex justify-center items-center max-sm:text-xs">
        <div className="relative w-full" id="print">
          <Image
            src="/Hobipalooza/2.avif"
            alt="hobipalooza"
            width={500}
            height={500}
            className="w-96 h-auto relative"
            layout="responsive"
          />
          <div className="absolute inset-0 flex flex-col  items-start pb-36  max-sm:pb-14 max-sm:gap-1 max-lg:pb-20 justify-end text-black uppercase">
            <div className="text-lg font-extrabold px-16 max-sm:text-[0.4rem] max-lg:text-[0.5rem] max-lg:px-8 max-sm:px-6 flex flex-col gap-2 max-sm:gap-1">
              <p>Name: {name}</p>
              <p>Row: {diseño}</p>
              <p>Seat: {song}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button
          label="Download"
          onClick={handleDownloadImage}
          className={`${stylesButton}`}
        />
        <Button
          label="Restart"
          onClick={handleResetContent}
          className={`${stylesButton}`}
        />
      </div>
    </div>
  );
};

export default Resultado;
