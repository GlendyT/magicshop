import useDownload from "@/hooks/useDownload";
import { providence } from "@/utils/Fonts";
import useRequestInfo from "@/hooks/useRequestInfo";
import { ButtonUtils } from "@/utils/ButtonUtils";
import { festaBts } from "./data";
import Image from "next/image";

export default function Resultado() {
  const { usuario, handleResetContent, isMobile } = useRequestInfo();
  const { name, content, diseño } = usuario;
  const { handleDownloadImage } = useDownload();

  const selectedStyleMember = isMobile
    ? festaBts.find((styleMember) => styleMember.name === "Vertical Style")
    : festaBts.find((styleMember) => styleMember.name === "Square Style");
  const selectedStyle = selectedStyleMember?.styles.find(
    (style) => style.name === diseño
  );

  return (
    <div className="relative flex flex-col gap-2 justify-center items-center  max-sm:text-xs">
      <div className={`relative w-full ${providence.className}`} id="print">
        {selectedStyle?.image && (
          <Image
            src={selectedStyle.image}
            alt={selectedStyle.name}
            width={500}
            height={500}
            className="rounded shadow-2xl mx-auto  max-sm:w-72"
          />
        )}

        <div
          className={`absolute inset-0 flex flex-col font-extrabold items-center justify-end  ${
            isMobile ? "pb-16" : "pb-[5rem]"
          }`}
        >
          <div
            className={`flex flex-col items-center justify-center gap-1 bg-white/90 rounded-xs px-1 ${selectedStyle?.color} `}
          >
            {name} from {content}
          </div>
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
  );
}
