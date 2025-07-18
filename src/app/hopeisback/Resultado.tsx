import useRequestInfo from "@/hooks/useRequestInfo";
import Image from "next/image";
import { hobiPersonalized } from "./Data/hobiPersonalized";
import useDownload from "@/hooks/useDownload";
import { providence } from "@/utils/Fonts";
import { ButtonUtils } from "@/utils/ButtonUtils";

const Resultado = () => {
  const { isMobile, usuario, handleResetContent } = useRequestInfo();
  const { handleDownloadImage } = useDownload();
  const { name, content, diseño } = usuario;

  const selectedStyleGroup = isMobile
    ? hobiPersonalized.find(
        (styleGroup) => styleGroup.name === "Vertical Style"
      )
    : hobiPersonalized.find((styleGroup) => styleGroup.name === "Square Style");
  const selectedStyle = selectedStyleGroup?.styles.find(
    (style) => style.name === diseño
  );

  return (
    <div className="relative flex flex-col gap-2 justify-center items-center max-sm:text-xs">
      <div className={`relative w-full font-providence`} id="print">
        {selectedStyle?.image && (
          <Image
            src={selectedStyle.image}
            alt={selectedStyle?.name}
            width={300}
            height={300}
            className="rounded shadow-lg mx-auto w-96 max-sm:w-72 h-auto"
          />
        )}

        <div
          className={`absolute inset-0 flex flex-col font-extrabold items-center justify-end text-white drop-shadow-lg ${
            isMobile ? "pb-20" : "pb-[3rem]"
          }`}
        >
          <span className={`text-sm px-14 max-sm:text-xs ${selectedStyle?.color}`}>
            {name}
          </span>
          <span className={`text-sm px-14 max-sm:text-xs ${selectedStyle?.color}`}>
            from {content}
          </span>
        </div>
      </div>
      <div
        className={`flex flex-row gap-3 justify-center ${providence.className}`}
      >
        <ButtonUtils
          label="Download"
          onClick={handleDownloadImage}
          className="bg-black text-white py-4 px-2 uppercase"
        />
        <ButtonUtils
          label="restart"
          onClick={handleResetContent}
          className="bg-black text-white py-4 px-2 uppercase"
        />{" "}
      </div>
    </div>
  );
};

export default Resultado;
