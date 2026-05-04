"use client";
import { useState, useEffect } from "react";
import "./loader.css";
import Image from "next/image";
import FormularioArirang from "./formulario";
import useRequestInfo from "@/hooks/useRequestInfo";
import ResultadoArirang from "./ResultadoArirang";
import ArirangTags from "./components/ArirangTags";
import { getBTSAlbums } from "@/services/btsAlbums";
import { ButtonUtils } from "@/utils/ButtonUtils";
import usePhotobooth from "@/hooks/usePhotobooth";
import useImageCrop from "@/hooks/useImageCrop";
import ImageCropModalContent from "@/photobooth/ImageCropModalContent";
import Modal from "@/photobooth/base/Modal";
import useDownload from "@/hooks/useDownload";
import Photo from "./Photo";
import { myFont } from "@/utils/Fonts";
import Link from "next/link";

const arirang = [
  {
    image: "/arirang/a.png",
    title: "a",
  },
  {
    image: "/arirang/ri.png",
    title: "ri",
  },
  {
    image: "/arirang/rang.png",
    title: "rang",
  },
];

const LoaderArirang = () => {
  return (
    <div className={`arirang-loader`}>
      {arirang.map((item, index) => (
        <Image
          key={index}
          src={item.image}
          alt={item.title}
          className={`arirang-image object-contain`}
          width={100}
          height={100}
        />
      ))}
    </div>
  );
};

const Arirang = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { handleSubmit, handleResetContent, setAlbums, generateRandomSong } =
    useRequestInfo();
  const [activeTab, setActiveTab] = useState<"card" | "pfp">("card");
  const {
    preview1,
    handleFileChange,
    backgroundImage,
    openModal,
    setOpenModal,
    setPreview1,
    setImageSaved,
  } = usePhotobooth();
  const { getProcessedImage, resetStates } = useImageCrop();
  const { handleDownloadImage } = useDownload();

  const handleDone = async (): Promise<File | undefined> => {
    const avatar = await getProcessedImage();
    if (!avatar) return;
    const previews = [preview1];
    const index = previews.findIndex((preview) => !preview);

    if (index !== -1) {
      previews[index] = window.URL.createObjectURL(avatar);
      setPreview1(previews[0]);
    }
    resetStates();
    setOpenModal(false);
    return avatar;
  };

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const albums = await getBTSAlbums();
        const albumOptions = albums.map((album) => ({
          id: album.id,
          name: album.name,
        }));
        setAlbums(albumOptions);
      } catch (error) {
        console.error("Error loading albums:", error);
      }
    };
    loadAlbums();
  }, [setAlbums]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowLoader(true);

    try {
      await generateRandomSong();
      setTimeout(() => {
        handleSubmit(e);
        setShowLoader(false);
        setShowResult(true);
      }, 3000);
    } catch (error) {
      console.error("Error generating song:", error);
      setShowLoader(false);
    }
  };

  const handleReset = () => {
    setShowResult(false);
    handleResetContent();
  };

  const resetPhotoArirang = () => {
    setPreview1(null);
    setImageSaved(false);
    /// setBackgroundImage(null);
  };

  return (
    <div className="h-screen  overflow-hidden relative ">
      <ArirangTags />

      <div
        className={`flex flex-col min-h-screen w-full items-center pt-2  z-10 relative bg-black/20 ${myFont.className}`}
      >
        <div>
          <iframe
            data-testid="modal-iframe"
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/prerelease/1DcxHW214MCDxXju71RbvX?utm_source=generator"
            width="300"
            height="100"
            frameBorder="0"
            allowFullScreen={false}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="eager"
          />
        </div>

        <div className="flex flex-row items-center mb-2">
          <ButtonUtils
            onClick={() => setActiveTab("card")}
            label="Card"
            className={`px-6 py-2 uppercase font-extrabold  transition-all duration-300 ${
              activeTab === "card"
                ? "bg-[#d60f2d] text-white shadow-lg scale-105"
                : "bg-white text-black/40 hover:bg-red-100"
            }`}
          />
          <ButtonUtils
            onClick={() => setActiveTab("pfp")}
            label="Pfp"
            className={`px-6 py-2 uppercase font-extrabold  transition-all duration-300 ${
              activeTab === "pfp"
                ? "bg-[#d60f2d] text-white shadow-lg scale-105"
                : "bg-white text-black/40 hover:bg-red-100"
            }`}
          />
        </div>

        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt="Background"
            className="absolute top-0 left-0 w-96 h-auto object-cover"
            width={196}
            height={196}
          />
        )}

        {initialLoading ? (
          <LoaderArirang />
        ) : showLoader ? (
          <LoaderArirang />
        ) : activeTab === "card" && showResult ? (
          <ResultadoArirang onReset={handleReset} />
        ) : activeTab === "card" ? (
          <FormularioArirang onSubmit={handleFormSubmit} />
        ) : (
          <div>
            <Photo
              handleFileChange={handleFileChange}
              preview={preview1}
              backgroundImage={backgroundImage}
              activeTab={activeTab}
            />
            <div
              data-testid="PhotoButton"
              className="flex  flex-row items-center justify-center gap-2 max-md:justify-between max-sm:gap-4 bg-red-700"
            >
              <ButtonUtils
                label="Save"
                onClick={handleDownloadImage}
                //disabled={!preview1}
                className={`max-sm:mt-2 ${preview1 ? " bg-black hover:bg-gradient-to-r from-amber-600 from-5% via-red-700 via-40% to-red-900 to-85% text-white cursor-pointer" : "bg-black/20 text-gray-600 cursor-not-allowed"}  px-2 py-2 `}
              />

              <ButtonUtils
                label="Clean"
                onClick={resetPhotoArirang}
                className={`max-sm:mt-2 px-2 py-2  ${preview1 ? "bg-black hover:bg-gradient-to-r from-amber-600 from-5% via-red-700 via-40% to-red-900 to-85% text-white cursor-pointer" : "bg-black/20 text-gray-600 cursor-not-allowed"}`}
                disabled={!preview1}
              />
              <Link
                href={"https://www.remove.bg/upload"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs hover:underline hover:text-white "
              >
                Remove the bg <br /> for free here
              </Link>
            </div>
          </div>
        )}
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

export default Arirang;
