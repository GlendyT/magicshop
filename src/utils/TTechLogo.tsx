import React from "react";
import Switcher from "./Switcher";
import Link from "next/link";
import { indie } from "./Fonts";

const TTechLogo = () => {
  return (
    <div className="flex gap-2 w-full h-full relative ">
      <div className="w-16 h-16 flex flex-col justify-center items-center fixed bottom-0 max-sm:bottom-6 cursor-pointer bg-black/40 rounded-tl-2xl z-50">
        <Switcher />
        <Link
          href="https://ttechdesigners.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={`text-[0.4rem] text-center w-16 font-extrabold ${indie.className} dark:text-purple-100 text-purple-200 transition-colors duration-300 `}
        >
          Programmed by TTechDesigners
        </Link>
      </div>
    </div>
  );
};

export default TTechLogo;
