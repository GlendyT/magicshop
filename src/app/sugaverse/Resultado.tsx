import useRequestInfo from "@/hooks/useRequestInfo";
import { sugaStyles } from "./Data/sugaStyles";
import Image from "next/image";
import useDownload from "@/hooks/useDownload";
import { pixel } from "@/utils/Fonts";
import { ButtonUtils } from "@/utils/ButtonUtils";
import { LuDownload, LuRefreshCw } from "react-icons/lu";

const Resultado = () => {
  const { usuario, handleResetContent } = useRequestInfo();
  const { handleDownloadImage } = useDownload();
  const { name, content, diseño } = usuario;
  const selectedStyle = sugaStyles.find((suga) => suga.name === diseño);

  return (
    <div className="sm:justify-center max-sm:text-xs flex flex-col gap-4">
      <div className="sm:max-w-lg w-full">
        {selectedStyle && (
          <div className={` ${selectedStyle.style[0].div1}`} id="print">
            <Image
              src={selectedStyle.image}
              alt={selectedStyle.name}
              width={500}
              height={500}
              className="relative z-10 w-96 h-auto"
              layout="responsive"
            />
            <div className={selectedStyle.style[0].div2}>
              <div className={selectedStyle.style[0].div3}>{content}</div>
              <span className={selectedStyle.style[0].p}>{name}</span>
            </div>
          </div>
        )}
      </div>
      <div
        className={`flex items-center justify-center gap-2 ${pixel.className}`}
      >
        <ButtonUtils
          label="Download"
          onClick={handleDownloadImage}
          className={`bg-black text-white py-2 px-4 `}
          disableColors="disabled:bg-opacity-25 disabled:cursor-not-allowed"
          icon={<LuDownload />}
        />
        <ButtonUtils
          label="Restart"
          onClick={handleResetContent}
          className="bg-black text-white py-2 px-4"
          icon={<LuRefreshCw />}
        />
      </div>
    </div>
  );
};

export default Resultado;
