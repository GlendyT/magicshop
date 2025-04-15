"use client";
import usePhotobooth from "@/hooks/usePhotobooth";
import Photo from "./Photo";
import useImageCrop from "@/hooks/useImageCrop";
import { ChangeEvent } from "react";
import Photo2 from "./Photo2";
import Photo3 from "./Photo3";
import BTSPersonalized from "./BTSPersonalized";
import Image from "next/image";
import PhotoButton from "./PhotoButton";
import Modal from "./base/Modal";
import ImageCropModalContent from "./ImageCropModalContent";
import Loader from "./Loader";
import Logo from "./Logo";

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
  imageSaved: boolean;
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
    imageSaved,
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
      <div className="flex flex-row gap-4 max-md:gap-1 items-center justify-center">
        <BTSPersonalized />
        <div
          className={`pt-10 relative object-cover pb-4 bg-center bg-no-repeat ${
            backgroundImage ? "px-10 bg-transparent" : "px-2 bg-purple-500"
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

        <Modal open={openModal} >
          <ImageCropModalContent
            handleDone={handleDone}
            handleClose={() => setOpenModal(false)}
          />
        </Modal>
      </div>

      {imageSaved && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Photobooth;
