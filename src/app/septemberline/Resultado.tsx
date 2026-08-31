import useDownload from "@/hooks/useDownload";
import useRequestInfo from "@/hooks/useRequestInfo";
import ImageResult from "./ImageResult";
import { michroma } from "@/utils/Fonts";
import { ButtonUtils } from "@/utils/ButtonUtils";

const Resultado = () => {
  const { handleDownloadImage } = useDownload();
  const { handleResetContent } = useRequestInfo();
  
  return (
    <div
      className={`flex flex-col items-center justify-center ${michroma.className}`}
    >
      <div
        className="flex items-center justify-center bg-transparent font-michroma mb-4"
        id="print"
      >
        <ImageResult />
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
