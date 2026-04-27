import useDownload from "@/hooks/useDownload";
import useRequestInfo from "@/hooks/useRequestInfo";
import { loveNotesImg } from "./Data/loveNotesImg";
import Image from "next/image";
import { virthday3 } from "@/utils/Fonts";
import { ButtonUtils } from "@/utils/ButtonUtils";
import { useLoveNotes } from "lib/useBTS";

const Resultado = () => {
  const { usuario, handleResetContent } = useRequestInfo();
  const { handleDownloadImage } = useDownload();
  const { name, content, diseño } = usuario;
  const { lovenotes, isLoading } = useLoveNotes();

  const dbIndex = (lovenotes || []).findIndex(
    (love) => love.btsMembers.name === diseño || love.$id === diseño,
  );
  const dbData = dbIndex !== -1 ? lovenotes[dbIndex] : undefined;

  const localStyle =
    dbIndex !== -1
      ? loveNotesImg[dbIndex % loveNotesImg.length]
      : loveNotesImg[0];

  return (
    <div className={`flex flex-col gap-6  ${virthday3.className}`}>
      <div
        className={`flex flex-col shadow-2xl shadow-black/80 font-virthday3`}
        id="print"
      >
        {isLoading ? (
          <div className="w-96 h-96 flex items-center justify-center bg-gray-800 rounded-lg border border-gray-600">
            <p className="text-white">Loading artwork...</p>
          </div>
        ) : dbData && localStyle ? (
          <div className={localStyle.style[0].div1}>
            <Image
              src={dbData.image}
              alt={dbData.btsMembers?.name || "BTS Member"}
              width={500}
              height={500}
              className=""
            />
            <div className={localStyle.style[0].div2}>
              <span className={localStyle.style[0].div3}>
                To: <span className={localStyle.style[0].to}>{name}</span>
              </span>

              <span className={localStyle.style[0].p}>
                Love:
                <span className={localStyle.style[0].from}>{content}</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="w-96 h-96 flex items-center justify-center bg-gray-800 rounded-lg border border-gray-600">
            <p className="text-white text-center px-4">Design not found</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-2">
        <ButtonUtils
          label="Download"
          onClick={handleDownloadImage}
          className="bg-black text-white py-2 px-4"
          disableColors="disabled:bg-opacity-25 disabled:cursor-not-allowed"
        />
        <ButtonUtils
          label="Restart"
          onClick={handleResetContent}
          className="bg-black text-white py-2 px-4"
        />
      </div>
    </div>
  );
};

export default Resultado;
