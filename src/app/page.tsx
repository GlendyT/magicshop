"use client";

import { LinkRoutes } from "@/utils/Data/ListRoutes";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";

export default function Home() {
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

  const commonClass =
    "absolute top-0 w-1/2 h-full  z-50 backdrop-blur-md bg-black/70   bg-contain bg-center bg-no-repeat door overflow-hidden ";

  return (
    <div className="min-h-screen flex justify-center transition-all duration-500 bg-[#1a012d] ">
      <div className={` door-left  left-0  ${commonClass}`}></div>
      <div className={` door-right  right-0 ${commonClass} `}></div>

      <div className="flex flex-wrap items-center justify-center gap-2 py-4 px-8 max-sm:px-8 ">
        {LinkRoutes.map((linkrout) => (
          <Link
            key={linkrout.id}
            href={linkrout.path}
            className="drop-shadow-[0_20px_20px_#6e40bd]"
          >
            <div className="relative w-[250px] h-[200px]">
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
