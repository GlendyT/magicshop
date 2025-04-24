import useRequestInfo from "@/hooks/useRequestInfo";
import { sugaStyles } from "./Data/sugaStyles";
import Image from "next/image";
import { Button } from "@/utils/Button";
import useDownload from "@/hooks/useDownload";
import { pixel } from "@/utils/Fonts";

const Resultado = () => {
  const { usuario, handleResetContent } = useRequestInfo();
  const { handleDownloadImage } = useDownload();
  const { name, content, diseño } = usuario;
  const selectedStyle = sugaStyles.find((suga) => suga.name === diseño);

  return (
    <div className="sm:justify-center max-sm:text-xs flex flex-col gap-4">
      <div className="sm:max-w-lg w-full">
        {selectedStyle && (
          <div className={selectedStyle.style[0].div1} id="print">
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
      <div className={`flex items-center justify-center gap-2 ${pixel.className}`}>
        <Button
          label="Download"
          onClick={handleDownloadImage}
          className={`bg-black text-white py-2 px-4`}
          disableColors="disabled:bg-opacity-25 disabled:cursor-not-allowed"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 float-end"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          }
        />
        <Button
          label="Restart"
          onClick={handleResetContent}
          className="bg-black text-white py-2 px-4"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 float-end text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default Resultado;
