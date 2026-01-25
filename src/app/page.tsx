"use client";

import { LinkRoutes } from "@/utils/Data/ListRoutes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useRequestInfo from "@/hooks/useRequestInfo";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardContent } from "@/hooks/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/hooks/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  const { loading } = useRequestInfo();
  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  const commonClass =
    "absolute top-0 w-1/2 h-full  z-50 backdrop-blur-md bg-black/70   bg-contain bg-center bg-no-repeat door overflow-hidden ";

  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center transition-all duration-500 backdrop-blur-2xl bg-[#923dd2]/60 p-4">
      {loading && (
        <>
          <div className={` door-left  left-0  ${commonClass}`}></div>
          <div className={` door-right  right-0 ${commonClass} `}></div>
        </>
      )}
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
              href="https://github.com/GlendyT"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[0.7rem] text-center w-16 font-extrabold    transition-colors duration-300 `}
            >
              developed by GlendyT
            </Link>
          </span>
        </span>
      </div>

      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-[10rem] sm:max-w-xs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {LinkRoutes.map((linkroute, index) => (
            <CarouselItem key={index} className="basis-1/2 pl-2 lg:basis-1/2  ">
              <Card>
                <CardContent className="relative flex items-center justify-center ">
                  <Image
                    src={linkroute.image}
                    alt={linkroute.name}
                    width={100}
                    height={100}
                    className=" object-cover "
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

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
