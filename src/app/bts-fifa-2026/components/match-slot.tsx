import React from "react";
import { Match } from "../types";

const MatchSlot = ({
  match,
  onClick,
}: {
  match: Match | null;
  onClick: () => void;
}) => {
  // Estilo compartido para que todo sea consistente
  const baseClasses =
    "relative p-1.5 sm:p-2 rounded-lg border border-white/5 bg-white/5 overflow-hidden flex justify-between items-center z-10 text-[11px] sm:text-sm w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40";
  const emptyClasses =
    "sm:p-2 p-1.5 rounded-lg border border-white/5 bg-white/5 text-white/20 flex justify-center items-center text-[10px] sm:text-xs w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40";

  // RETORNO 1: Si no hay match (Pendiente)
  if (!match) {
    return (
      <div
        onClick={onClick}
        className="match flex flex-col gap-1.5 cursor-pointer shrink-0"
      >
        <div className={emptyClasses}>Pending...</div>
        <div className={emptyClasses}>Pending...</div>
      </div>
    );
  }

  //console.log(match.team_a_start_streams);

  // Lógica de cálculo (solo se ejecuta si hay match)
  const totalMeta =
    (match.target_streams_v2 || []).reduce(
      (sum: number, val: number) => sum + (Number(val) || 0),
      0,
    ) || 1;

  const getPercent = (
    streams: number,
    team: string, // streams lo pusimos number porque es un tipo de dato especido dentro del paritdo
  ) =>
    match.status === "completed" && match.winner === team
      ? 100
      : Math.min((Number(streams || 0) / totalMeta) * 100, 100) || 0;

  // console.log(
  //   "Tratando de hacer opercion de porcentaje:",
  //   match.team_a_start_streams,
  // );

  const percentA = getPercent(match.team_a_streams, match.team_a);
  //console.log("Porcentaje de a", percentA);
  const percentB = getPercent(match.team_b_streams, match.team_b);

  // RETORNO 2: Si hay match (Activo)
  return (
    <div
      onClick={onClick}
      className="match flex flex-col gap-1.5 cursor-pointer shrink-0 "
    >
      {/* Team A */}
      <div
        className={`${baseClasses} ${match.winner === match.team_a ? "bg-emerald-500/20 border-emerald-500/50" : ""}`}
      >
        <div
          className={`absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600/40 to-blue-500/40 -z-10 transition-all duration-300
            ${percentA >= 100 ? "bg-purple-700" : percentA >= 50 ? "bg-amber-500" : "bg-white"}
           `}
          style={{ width: `${match.team_a_start_streams}%` }}
        />
        <span className="font-semibold text-white truncate flex-1 mr-1 sm:mr-2 text-[10px] sm:text-xs">
          {match.team_a}
        </span>
        <span className="text-[10px] sm:text-xs text-purple-200">
          {match.team_a_start_streams}%
        </span>
      </div>
      {/* Team B */}
      <div
        className={`${baseClasses} ${match.winner === match.team_b ? "bg-emerald-500/20 border-emerald-500/50" : ""}`}
      >
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-600/40 to-orange-500/40 -z-10 transition-all duration-300"
          style={{ width: `${percentB}%` }}
        />
        <span className="font-semibold text-white text-left truncate flex-1 text-xs sm:text-sm">
          {match.team_b}
        </span>
        <span className="text-xs text-pink-200">{Math.floor(percentB)}%</span>
      </div>
    </div>
  );
};
export default MatchSlot;
