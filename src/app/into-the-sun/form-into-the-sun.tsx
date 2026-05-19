import useDownload from "@/hooks/useDownload";
import { ButtonUtils } from "@/utils/ButtonUtils";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import usePhotobooth from "@/hooks/usePhotobooth";
import useImageCrop from "@/hooks/useImageCrop";
import Modal from "../photobooth/base/Modal";
import ImageCropModalContent from "../photobooth/ImageCropModalContent";
import IntoTheSunLyrics from "./intothesunlyrics";

const FormmularioIntoTheSun = () => {
  const { handleDownloadImage } = useDownload();
  const { openModal, setOpenModal, handleFileChange, preview1, setPreview1 } = usePhotobooth();
  const { getProcessedImage, resetStates } = useImageCrop();
  
  const [randomPhrase, setRandomPhrase] = useState<{lyricsPart: string, btsmember: string} | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Efecto de máquina de escribir
  useEffect(() => {
    if (!randomPhrase || !isTyping) return;

    let i = 0;
    const formattedMember = randomPhrase.btsmember === "ot7" 
      ? "BTS (OT7)" 
      : randomPhrase.btsmember.charAt(0).toUpperCase() + randomPhrase.btsmember.slice(1);
      
    const fullText = `"${randomPhrase.lyricsPart}"\n\n- ${formattedMember}`;
    
    const intervalId = setInterval(() => {
      setDisplayedText(fullText.substring(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(intervalId);
        setIsTyping(false);
      }
    }, 50); // Velocidad de escritura en milisegundos

    return () => clearInterval(intervalId);
  }, [randomPhrase, isTyping]);

  const handleGetPhrase = () => {
    const randomIndex = Math.floor(Math.random() * IntoTheSunLyrics.length);
    setRandomPhrase(IntoTheSunLyrics[randomIndex]);
    setDisplayedText("");
    setIsTyping(true);
  };

  const handleDone = async (): Promise<File | undefined> => {
    const avatar = await getProcessedImage();
    if (!avatar) return;
    
    setPreview1(window.URL.createObjectURL(avatar));
    
    resetStates();
    setOpenModal(false);
    return avatar;
  };

  return (
    <div
      id="final-content"
      className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-[60] px-10 "
      style={{ opacity: 0, pointerEvents: "none" }}
    >
      {/* Aquí puedes diseñar tu texto o formulario usando Tailwind */}
      <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 font-montserrat tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] flex flex-col items-center justify-center">
        INTO THE SUN
        <span>with BTS</span>
      </h1>

      <div className=" backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-[0_0_30px_rgba(138,43,226,0.3)] pointer-events-auto justify-items-center ">
        {/* Contenedor principal de la imagen para descargar */}
        <div id="print" className="relative rounded-xl overflow-hidden">
          <label
            htmlFor="avatarInput"
            className={`${preview1 ? "cursor-default" : "cursor-pointer"} block relative`}
          >
            {preview1 ? (
              <Image
                src={preview1}
                alt="Sunset"
                height={288}
                width={288}
                className="object-cover h-72 w-72 rounded-xl"
              />
            ) : (
              <div className="w-72 h-72 border-4 border-dashed border-purple-600 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
                <p className="text-gray-200">Click to add your sunset</p>
              </div>
            )}

            {/* Overlay para la frase animada */}
            {displayedText && (
              <div className="absolute inset-0 flex items-center justify-center p-6 bg-white/40 backdrop-blur-[2px] rounded-xl pointer-events-none transition-all duration-300">
                <p className="text-black italic font-extrabold text-center whitespace-pre-wrap text-lg md:text-xl drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
                  {displayedText}
                </p>
              </div>
            )}
          </label>
        </div>
        <input
          type="file"
          className="hidden"
          id="avatarInput"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex flex-row gap-2 pt-2 ">
        <ButtonUtils
          label="Get Your Phrase"
          onClick={handleGetPhrase}
          className={`bg-black text-white px-4 py-2 cursor-pointer   italic font-extrabold`}
          //disabled={isLoading}
        />
        <ButtonUtils
          label="Download"
          onClick={handleDownloadImage}
          className={`bg-black text-white px-4 py-2 cursor-pointer   italic font-extrabold`}
          //disabled={isLoading}
        />
      </div>

      <Modal open={openModal}>
        <ImageCropModalContent
          handleDone={handleDone}
          handleClose={() => setOpenModal(false)}
        />
      </Modal>
    </div>
  );
};

export default FormmularioIntoTheSun;
