"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { LinkRoutes } from "./Data/ListRoutes";
import { ButtonUtils } from "./ButtonUtils";
import TTechLogo from "./TTechLogo";

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
    <div className="flex absolute " ref={sidebarRef}>
      <ButtonUtils
        label={open ? "×" : "☰"}
        onClick={() => setOpen(!open)}
        className={` flex items-center justify-center w-14 h-12 fixed focus:outline-none text-xl px-2 py-2 max-sm:dark:bg-purple-400 dark:text-[#1a012d] dark:bg-purple-400 text-purple-200 rounded-full z-50 ${
          open ? "opacity-100" : "opacity-80"
        } `}
      />
      <div
        className={`fixed flex flex-col items-center justify-center top-0 left-0 h-full p-4 transition-all duration-500 z-30 max-sm:px-4 ${
          open
            ? "bg-[#1a012d] dark:bg-purple-400 text-purple-200 dark:text-[#1a012d]"
            : "max-sm:bg-transparent max-sm:dark:bg-transparent bg-[#1a012d] dark:bg-purple-400 text-purple-200 dark:text-[#1a012d]"
        }  ${open ? "w-44 " : "w-20  "}`}
      >
        <div className=" space-y-6 font-extrabold ">
          <Link
            href="/"
            className={`flex flex-col items-center justify-center gap-2 w-36 max-sm:flex-row  text-xs transition-all duration-500 ${
              open ? "opacity-100" : "hidden"
            }`}
          >
            <Image
              src={"/Polaroid/Only-graphic-darkpurple.webp"}
              alt="logo"
              width={20}
              height={5}
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
                className={`flex flex-row items-center gap-2 p-2 rounded-lg text-xs max-sm:text-xs transition-all duration-500 ${
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
      </div>
      <TTechLogo />
    </div>
  );
};

export default Sidebar;
