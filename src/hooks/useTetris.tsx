"use client";

import TetrisContext from "@/context/TetrisProvider";
import { useContext } from "react";

const useTetris = () => {
  return useContext(TetrisContext);
};

export default useTetris;
