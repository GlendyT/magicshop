"use client";
import FishContext from "@/context/FishProvider";
import { useContext } from "react";

const useFish = () => {
  return useContext(FishContext);
};
export default useFish;
