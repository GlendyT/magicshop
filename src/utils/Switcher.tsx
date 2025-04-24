"use client";
import useDarkMode from "@/hooks/useDarkMode";
import Image from "next/image";

export default function Switcher() {
  const { darkSide, toggleDarkMode } = useDarkMode();

  const handleToggle = () => {
    toggleDarkMode(!darkSide);
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center justify-center w-12 h-12 max-sm:w-10 max-sm:h-10 rounded-full text-purple-100 dark:bg-[#1a012d] bg-purple-200 transition-colors duration-300 shadow-md hover:scale-105"
    >
      <Image
        src={darkSide ? "/Iconos/btsicon.webp" : "/Iconos/btsicon2.webp"}
        alt={darkSide ? "Dark mode" : "Light mode"}
        width={24}
        height={24}
      />
    </button>
  );
}
