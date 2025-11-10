"use client"

import BingoContext from "@/context/BingoProvider";
import { useContext } from "react";

const useBingo = () => {
    return useContext(BingoContext)
}

export default useBingo;