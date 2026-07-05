import React, { useState } from "react";
import { BracketMatchProps } from "../page";
import { Match } from "../types";
import MatchSlot from "./match-slot";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/hooks/components/ui/dialog";

const BracketMatch2 = ({ allMatches }: BracketMatchProps) => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const getWinnerOfMatch = (
    matchA: Match | null,
    matchB: Match | null,
  ): Match | null => {
    // Si alguno de los partidos de octavos no está terminado, no hay ganador para cuartos
    if (matchA?.status !== "completed" || matchB?.status !== "completed") {
      return null;
    }

    const winnerMatch = {
      team_a: matchA.winner,
      team_b: matchB.winner,
      status: "active",
      target_streams: matchA.target_streams_v2,
      team_a_start_streams: 0,
      team_b_start_stream: 0,

      target_songs: [],
      team_a_current_streams: 0,
      team_b_current_streams: 0,
      stage: "cuartos",
      $id: "temp-id",
      winner: "",
      target_streams_v2: [],
      team_a_streams: 0,
      team_b_streams: 0,
    } as Match;
    // Retornamos un objeto "partido" ficticio para los cuartos

    return winnerMatch;
  };

  const handleOpen = (match: Match) => {
    if (match) {
      setSelectedMatch(match);
      setModalOpen(true);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-[10px] p-4 w-full overflow-hidden lg:p-1.5">
      <div className="w-full overflow-x-auto scrollbar-hide flex justify-start lg:justify-center cursor-grab active:cursor-grabbing">
        {/*<div className="flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8"> */}

        <div className="flex flex-row items-center gap-2 sm:gap-4 shrink-0 min-w-max">
          {/* Octavos Izquierda */}
          <div className="flex flex-col gap-6 sm:gap-9">
            {Array.from({ length: 4 }).map((_, i) => (
              <MatchSlot
                key={`izq-${i}`}
                match={allMatches[i] || null}
                onClick={() => allMatches[i] && handleOpen(allMatches[i])}
              />
            ))}
          </div>

          {/* Cuartos Izquierda */}
          <div className="flex flex-col justify-around py-10 sm:py-20 gap-16 sm:gap-24">
            <MatchSlot
              match={getWinnerOfMatch(allMatches[0], allMatches[1])}
              onClick={() => {}}
            />

            <MatchSlot
              match={getWinnerOfMatch(allMatches[2], allMatches[3])}
              onClick={() => {}}
            />
          </div>

          {/**SEMIFINAL */}
          <div className="flex flex-col justify-center gap-4">
            <MatchSlot
              match={getWinnerOfMatch(
                getWinnerOfMatch(allMatches[0], allMatches[1]), // Ganador del Cuarto 1
                getWinnerOfMatch(allMatches[2], allMatches[3]), // Ganador del Cuarto 2
              )}
              onClick={() => {}}
            />
          </div>
        </div>

        {/* CENTRO (FINAL) */}
        <div className="flex flex-col items-center justify-center shrink-0 px-1 sm:px-2 md:px-4">
          <MatchSlot
            match={getWinnerOfMatch(
              // Semifinal Izquierda (la que construimos antes)
              getWinnerOfMatch(
                getWinnerOfMatch(allMatches[0], allMatches[1]),
                getWinnerOfMatch(allMatches[2], allMatches[3]),
              ),
              // Semifinal Derecha (la que construimos antes)
              getWinnerOfMatch(
                getWinnerOfMatch(allMatches[4], allMatches[5]),
                getWinnerOfMatch(allMatches[6], allMatches[7]),
              ),
            )}
            onClick={() => {}}
          />
          <div
            className="text-xs sm:text-sm font-bold mt-2 sm:mt-4 bg-gradient-to-r from-purple-500
           to-pink-500 bg-clip-text text-transparent"
          >
            Final
          </div>
        </div>

        {/* LADO DERECHO */}
        <div className="flex flex-row-reverse items-center gap-2 sm:gap-4 shrink-0">
          {/* Octavos Derecha */}
          <div className="flex flex-col gap-6 sm:gap-9">
            {Array.from({ length: 4 }).map((_, i) => (
              <MatchSlot
                key={`der-${i}`}
                match={allMatches[i + 4] || null} // Asignamos índices restantes
                onClick={() =>
                  allMatches[i + 4] && handleOpen(allMatches[i + 4])
                }
              />
            ))}
          </div>

          {/* Cuartos Derecha */}
          <div className="flex flex-col justify-around py-10 sm:py-20 gap-16 sm:gap-24">
            <MatchSlot
              match={getWinnerOfMatch(allMatches[4], allMatches[5])}
              onClick={() => {}}
            />

            {/* Segundo slot de Cuartos Derecha: depende de Octavos 6 y 7 */}
            <MatchSlot
              match={getWinnerOfMatch(allMatches[6], allMatches[7])}
              onClick={() => {}}
            />
          </div>

          {/**SEMIFINAL */}
          <div className="flex flex-col justify-center gap-4">
            <MatchSlot
              match={getWinnerOfMatch(
                getWinnerOfMatch(allMatches[4], allMatches[5]), // Ganador del Cuarto 3
                getWinnerOfMatch(allMatches[6], allMatches[7]), // Ganador del Cuarto 4
              )}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-white/40">
          <DialogHeader>
            <DialogTitle className="text-center p-0.5">🥊</DialogTitle>
            <DialogDescription asChild>
              <div className="">
                {selectedMatch ? (
                  <>
                    <div className="flex flex-col text-center text-xl">
                      <span className="font-bold">
                        {" "}
                        <span className="text-purple-700 text-sm">
                          Team A:{" "}
                        </span>
                        {selectedMatch.team_a}
                      </span>
                      <span className="bg-orange-300/55 text-center text-sm font-semibold">
                        {" "}
                        VS{" "}
                      </span>
                      <span className="font-bold">
                        <span className="text-purple-700 text-sm">
                          Team B:{" "}
                        </span>
                        {selectedMatch.team_b}
                      </span>
                    </div>

                    <div className="bg-white/15 p-2">
                      {selectedMatch.target_songs.map((songs, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center w-full font-semibold"
                        >
                          <span className="truncate">
                            <strong>Target: </strong>
                            {songs}
                          </span>

                          <div className="flex justify-between w-24 shrink-0">
                            <span className="">
                              <strong>Goal: </strong>
                              {selectedMatch.target_streams_v2[index]}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <span>No hay canciones aun....</span>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* </div> */}
    </div>
  );
};

export default BracketMatch2;
