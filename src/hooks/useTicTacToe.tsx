"use client"

import TicTacToeContext from "@/context/TicTacToeProvider"
import { useContext } from "react"

const useTicTacToe = () => {
    return useContext(TicTacToeContext)
}

export default useTicTacToe