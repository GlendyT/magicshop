"use client";
import useImageCrop from "@/hooks/useImageCrop";
import Cropper from "react-easy-crop";

const Cutter = () => {
  const {
    image,
    zoom,
    setZoom,
    rotation,
    crop,
    setCrop,
    onCropComplete,
    setRotation,
  } = useImageCrop();

  if (!image) return null;
  return (
    <Cropper
      image={image}
      crop={crop}
      zoom={zoom}
      rotation={rotation}
      aspect={1}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
      showGrid={false}
      onRotationChange={setRotation}
    />
  );
};

export default Cutter;
