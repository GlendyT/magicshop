"use client";
import { DownloadContext } from "@/context/DownloadProvider";
import { useContext } from "react";

const useDownload = () => {
  return useContext(DownloadContext);
};

export default useDownload;