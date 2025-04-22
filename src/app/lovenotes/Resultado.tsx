import useDownload from "@/hooks/useDownload";
import useRequestInfo from "@/hooks/useRequestInfo";
import { loveNotesImg } from "./loveNotesImg";
import Image from "next/image";
import { Button } from "@/utils/Button";

const Resultado = () => {
  const { usuario, handleResetContent } = useRequestInfo();
  const { handleDownloadImage } = useDownload();
  const { name, content, diseño } = usuario;
  const selectedStyle = loveNotesImg.find(
    (lovenote) => lovenote.name === diseño
  );
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col shadow-2xl shadow-black/80" id="print">
        {selectedStyle && (
          <div className={selectedStyle.style[0].div1}>
            <Image
              src={selectedStyle.image}
              alt={selectedStyle.name}
              width={500}
              height={500}
              className=""
            />
            <div className={selectedStyle.style[0].div2}>
              <p className={selectedStyle.style[0].div3}>
                To: <span className={selectedStyle.style[0].to}>{name}</span>
              </p>

              <p className={selectedStyle.style[0].p}>
                Love:
                <span className={selectedStyle.style[0].from}>{content}</span>
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button
          label="Download"
          onClick={handleDownloadImage}
          className="bg-black text-white py-2 px-4"
          disableColors="disabled:bg-opacity-25 disabled:cursor-not-allowed"
        />
        <Button
          label="Restart"
          onClick={handleResetContent}
          className="bg-black text-white py-2 px-4"
        />
      </div>
    </div>
  );
};

export default Resultado;
