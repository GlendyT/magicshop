"use client";

import { LinkRoutes } from "@/utils/Data/ListRoutes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center transition-all duration-500 bg-[#1a012d] ">
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
