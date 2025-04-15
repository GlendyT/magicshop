"use client";

import RequestInfoContext from "@/context/RequestInfoProvider";
import { useContext } from "react";

const useRequestInfo = () => {
  return useContext(RequestInfoContext);
};

export default useRequestInfo;
