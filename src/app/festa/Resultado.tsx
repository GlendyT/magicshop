import useDownload from "@/hooks/useDownload";
import { providence } from "@/utils/Fonts";
import useRequestInfo from "@/hooks/useRequestInfo"
import { ButtonUtils } from "@/utils/ButtonUtils";
import { festaBts } from "./data";
import Image from "next/image";


export default function Resultado() {

    const {usuario, handleResetContent, isMobile} = useRequestInfo();
    const {name, content, diseño} = usuario;
    const { handleDownloadImage} = useDownload()

    const selectedStyleMember = isMobile
    ? festaBts.find (
      (styleMember) => styleMember.name === "Vertical Style"
    )
    : festaBts.find((styleMember) => styleMember.name === "Square Style");
    const selectedStyle = selectedStyleMember?.styles.find(
      (style) => style.name === diseño
    )
    
  return (
    <div className="relative flex flex-col gap-2 justify-center items-center  max-sm:text-xs">
      <div className="relative w-full" id="print">
        {selectedStyle?.image && (
          <Image
            src={selectedStyle.image}
            alt={selectedStyle.name}
            width={300}
            height={300}
          />
        )}
       
        <div
          className={`absolute inset-0 flex flex-col font-extrabold items-center justify-end text-white drop-shadow-lg ${
            isMobile ? "pb-20" : "pb-[3rem]"
          }`}
        >
          <span className={`text-sm px-14 max-sm:text-xs ${selectedStyle?.color}`} >
           {name}
          </span>
          <span className={`text-sm px-14 max-sm:text-xs ${selectedStyle?.color}`} >
             {content}
          </span>
          <span>
            {diseño}
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
            label="Restart"
            onClick={handleResetContent}
            className="bg-black text-white py-4 px-2 uppercase"
        />{" "}
     </div>
    </div>
  )
}
