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
    <>
      <div className="flex absolute " ref={sidebarRef}>
        <ButtonUtils
          label={open ? "×" : "☰"}
          onClick={() => setOpen(!open)}
          className={`max-sm:block hidden  items-center justify-center w-14 h-12 bg-black/20 fixed focus:outline-none text-xl px-2 py-2 max-sm:dark:bg-purple-400 dark:text-[#1a012d] dark:bg-purple-400 text-purple-200 rounded-full z-70 ${
            open ? "opacity-100" : "opacity-80"
          } `}
        />
        <div
          className={`fixed flex flex-col items-center justify-center top-0 left-0 h-full p-4 transition-all duration-500 z-50 max-sm:px-4 ${
            open
              ? "bg-[#1a012d] dark:bg-purple-400 text-purple-200 dark:text-[#1a012d]"
              : "max-sm:bg-transparent max-sm:dark:bg-transparent bg-[#1a012d] dark:bg-purple-400 text-purple-200 dark:text-[#1a012d]"
          }  ${open ? "w-28 " : "max-sm:w-0 w-20 "}`}
        >
          <div className=" space-y-6 font-extrabold ">
            <Link
              href="/"
              className={`flex flex-col items-center justify-center gap-2  text-xs transition-all duration-500 ${
                open ? "opacity-100" : "max-sm:hidden"
              }`}
            >
              <Image
                src={"/Polaroid/Only-graphic-darkpurple.webp"}
                alt="logo"
                width={25}
                height={5}
                className="max-sm:w-10 max-sm:h-12 h-8"
                priority
              />
              {/* The Magic Shop */}
            </Link>
            <div className="flex flex-col w-auto  gap-2">
              {LinkRoutes.map((linkroute) => (
                <Link
                  key={linkroute.id}
                  href={linkroute.path}
                  className={`flex flex-col items-center gap-2 rounded-lg text-xs max-sm:text-xs transition-all duration-500 ${
                    open ? "opacity-100 " : "max-sm:hidden"
                  } `}
                >
                  <Image
                    src={linkroute.image}
                    alt={linkroute.name}
                    className={`
                    object-contain
                    h-10 w-auto
                     max-sm:w-auto
                    
                  `}
                    width={50}
                    height={50}
                    priority
                  />
                  {/* {open && <span>{linkroute.name}</span>} */}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed top-0 right-12 z-50 p-4">
        <TTechLogo />
      </div>
    </>
  );
};

export default Sidebar;
