"use client";

import { LinkRoutes } from "@/utils/Data/ListRoutes";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useGSAP(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  });

  const slidesCount = isMobile
    ? LinkRoutes.length
    : Math.ceil(LinkRoutes.length / 2);
  const itemsPerSlide = isMobile ? 1 : 2;

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".door-left", {
      duration: 1.5,
      rotateY: -90,
      ease: "power2.inOut",
      delay: 0.5,
    }).to(
      ".door-right",
      {
        duration: 1.5,
        rotateY: 90,
        ease: "power2.inOut",
      },
      "-=1.5"
    );
  });

  const intervalRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    intervalRef.current = gsap.to(
      {},
      {
        duration: 3,
        repeat: -1,
        onRepeat: () => {
          setCurrentSlide((prev) => (prev + 1) % slidesCount);
        },
      }
    );

    return () => {
      intervalRef.current?.kill();
    };
  });

  const commonClass =
    "absolute top-0 w-1/2 h-full  z-50 backdrop-blur-md bg-black/70   bg-contain bg-center bg-no-repeat door overflow-hidden ";

  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center transition-all duration-500 backdrop-blur-2xl bg-[#923dd2]/60 p-4">
      {/* <div className={` door-left  left-0  ${commonClass}`}></div>
      <div className={` door-right  right-0 ${commonClass} `}></div> */}
      <div>
        <Image
          src={"/BTSLogoDoors/MAGICSHOP.svg"}
          alt="Magic Shop Logo"
          width={200}
          height={100}
          className="h-24 w-auto mb-1"
        />{" "}
        <span className="text-purple-900 text-xs flex font-extrabold items-center justify-center flex-col">
          <Link
            className="   "
            href="https://x.com/beyond_ARMY_"
            target="_blank"
            rel="noopener noreferrer"
          >
            by @Beyond_ARMY_
          </Link>

          <span className="text-purple-900 text-[0.7rem] ">
            <Link
              href="https://ttechdesigners.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[0.7rem] text-center w-16 font-extrabold  dark:text-purple-100  transition-colors duration-300 `}
            >
              developed by TTechDesigners
            </Link>
          </span>
        </span>
      </div>

      <div className="w-full ">
        <div className="relative h-[250px] overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: slidesCount }, (_, slideIndex) => (
              <div
                key={slideIndex}
                className="flex-shrink-0 w-full h-full flex justify-center items-center gap-8"
              >
                {LinkRoutes.slice(
                  slideIndex * itemsPerSlide,
                  slideIndex * itemsPerSlide + itemsPerSlide
                ).map((linkrout, index) => (
                  <Link
                    key={linkrout.id}
                    href={linkrout.path}
                    className=" flex justify-center items-center  backdrop-blur-3xl bg-purple-900/10 rounded-4xl "
                  >
                    <div className="relative w-[300px] h-[250px]">
                      <Image
                        src={linkrout.image}
                        alt={linkrout.name}
                        fill
                        className="object-contain"
                        priority={slideIndex === 0}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Indicadores */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex ">
            {Array.from({ length: slidesCount }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-8 h-1 transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 px-8 max-sm:px-8 ">
        {LinkRoutes.map((linkrout) => (
          <Link
            key={linkrout.id}
            href={linkrout.path}
            className="flex justify-center items-center transition-transform hover:scale-105 backdrop-blur-3xl bg-purple-900/10 rounded-xl p-1"
          >
            <div className="relative w-20 h-20">
              <Image
                src={linkrout.image}
                alt={linkrout.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/*drop-shadow-[0_20px_20px_#6e40bd]*/
