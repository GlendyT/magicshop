import useDownload from "@/hooks/useDownload";
import { providence } from "@/utils/Fonts";
import useRequestInfo from "@/hooks/useRequestInfo"
import { ButtonUtils } from "@/utils/ButtonUtils";

export default function Resultado() {
    const {usuario, handleResetContent} = useRequestInfo();
    const {name, content, diseño} = usuario;
    const { handleDownloadImage} = useDownload()
    

  return (
    <div className="relative flex flex-col gap-2 justify-center items-center  max-sm:text-xs">
      <div className="relative w-full" id="print">
        <span>
            {name}
        </span>
        <span>
           {content}
        </span>
         <span  >
            {diseño}
         </span>
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
            label="Restart"
            onClick={handleResetContent}
            className="bg-black text-white py-4 px-2 uppercase"
        />{" "}
     </div>
    </div>
  )
}
