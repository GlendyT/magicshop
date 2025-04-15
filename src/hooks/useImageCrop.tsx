"use client";

import ImageCropContext from "@/context/ImageCropProvider";
import { useContext } from "react";

const useImageCrop = () => {
  return useContext(ImageCropContext);
};

export default useImageCrop;
