"use client";
import { ChangeEvent, createContext, useEffect, useState } from "react";
import useImageCrop from "@/hooks/useImageCrop";
import { readFile } from "app/photobooth/cropImage";
import { btsPerzonalizedBG } from "app/photobooth/btsPersonalizedBG";
import { PhotoboothContextType, PhotoboothProviderProps } from "../types";
import useRequestInfo from "@/hooks/useRequestInfo";
import { useRouter } from "next/navigation";

const PhotoboothContext = createContext<PhotoboothContextType>(null!);

const PhotoBoothProvider = ({ children }: PhotoboothProviderProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const [preview3, setPreview3] = useState<string | null>(null);
  const [changeColor, setChangeColor] = useState<boolean>(false);
  const [imageSaved, setImageSaved] = useState<boolean>(false);
  const [photo2Complete, setPhoto2Complete] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const { setImage } = useImageCrop();
  const { setUsuario, usuario } = useRequestInfo();
  const router = useRouter();

  useEffect(() => {
    if (imageSaved) {
      const timer = setTimeout(() => {
        setImageSaved(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [imageSaved]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      const imageDataUrl = await readFile(file);

      // Ensure imageDataUrl is a string before setting the image
      if (typeof imageDataUrl === "string") {
        setImage(imageDataUrl);
        setOpenModal(true);
      } else {
        console.error("Failed to read file as a data URL.");
      }
    }
  };

  // Usage
  const handleFileChangePhoto1 = handleFileChange;
  const handleFileChangePhoto2 = handleFileChange;
  const handleFileChangePhoto3 = handleFileChange;

  const handleSelection = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUsuario({
      ...usuario,
      [name]: value,
    });

    const selectedMember = btsPerzonalizedBG.find(
      (member) => member.name === value
    );

    if (selectedMember) {
      setBackgroundImage(selectedMember.image);

      const imageName =
        selectedMember.image?.split("/").pop()?.split(".")[0] || "";
      router.replace(`?style=${imageName}`);
    }
  };

  const resetPhotos = () => {
    setPreview1(null);
    setPreview2(null);
    setPreview3(null);
    setImageSaved(false);
    setBackgroundImage(null);
    setUsuario({ name: "", content: "", diseño: "", album: "", song: "" });
    router.replace("/photobooth");
  };

  useEffect(() => {
    if (preview3) {
      setPhoto2Complete(true);
    } else {
      setPhoto2Complete(false);
    }
  }, [preview3]);

  return (
    <PhotoboothContext.Provider
      value={{
        openModal,
        changeColor,
        photo2Complete,
        setPreview1,
        setPreview2,
        setPreview3,
        preview1,
        preview2,
        preview3,
        setOpenModal,
        setChangeColor,
        imageSaved,
        setImageSaved,
        setPhoto2Complete,
        handleFileChange,
        handleFileChangePhoto1,
        handleFileChangePhoto2,
        handleFileChangePhoto3,
        resetPhotos,
        backgroundImage,
        setBackgroundImage,
        handleSelection,
      }}
    >
      {children}
    </PhotoboothContext.Provider>
  );
};

export { PhotoBoothProvider };

export default PhotoboothContext;
