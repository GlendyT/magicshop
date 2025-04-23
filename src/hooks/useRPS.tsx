"use client";

import RPSContext from "@/context/RPSProvider";
import { useContext } from "react";

const useRPS = () => {
  return useContext(RPSContext);
};

export default useRPS;
