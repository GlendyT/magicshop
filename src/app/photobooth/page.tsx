"use client";
import usePhotobooth from "@/hooks/usePhotobooth";
import useImageCrop from "@/hooks/useImageCrop";
import { ChangeEvent } from "react";
import Image from "next/image";
import PhotoButton from "./PhotoButton";
import Modal from "./base/Modal";
import ImageCropModalContent from "./ImageCropModalContent";
import Logo from "./Logo";
import Photo2 from "./photos/Photo2";
import Photo3 from "./photos/Photo3";
import Photo from "./photos/Photo";

type PhotoboothProps = {
  openModal: boolean;
  preview1: string | null;
  preview2: string | null;
  preview3: string | null;
  setPreview1: (preview: string | null) => void;
  setPreview2: (preview: string | null) => void;
  setPreview3: (preview: string | null) => void;
  setOpenModal: (openModal: boolean) => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  backgroundImage: string | null;
  setBackgroundImage?: (backgroundImage: string | null) => void;
  handleSelection: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Photobooth = () => {
  const {
    setPreview1,
    setPreview2,
    setPreview3,
    preview1,
    preview2,
    preview3,
    openModal,
    setOpenModal,
    handleFileChange,
    backgroundImage,
  }: PhotoboothProps = usePhotobooth();
  const { getProcessedImage, resetStates } = useImageCrop();

  const handleDone = async (): Promise<File | undefined> => {
    const avatar = await getProcessedImage();
    if (!avatar) return;
    const previews = [preview1, preview2, preview3];
    const index = previews.findIndex((preview) => !preview);

    if (index !== -1) {
      previews[index] = window.URL.createObjectURL(avatar);
      setPreview1(previews[0]);
      setPreview2(previews[1]);
      setPreview3(previews[2]);
    }
    resetStates();
    setOpenModal(false);
    return avatar;
  };
  return (
    <div className=" min-h-screen bg-photostrip">
      <div className="flex flex-col gap-2 max-md:gap-1 items-center justify-center">
        {/* <RadioOptionsUtils
          id="diseño"
          name="diseño"
          value={diseño}
          options={btsPerzonalizedBG}
          checked={diseño}
          onChange={handleSelection}
          className="py-2 flex flex-col items-center justify-center gap-2"
          labelStyles="flex w-full items-center justify-between gap-2 border-none p-1 rounded-md text-violet-100 cursor-pointer bg-purple-800 max-md:text-xs"
          spanStyles={(option, isSelected) =>
            isSelected
              ? "ring-4 bg-purple-950"
              : "bg-violet-300 outline-violet-500 outline"
          }
        /> */}
        <div
          className={`pt-4 relative object-cover bg-center bg-no-repeat ${backgroundImage ? "px-10 bg-transparent" : "px-2 bg-purple-500 pb-4"
            }`}
          id="print"
        >
          {backgroundImage && (
            <Image
              src={backgroundImage}
              alt="Background"
              className="absolute top-0 left-0 w-96 h-auto object-cover"
              width={196}
              height={196}
            />
          )}
          <div className="relative z-0 flex flex-col items-center">
            <Photo

              handleFileChange={handleFileChange}
              preview={preview1}
              backgroundImage={backgroundImage}
            />
            <Photo2
              handleFileChange={handleFileChange}
              preview={preview2}
              backgroundImage={backgroundImage}
            />
            <Photo3
              handleFileChange={handleFileChange}
              preview={preview3}
              backgroundImage={backgroundImage}
            />
            <Logo backgroundImage={backgroundImage} />
          </div>
        </div>
        <PhotoButton />

        <Modal open={openModal}>
          <ImageCropModalContent
            handleDone={handleDone}
            handleClose={() => setOpenModal(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Photobooth;
