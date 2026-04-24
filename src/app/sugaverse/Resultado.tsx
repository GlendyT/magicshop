import useRequestInfo from "@/hooks/useRequestInfo";
import { sugaStyles } from "./Data/sugaStyles";
import Image from "next/image";
import useDownload from "@/hooks/useDownload";
import { pixel } from "@/utils/Fonts";
import { ButtonUtils } from "@/utils/ButtonUtils";
import { LuDownload, LuRefreshCw } from "react-icons/lu";
import { useSugaVerse } from "lib/useBTS";

const Resultado = () => {
  const { usuario, handleResetContent } = useRequestInfo();
  const { handleDownloadImage } = useDownload();
  const { sugaverse, isLoading } = useSugaVerse();
  const { name, content, diseño } = usuario;

  // Buscamos el índice de la canción en la BD
  const dbIndex = (sugaverse || []).findIndex(
    (suga) => suga.name === diseño || suga.$id === diseño,
  );
  const dbData = dbIndex !== -1 ? sugaverse[dbIndex] : undefined;

  // Asignamos uno de los 6 estilos cíclicamente usando el operador módulo (%)
  // Si no hay índice válido, usa el primer estilo por defecto
  const localStyle =
    dbIndex !== -1 ? sugaStyles[dbIndex % sugaStyles.length] : sugaStyles[0];

  return (
    <div className="sm:justify-center max-sm:text-xs flex flex-col gap-4">
      <div className="sm:max-w-lg w-full">
        {isLoading ? (
          <div className="w-96 h-96 flex items-center justify-center bg-gray-800 rounded-lg border border-gray-600">
            <p className="text-white">Loading artwork...</p>
          </div>
        ) : dbData && localStyle ? (
          <div className={` ${localStyle.style[0].div1}`} id="print">
            {dbData.image ? (
              <Image
                src={dbData.image}
                alt={dbData.name}
                width={500}
                height={500}
                className="relative z-10 w-96 h-auto"
                
              />
            ) : (
              <div className="relative z-10 w-96 h-96 flex items-center justify-center bg-gray-800">
                <p className="text-white text-center px-4">Image not available</p>
              </div>
            )}
            <div className={localStyle.style[0].div2}>
              <div className={localStyle.style[0].div3}>{content || "..."}</div>
              <span className={localStyle.style[0].p}>{name || "ARMY"}</span>
            </div>
          </div>
        ) : (
          <div className="w-96 h-96 flex items-center justify-center bg-gray-800 rounded-lg border border-gray-600">
            <p className="text-white text-center px-4">Design not found</p>
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
          disabled={isLoading || !dbData?.image}
        />
        <ButtonUtils
          label="Restart"
          onClick={handleResetContent}
          className="bg-black text-white py-2 px-4"
          icon={<LuRefreshCw />}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default Resultado;
