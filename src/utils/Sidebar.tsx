"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Switcher from "./Switcher";
import Image from "next/image";
import { LinkRoutes } from "./Data/ListRoutes";
import { indie } from "./Fonts";
import { ButtonUtils } from "./ButtonUtils";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex">
      <div
        ref={sidebarRef}
        className={`fixed flex flex-col justify-between top-0 left-0 h-full p-4 transition-all duration-500 z-50 ${
          open
            ? "bg-[#1a012d] dark:bg-purple-400 text-purple-200 dark:text-[#1a012d]"
            : "max-sm:bg-transparent max-sm:dark:bg-transparent bg-[#1a012d] dark:bg-purple-400 text-purple-200 dark:text-[#1a012d]"
        } ${open ? "opacity-100" : "opacity-80"} ${open ? "w-44" : "w-20"}`}
      >
        <ButtonUtils
          label={open ? "×" : "☰"}
          onClick={() => setOpen(!open)}
          className="focus:outline-none text-xl z-50 px-2 py-2 max-sm:dark:bg-purple-400 dark:text-[#1a012d] dark:bg-purple-400 text-purple-200 rounded-full hover:scale-110"
        />

        <div className=" space-y-6 font-extrabold ">
          <Link
            href="/"
            className={`flex flex-col items-center gap-2 w-36 max-sm:flex-row  text-xs transition-all duration-500 ${
              open ? "opacity-100" : "hidden"
            }`}
          >
            <Image
              src={"/Polaroid/Only-graphic-darkpurple.webp"}
              alt="logo"
              width={50}
              height={30}
              className="max-sm:w-6 max-sm:h-8 h-auto"
              priority
            />
            The Magic Shop
          </Link>

          <div className="flex flex-col w-auto  gap-2">
            {LinkRoutes.map((linkroute) => (
              <Link
                key={linkroute.id}
                href={linkroute.path}
                className={`flex flex-row items-center gap-2 p-2 rounded-lg text-sm max-sm:text-xs transition-all duration-500 ${
                  open ? "opacity-100 " : "max-sm:hidden"
                } `}
              >
                <Image
                  src={linkroute.image}
                  alt={linkroute.name}
                  className={`
                    object-contain
                    h-5 w-auto
                    max-sm:h-3 max-sm:w-auto
                    
                  `}
                  width={20}
                  height={20}
                  priority
                />
                {open && <span>{linkroute.name}</span>}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <Switcher />
          <Link
            href="https://ttechdesigners.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[0.6rem] text-center w-20 font-extrabold ${indie.className}`}
          >
            Programmed by TTechDesigners
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
