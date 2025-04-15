import classNames from "classnames";
import useImageCrop from "@/hooks/useImageCrop";

type ZoomSliderProps = {
  className?: string;
};

const ZoomSlider = ({ className }: ZoomSliderProps) => {
  const {
    zoom,
    setZoom,
    handleZoomIn,
    handleZoomOut,
    max_zoom,
    min_zoom,
    zoom_step,
  } = useImageCrop();
  return (
    <div
      className={classNames(
        className,
        `flex items-center justify-center gap-2`
      )}
    >
      <button className="p-1" onClick={handleZoomOut}></button>
      <input
        type="range"
        name="volju"
        min={min_zoom}
        max={max_zoom}
        step={zoom_step}
        value={zoom}
        onChange={(e) => {
          setZoom(Number(e.target.value));
        }}
      />
      <button className="p-1" onClick={handleZoomIn}></button>
    </div>
  );
};

export default ZoomSlider;
