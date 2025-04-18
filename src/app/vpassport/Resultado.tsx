import useDownload from "@/hooks/useDownload";
import useRequestInfo from "@/hooks/useRequestInfo";
import { Button } from "@/utils/Button";
import Image from "next/image";
import Passport from "./Passport";

const Resultado = () => {
  const { handleDownloadImage } = useDownload();
  const { handleResetContent } = useRequestInfo();
  const { image } = useRequestInfo();
  return (
    <div className="flex flex-col items-start justify-start">
      <div
        className="flex items-center justify-center bg-transparent"
        id="print"
      >
        <div className="shadow-md rounded-xl w-full h-full">
          <Image
            src={image}
            alt="vpassport"
            width={185}
            height={185}
            className="w-96 h-auto"
            layout="responsive"
          />
        </div>
        <Passport />
      </div>

      <div className="flex gap-2 items-center justify-center w-full ">
        <Button
          label="Download"
          onClick={handleDownloadImage}
          className="bg-black text-white hover:bg-[rgb(32,95,30)] hover:text-black py-3 px-2 uppercase"
        />
        <Button
          label="Restart"
          onClick={handleResetContent}
          className="bg-black text-white hover:bg-[rgb(93,40,95)] hover:text-black py-3 px-2 uppercase"
        />
      </div>
    </div>
  );
};

export default Resultado;
