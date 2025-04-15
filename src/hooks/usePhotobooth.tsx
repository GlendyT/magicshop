"use client";

import PhotoboothContext from "@/context/PhotoboothProvider";
import { useContext } from "react";

const usePhotobooth = () => {
  return useContext(PhotoboothContext);
};

export default usePhotobooth;
