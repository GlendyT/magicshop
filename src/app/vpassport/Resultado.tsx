import useDownload from "@/hooks/useDownload";
import useRequestInfo from "@/hooks/useRequestInfo";
import Image from "next/image";
import Passport from "./Passport";
import { michroma } from "@/utils/Fonts";
import { ButtonUtils } from "@/utils/ButtonUtils";

const Resultado = () => {
  const { handleDownloadImage } = useDownload();
  const { handleResetContent } = useRequestInfo();
  const { image } = useRequestInfo();
  return (
    <div
      className={`flex flex-col items-start justify-start ${michroma.className}`}
    >
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

      <div className="flex gap-2 pt-2 items-center justify-center w-full ">
        <ButtonUtils
          label="Download"
          onClick={handleDownloadImage}
          className={`bg-black text-white hover:bg-[rgb(32,95,30)] hover:text-black py-3 px-2 uppercase font-extrabold ${michroma.className} `}
        />
        <ButtonUtils
          label="Restart"
          onClick={handleResetContent}
          className={`bg-black text-white font-extrabold hover:bg-[rgb(93,40,95)] hover:text-black py-3 px-2 uppercase ${michroma.className}`}
        />
      </div>
    </div>
  );
};

export default Resultado;
