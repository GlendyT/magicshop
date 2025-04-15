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
      cropSize={{ width: 185, height: 185 }}
      onRotationChange={setRotation}
      style={{
        containerStyle: {
          height: 220,
          width: 220,
          top: 8,
          bottom: 8,
          left: 8,
          right: 8,
          position: "relative",
        },
      }}
    />
  );
};

export default Cutter;
