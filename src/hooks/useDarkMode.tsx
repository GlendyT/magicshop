"use client";
import DarkModeContext from "@/context/DarkModeProvider";
import { useContext } from "react";

const useDarkMode = () => {
  return useContext(DarkModeContext);
};

export default useDarkMode;
