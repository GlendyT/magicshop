import React from "react";
import BracketMatch2 from "../components/bracket-match2";
import { Match } from "../types";

interface PlaysoffProps {
  isLoadingMatches: boolean;
  matches: Match[];
}

const Playoffs = ({ isLoadingMatches, matches }: PlaysoffProps) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-2xl font-bold text-white flex items-center justify-center sm:justify-start gap-3">
          Round of 16 (Octavos de Final)
          <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30 flex items-center gap-2 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Live Updates
          </span>
        </h2>
        <p className="text-neutral-400 mt-2 text-sm">
          Los primeros 16 álbumes se enfrentan cara a cara. El equipo que llegue
          primero a la meta de streams avanza a Cuartos de Final.
        </p>
      </div>

      {/* Grid for Bracket */}
      <div className="grid grid-cols-1 gap-6 justify-items-stretch place-items-center min-h-[200px] w-full overflow-x-auto">
        {isLoadingMatches ? (
          <div className="col-span-full flex flex-col items-center justify-center gap-4 text-purple-400">
            <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <p className="font-medium animate-pulse">
              Cargando partidos en vivo...
            </p>
          </div>
        ) : matches.length > 0 ? (
          <BracketMatch2 allMatches={matches} />
        ) : (
          <div className="col-span-full text-center text-neutral-500 font-medium p-8 bg-black/30 rounded-2xl border border-white/5 w-full max-w-2xl">
            Aún no hay partidos activos en la base de datos.
          </div>
        )}
      </div>

      {/**<BracketMatch2 allMatches={partidosProcesados}/> */}

      <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
        <p className="text-neutral-400 text-sm">
          * Las estadísticas se actualizan automáticamente según los datos de
          Last.fm de los usuarios inscritos. Asegúrate de streamear la{" "}
          <strong className="text-pink-400">Target Song</strong> para ayudar a
          tu equipo.
        </p>
      </div>
    </div>
  );
};

export default Playoffs;
