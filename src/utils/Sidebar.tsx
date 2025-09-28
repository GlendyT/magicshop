"use client";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import { LinkRoutes } from "./Data/ListRoutes";
import { ButtonUtils } from "./ButtonUtils";
import TTechLogo from "./TTechLogo";
import { LuAlignJustify, LuX } from "react-icons/lu";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
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
  });

  return (
    <>
      <div className="flex h-full absolute " ref={sidebarRef}>
        <ButtonUtils
          icon={open ? <LuX /> : <LuAlignJustify className="w-8 h-8" />}
          onClick={() => setOpen(!open)}
          className={`   items-center justify-center w-10 h-10  fixed  cursor-pointer text-xl px-2 py-2 font-extrabold text-black z-70 ${
            open ? "opacity-100" : "opacity-80"
          } `}
        />
        <div
          className={` flex flex-col items-center justify-center py-2  transition-all duration-500 z-50 max-sm:px-4 overflow-auto ${
            open
              ? " backdrop-blur-sm bg-[#923dd2]/20 text-purple-200 "
              : "max-sm:bg-transparent  backdrop-blur-3xl bg-[#1a012d]/10  text-purple-200 "
          }  ${open ? "w-28 " : "hidden "}`}
        >
          <div className=" flex flex-col gap-2  ">
            <Link
              href="/"
              className={`flex flex-col items-center justify-center gap-2  text-xs transition-all duration-500 ${
                open ? "opacity-100 " : "max-sm:hidden"
              }`}
            >
              <Image
                src={"/Polaroid/Only-graphic-darkpurple.webp"}
                alt="logo"
                width={25}
                height={5}
                className="max-sm:w-10 max-sm:h-12 h-8 mt-0 drop-shadow-[0_0px_10px_#000000]   "
                priority
              />
              {/* The Magic Shop */}
            </Link>
            <div className="flex flex-col w-auto  gap-2">
              {LinkRoutes.map((linkroute) => (
                <Link
                  key={linkroute.id}
                  href={linkroute.path}
                  className={`flex flex-col items-center gap-2 rounded-lg text-xs max-sm:text-xs transition-all duration-500  ${
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
                    backdrop-blur-md bg-purple-950/90 rounded-lg p-1
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

      <div className="fixed top-0 right-12 z-60 p-4">
        <TTechLogo />
      </div>
    </>
  );
};

export default Sidebar;
