import Cutter from "./cropper/Cropper";
import ZoomSlider from "./cropper/Sliders";
import Button from "./base/Button";
import usePhotobooth from "@/hooks/usePhotobooth";

type ImageCropModalContentProps = {
  handleDone: () => Promise<File | undefined>;
  handleClose: () => void;
};

const ImageCropModalContent = ({
  handleDone,
  handleClose,
}: ImageCropModalContentProps) => {
  const { handleFileChange } = usePhotobooth();
  return (
    <div className="text-center relative pt-2">
      <h5 className="text-gray-800 mb-4">Edit your picture</h5>
      <div className="border border-dashed border-gray-300 p-6 rounded-lg">
        <div className="flex justify-center">
          <div className="crop-container mb-4">
            <Cutter />
          </div>
        </div>
        <ZoomSlider className="mb-4" />

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="avatarInput"
          accept="image/*"
        />

        <Button variant="light" className="shadow w-full mb-4 hover:shadow-lg">
          <label htmlFor="avatarInput"> Upload Another picture</label>
        </Button>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" className="w-full" onClick={handleDone}>
            Done & Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModalContent;
