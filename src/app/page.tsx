"use client";

import { commonClasses, LinkRoutes } from "@/utils/Data/ListRoutes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center transition-all duration-500 bg-[#1a012d] text-purple-100 dark:bg-purple-200">
      <div className="flex flex-wrap items-center justify-center gap-2 py-4 px-1 ">
        {LinkRoutes.map((linkrout) => (
          <Link
            key={linkrout.id}
            href={linkrout.path}
            className=" drop-shadow-[0_10px_10px_#6e40bd]"
          >
            <Image
              src={linkrout.image}
              alt={linkrout.name}
              className={`${commonClasses} `}
              width={300}
              height={300}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
