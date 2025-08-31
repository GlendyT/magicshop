import useDownload from "@/hooks/useDownload";
import useRequestInfo from "@/hooks/useRequestInfo";
import { ImageModalProps } from "@/types/index";
import { ButtonUtils } from "@/utils/ButtonUtils";
import Image from "next/image";
import React, { useEffect } from "react";

const ImageModal = ({ isOpen, imageUrl, onClose }: ImageModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const { usuario } = useRequestInfo();
  const { name } = usuario;
  const { handleDownloadImage } = useDownload();
  

  return (
    <div
      data-testid="modal"
      className="absolute flex flex-col   justify-center items-center inset-5 bg-black/80 z-40 overflow-hidden "
    >
      <div className=" my-2 mx-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative font-indie" id="print">
          <Image src={imageUrl} alt="Freebie" width={400} height={450} />
          <div className="absolute inset-0 flex items-center justify-center text-center gap-5 px-10 text-sm max-md:text-xs pt-10 max-sm:pt-6">
            <div className="relative flex flex-col items-center justify-center pt-76 mt-3 left-14   ">
              <span className="text-[0.6rem]  max-md:text-xs max-sm:text-[0.8rem] text-black tracking-tighter text-montserrat">
                {name}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-center  max-sm:text-xs">
        <ButtonUtils
          label="Download"
          onClick={handleDownloadImage}
          className="bg-violet-950 hover:bg-violet-900 cursor-pointer text-white p-2 rounded-xl uppercase"
        />
        <ButtonUtils
          label="Close"
          onClick={onClose}
          className="bg-violet-950 hover:bg-violet-900 cursor-pointer text-white p-2 rounded-xl uppercase"
        />
      </div>
    </div>
  );
};

export default ImageModal;
