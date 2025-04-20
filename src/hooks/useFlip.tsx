"use client"
import { useContext } from "react";
import FlipContext from "@/context/FlipProvider";

const useFlip = () => {
  return useContext(FlipContext);
};

export default useFlip;
