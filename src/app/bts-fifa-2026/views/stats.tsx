import { BarChart3, Users } from "lucide-react";
import React from "react";
import { AlbumStat } from "../types";

interface StatsProps {
  isLoadingStats: boolean;
  stats: AlbumStat[];
}

const Stats = ({ isLoadingStats, stats }: StatsProps) => {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
          <BarChart3 className="w-8 h-8 text-blue-400" />
          Global Teams Standings
        </h2>
        <p className="text-neutral-400 mt-2 text-sm">
          Ranking oficial basado en la cantidad de ARMYs reclutados por cada
          álbum.
        </p>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-neutral-300 text-xs uppercase tracking-widest border-b border-white/10">
              <th className="p-5 font-semibold text-center w-16">Rank</th>
              <th className="p-5 font-semibold">Album Era</th>
              <th className="p-5 font-semibold text-center">ARMYs Recruited</th>
              <th className="p-5 font-semibold text-center w-32">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {isLoadingStats ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-blue-400">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                    <p className="animate-pulse font-medium">
                      Cargando ranking global...
                    </p>
                  </div>
                </td>
              </tr>
            ) : stats.length > 0 ? (
              stats.map((team, index) => (
                <tr
                  key={team.$id || index}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="p-5 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                        index === 0
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                          : index === 1
                            ? "bg-neutral-300/20 text-neutral-300 border border-neutral-300/50"
                            : index === 2
                              ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                              : "text-neutral-500"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className="font-bold text-white group-hover:text-blue-300 transition-colors">
                      {team.album_name}
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="font-mono text-lg font-bold text-white">
                        {team.total_members?.toLocaleString() || 0}
                      </span>
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        team.status === "active"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : team.status === "eliminated"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-neutral-500/20 text-neutral-400"
                      }`}
                    >
                      {team.status || "Unknown"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="p-12 text-center text-neutral-500 font-medium"
                >
                  Aún no hay datos de equipos en el ranking.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stats;
