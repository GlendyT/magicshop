"use client"
import { useContext}  from "react"
import SpotifyContext from '../context/SpotifyProvider';

const useSpotify = () => {
    return useContext(SpotifyContext)
}

export default useSpotify