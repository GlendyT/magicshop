import useDownload from "@/hooks/useDownload";
import usePhotobooth from "@/hooks/usePhotobooth";
import { ButtonUtils } from "@/utils/ButtonUtils";

const PhotoButton = () => {
  const { resetPhotos, photo2Complete, backgroundImage } = usePhotobooth();
  const { handleDownloadImage } = useDownload();

  return (
    <div className="flex flex-row gap-2 max-md:gap-0 max-sm:justify-center">
      <ButtonUtils
        label="Save"
        onClick={handleDownloadImage}
        disabled={!photo2Complete}
        className="max-sm:mt-2 bg-black text-white px-2 py-2 hover:bg-gradient-to-r from-amber-600 from-5% via-red-700 via-40% to-indigo-900 to-85%"
        disableColors="disabled:bg-opacity-25 disabled:cursor-not-allowed disabled:hover:bg-none "
      />

      <ButtonUtils
        label="Restart"
        onClick={resetPhotos}
        disabled={!backgroundImage && !photo2Complete}
        className=" max-sm:mt-2 bg-black text-white px-2 py-2 hover:bg-gradient-to-r from-abmer-600 from-5% via-red-700 via-40% to-indigo-900 to-85%"
        disableColors="disabled:bg-opacity-25 disabled:cursor-not-allowed disabled:hover:bg-none"
      />
    </div>
  );
};

export default PhotoButton;
