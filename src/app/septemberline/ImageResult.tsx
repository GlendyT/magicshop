import Image from "next/image";
import useRequestInfo from "@/hooks/useRequestInfo";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageResult = () => {
  const { usuario } = useRequestInfo();
  const { name, diseño } = usuario;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const renderImage = (src: string, alt: string) => (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        className="w-full h-full rounded-xl"
       
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-end justify-end">
        <div className="flex flex-col items-center justify-center px-4 text-center">
          <span className={`text-xs font-extrabold text-white  drop-shadow-md p-2 backdrop-blur-2xl `}>
           With Love - {name}
          </span>

        </div>
      </div>
    </div>
  );

  if (diseño === "Ambos") {
    return (
      <div className="shadow-md rounded-xl w-96 max-w-full relative">
        <div className="overflow-hidden rounded-xl" ref={emblaRef}>
          <div className="flex">
            <div className="flex-[0_0_100%] min-w-0 relative">
              {renderImage("/septemberline/Namjoon-Birthday.webp", "Namjoon Birthday")}
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              {renderImage("/septemberline/Jungkook-Birthday.webp", "Jungkook Birthday")}
            </div>
          </div>
        </div>
        
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    );
  }

  // Single selection
  const imageSrc = diseño === "Namjoon" 
    ? "/septemberline/Namjoon-Birthday.webp" 
    : "/septemberline/Jungkook-Birthday.webp";

  return (
    <div className={`shadow-md rounded-xl w-96 max-w-full relative `}>
      {renderImage(imageSrc, `${diseño} Birthday`)}
    </div>
  );
};

export default ImageResult;
