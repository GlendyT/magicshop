"use client";
import { createContext, useCallback, useState } from "react";
import getCroppedImg from "app/photobooth/cropImage";
import { ImageCropContextType, ImageProviderProps, PixelCrop } from "../types";

const ImageCropContext = createContext<ImageCropContextType>(null!);

const defaultImage = null;
const defaultCrop = { x: 0, y: 0 };
const defaultRotation = 0;
const defaultZoom = 1;

const ImageCropProvider = ({
  children,
  max_zoom = 3,
  min_zoom = 1,
  zoom_step = 0.1,
  max_rotation = 360,
  min_rotation = 0,
  rotation_step = 5,
}: ImageProviderProps) => {
  const [image, setImage] = useState<string | null>(defaultImage);
  const [crop, setCrop] = useState<{ x: number; y: number }>(defaultCrop);
  const [rotation, setRotation] = useState<number>(defaultRotation);
  const [zoom, setZoom] = useState<number>(defaultZoom);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(
    null
  );

  const onCropComplete = useCallback((_: unknown, croppedPixels: PixelCrop) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleZoomIn = () => {
    if (zoom < max_zoom) {
      setZoom(zoom + zoom_step * 2);
    }
  };

  const handleZoomOut = () => {
    if (zoom > min_zoom) {
      setZoom(zoom - zoom_step * 2);
    }
  };

  const handleRotateCw = () => {
    setRotation(rotation + rotation_step);
  };

  const handleRotateAntiCw = () => {
    setRotation(rotation - rotation_step);
  };

  const getProcessedImage = async (): Promise<File | undefined> => {
    if (image && croppedAreaPixels) {
      const croppedImage = (await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      )) as { file: Blob };
      return new File([croppedImage.file], `img-${Date.now()}.png`, {
        type: "image/png",
      });
    }
  };

  const resetStates = () => {
    setImage(defaultImage);
    setCrop(defaultCrop);
    setRotation(defaultRotation);
    setZoom(defaultZoom);
    setCroppedAreaPixels(null);
  };

  return (
    <ImageCropContext.Provider
      value={{
        image,
        setImage,
        zoom,
        setZoom,
        rotation,
        setRotation,
        crop,
        setCrop,
        croppedAreaPixels,
        setCroppedAreaPixels,
        onCropComplete,
        getProcessedImage,
        handleZoomIn,
        handleZoomOut,
        handleRotateAntiCw,
        handleRotateCw,
        max_zoom,
        min_zoom,
        zoom_step,
        max_rotation,
        min_rotation,
        rotation_step,
        resetStates,
      }}
    >
      {children}
    </ImageCropContext.Provider>
  );
};

export { ImageCropProvider };
export default ImageCropContext;
