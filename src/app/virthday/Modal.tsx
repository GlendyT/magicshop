import useDownload from "@/hooks/useDownload";
import useFlip from "@/hooks/useFlip";
import useRequestInfo from "@/hooks/useRequestInfo";
import Image from "next/image";
import { virthdayGift } from "./Data/imagesList";
import { ButtonUtils } from "@/utils/ButtonUtils";

const Modal = () => {
  const { handleDownloadImage } = useDownload();
  const { usuario } = useRequestInfo();
  const { handleRestart } = useFlip();
  const { name, diseño } = usuario;
  const selectedStyle = virthdayGift.find((vgift) => vgift.name === diseño);
  return (
    <>
      <div className="flex justify-center items-center fixed inset-10 z-40">
        <div className="w-auto my-2 mx-auto">
          <div className="shadow-lg flex- flex-col w-full outline-none focus:outline-none">
            <div className="relative" id="print">
              {selectedStyle && (
                <Image
                  src={selectedStyle.image}
                  alt={selectedStyle.name}
                  width={185}
                  height={185}
                  className="w-auto h-96"
                />
              )}

              <div className={` absolute inset-0 flex flex-col items-center px-4 py-2 rounded-md font-extrabold text-xs max-sm:text-xs max-md:text-xs max-lg:text-xs max-2xl:text-xs text-white tracking-wide capitalized  ${selectedStyle?.style}`}>
                From
                <span className="text-xs max-lg:text-xs max-sm:text-xs max-sm:font-extrabold max-2xl:text-xs">
                  {name}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-center p-4 max-sm:text-xs font-extrabold text-lg">
            <ButtonUtils
              label="Download"
              onClick={handleDownloadImage}
              className="bg-green-950 hover:bg-green-900 text-white p-2 rounded-xl transition-all uppercase"
            />
            <ButtonUtils
              label="Restart"
              className="bg-blue-950 p-2 text-white rounded-xl hover:bg-blue-900 hover:text-gray-200 transition-all uppercase"
              onClick={handleRestart}
            />
          </div>
        </div>
      </div>
      <div className="opacity-100 fixed inset-8 z-30 bg-black/60 rounded-3xl max-sm:inset-8 max-lg:inset-8"></div>
    </>
  );
};

export default Modal;
