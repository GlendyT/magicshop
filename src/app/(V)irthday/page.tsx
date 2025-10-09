"use client";
import useFlip from "@/hooks/useFlip";
import React from "react";
import Resultado from "./Resultado";
import Formulario from "./Formulario";
import { virthday } from "@/utils/Fonts";
import { ButtonUtils } from "@/utils/ButtonUtils";

const Virthday = () => {
  const { items, timer, timeExpired, handleStartGame, win, handleRestart } =
    useFlip();
  return (
    <div className="min-h-screen bg-virthday bg-center bg-cover bg-no-repeat">
      <div
        className={`flex flex-col gap-2 items-center justify-center ${virthday.className}`}
      >
        <div className="text-2xl max-sm:text-base font-bold text-black flex flex-row justify-between items-center gap-2 pt-1 backdrop-blur-xl bg-white/50 rounded-2xl">
          Memory Game
          <ButtonUtils
            label={timeExpired ? "you lost - re-start" : "start"}
            onClick={timeExpired ? handleRestart : handleStartGame}
            className={`text-white rounded-lg text-lg disabled:bg-opacity-25 disabled:cursor-not-allowed py-2 uppercase max-sm:text-xs  px-2 ${
              timeExpired ? "bg-red-500" : "bg-black"
            }`}
            disabled={!timeExpired && timer !== 50}
          />
          <span
            className={`py-1 px-2 flex flex-col items-center text-xs text-white transition-colors rounded-lg ${
              timer === 50
                ? "bg-black"
                : timer > 30
                ? "bg-green-500"
                : timer > 10
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {timer === 50 ? "Time" : timer > 0 ? "Time left" : "Time´s up"}
            <span className="text-base">{timer !== null ? timer : "..."}</span>
          </span>
        </div>

        <div
          className={`grid grid-cols-4 items-center justify-center gap-1 p-2 border-black border-4 transition-colors duration-300 ${
            win ? "bg-green-500" : "bg-white"
          }`}
        >
          {items.map((item) => (
            <Resultado key={item.id2} item={item} />
          ))}
        </div>

        {win && (
          <div className="flex flex-col items-center gap-4">
            <Formulario />
          </div>
        )}

        {/* <div className="w-96 max-sm:px-4">
          <iframe
            title="Spotify Playlist"
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DX5Ku5zxR5pFB?utm_source=generator&theme=0"
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div> */}
      </div>
    </div>
  );
};

export default Virthday;
