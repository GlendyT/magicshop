"use client";

import React, { useState, useEffect } from "react"; // importamos useCallback para el team stats
import {
  Music,
  ArrowRight,
  Disc,
  Trophy,
  Users,
  PlayCircle,
  BarChart3,
} from "lucide-react";
import { createBTSFifaUser, getBTSMatches, getBTSStats } from "@/lib/appwrite";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/hooks/components/ui/dialog";

const albums = [
  "2 Cool 4 Skool",
  "O!RUL8,2?",
  "Skool Luv Affair",
  "Dark & Wild",
  "The Most Beautiful Moment in Life, Pt. 1",
  "The Most Beautiful Moment in Life, Pt. 2",
  "The Most Beautiful Moment in Life: Young Forever",
  "Wings",
  "You Never Walk Alone",
  "Love Yourself: Tear",
  "Love Yourself: Answer",
  "Map of the Soul: Persona",
  "Map of the Soul: 7",
  "BE",
  "Proof",
  "Arirang",
];

{
  /** COMPONENT TO CHANGE ---START--- */
}
const BracketMatch = ({ match }: { match: any }) => {
  const percentA =
    match.status === "completed" && match.winner === match.team_a
      ? 100
      : Math.min((match.team_a_streams / match.target_streams) * 100, 100) || 0;
  const percentB =
    match.status === "completed" && match.winner === match.team_b
      ? 100
      : Math.min((match.team_b_streams / match.target_streams) * 100, 100) || 0;

  return (
    <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-4 w-72 shadow-xl hover:border-purple-500/50 transition-colors duration-300 group">
      <div className="flex justify-between items-center mb-3">
        <div className="text-[10px] text-purple-300 font-bold uppercase tracking-widest px-2 py-1 bg-purple-500/20 rounded-full">
          {match.stage}
        </div>
        {match.status === "active" && (
          <div className="flex items-center gap-1 text-[10px] text-red-400 font-bold animate-pulse">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> LIVE
          </div>
        )}
      </div>

      {/*Target Song Info */}
      <div className="flex items-center gap-2 mb-4 text-neutral-300 text-xs">
        <PlayCircle className="w-3 h-3 text-pink-400" />
        <span className="truncate">Target: {match.song}</span>
      </div>

      {/*Team A*/}
      <div
        className={`relative p-2.5 rounded-lg mb-2 overflow-hidden ${match.winner === match.team_a ? "bg-emerald-500/20 border border-emerald-500/50" : "bg-white/5 border border-white/5"}`}
      >
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600/40 to-blue-500/40 -z-10 transition-all duration-1000"
          style={{ width: `${percentA}%` }}
        ></div>
        <div className="flex justify-between items-center z-10 text-sm">
          <span className="font-semibold text-white truncate max-w-[140px] drop-shadow-md">
            {match.team_a}
          </span>
          <span className="text-xs font-medium text-purple-200">
            {Math.floor(percentA)}%
          </span>
        </div>
      </div>

      {/*Team B*/}
      <div
        className={`relative p-2.5 rounded-lg overflow-hidden ${match.winner === match.team_b ? "bg-emerald-500/20 border border-emerald-500/50" : "bg-white/5 border border-white/5"}`}
      >
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-600/40 to-orange-500/40 -z-10 transition-all duration-1000"
          style={{ width: `${percentB}%` }}
        ></div>
        <div className="flex justify-between items-center z-10 text-sm">
          <span className="font-semibold text-white truncate max-w-[140px] drop-shadow-md">
            {match.team_b}
          </span>
          <span className="text-xs font-medium text-pink-200">
            {Math.floor(percentB)}%N
          </span>
        </div>
      </div>

      <div className="mt-3 flex justify-between text-[10px] text-neutral-500 font-medium">
        <span>Goal: {match.target_streams.toLocaleString()} streams</span>
      </div>
    </div>
  );
};

{
  /**COMPONENT TO CHANGE ---ENDS--- */
}

/*
const MatchSlot = ({
  match,
  onClick,
}: {
  match?: any;
  onClick: () => void;
}) => {
  if (!match) {
    return (
      <div
        onClick={onClick}
        className="match flex flex-col gap-1.5 w-36 md:w-40"
      >
        <div className="team bg-gray-100 border border-dashed border-gray-300 p-2 rounded-lg text-black">
          ?
        </div>
        <div className="team bg-gray-100 border border-dashed border-gray-300 p-2 rounded-lg text-gray-400">
          ?
        </div>
      </div>
    );
  }

  const percentA =
    match.status === "completed" && match.winner === match.team_a
      ? 100
      : Math.min((match.team_a_streams / match.target_streams) * 100, 100) || 0;
  const percentB =
    match.status === "completed" && match.winner === match.team_b
      ? 100
      : Math.min((match.team_b_streams / match.target_streams) * 100, 100) || 0;

  console.log(match);

  return (
    <div
      onClick={onClick}
      className="match flex flex-col gap-1.5 w-36 text-xs md:w-40 "
    >
      <div>
        <div className="flex justify-between team bg-bracket border border-bracket-border p-2 rounded-lg font-bold">
          {match.team_a}{" "}
          <span className="whitespace-nowrap">{Math.round(percentA)}%</span>
          <button
            onClick={onClick}
            className="hover:opacity-60 transition-opacity"
          >
            👁️
          </button>
        </div>

        <div className="w-full bg-black/20 h-1.5 rounded-full">
          <div
            className="bg-white h-full rounded-full transition-all duration-500"
            style={{ width: `${percentA}%` }}
          ></div>
        </div>
      </div>

      <div>
        <div className=" flex justify-between team bg-bracket border border-bracket-border p-2 rounded-lg opacity-70">
          <span className="truncate mr-2"> {match.team_b} </span>
          <span className="whitespace-nowrap">{Math.round(percentB)}%</span>
        </div>

        <div className="w-full bg-black/20 h-1.5 rounded-full">
          <div
            className="bg-white h-full rounded-full transition-all duration-500"
            style={{ width: `${percentB}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
*/

const MatchSlot = ({
  match,
  onClick,
}: {
  match?: any;
  onClick: () => void;
}) => {
  if (!match) {
    return (
      <div
        onClick={onClick}
        className="match flex flex-col gap-1.5 w-36 md:w-40"
      >
        <div className="team bg-gray-100 border border-dashed border-gray-300 p-2 rounded-lg text-black">
          ?
        </div>
        <div className="team bg-gray-100 border border-dashed border-gray-300 p-2 rounded-lg text-gray-400">
          ?
        </div>
      </div>
    );
  }

  const totalMeta =
    (match.target_streams || []).reduce(
      (sum: number, val: number) => sum + (Number(val) || 0),
      0,
    ) || 1; // El || 1 evita la división por cero si la meta es 0 o está vacía

  const percentA =
    match.status === "completed" && match.winner === match.team_a
      ? 100
      : Math.min((Number(match.team_a_streams || 0) / totalMeta) * 100, 100) ||
        0;

  const percentB =
    match.status === "completed" && match.winner === match.team_b
      ? 100
      : Math.min((Number(match.team_b_streams || 0) / totalMeta) * 100, 100) ||
        0;

  return (
    <div
      onClick={onClick}
      className="match flex flex-col gap-1.5 w-36 text-xs md:w-40"
    >
      <div>
        <div className="flex justify-between team bg-bracket border border-bracket-border p-2 rounded-lg font-bold">
          {match.team_a}{" "}
          <span className="whitespace-nowrap">{Math.round(percentA)}%</span>
          <button
            onClick={onClick}
            className=""
          >
          </button>
        </div>
        <div className="w-full bg-black/20 h-1.5 rounded-full">
          <div
            className="bg-white h-full rounded-full transition-all duration-500"
            style={{ width: `${percentA}%` }}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between team bg-bracket border border-bracket-border p-2 rounded-lg opacity-70">
          <span className="truncate mr-2">{match.team_b}</span>
          <span className="whitespace-nowrap">{Math.round(percentB)}%</span>
        </div>
        <div className="w-full bg-black/20 h-1.5 rounded-full">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${percentB}%` }}
          />
        </div>
      </div>
    </div>
  );
};

{
  /**NEW COMPONENT IN PROGRESS....... */
}
const BracketMatch2 = ({ allMatches }: { allMatches: any[] }) => {
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const getWinnerOfMatch = (matchA: any, matchB: any) => {
    // Si alguno de los partidos de octavos no está terminado, no hay ganador para cuartos
    if (matchA?.status !== "completed" || matchB?.status !== "completed")
      return null;

    // Retornamos un objeto "partido" ficticio para los cuartos
    return {
      team_a: matchA.winner,
      team_b: matchB.winner,
      status: "active", // O 'completed' si ya tienes datos para cuartos
      target_streams: matchA.target_streams_v2, // O la lógica de meta que necesites
      team_a_streams: 0,
      team_b_streams: 0,
    };
  };

  // 2. Definimos los enfrentamientos de cuartos basados en los ganadores de octavos
  // Esto es solo un ejemplo de lógica:
  //const quarter1 = allMatches.find((m) => m.id_cuarto === "Q1"); // O lógica similar

  const handleOpen = (match: any) => {
    if (match) {
      setSelectedMatch(match);
      setModalOpen(true);
    }
  };

  return (
    <div className="bg-red-900 flex flex-col items-center justify-center p-10 text-white">
      <div className="flex flex-row items-center justify-center gap-6">
        <div className="flex flex-row items-center gap-4">
          {/* Octavos Izquierda */}
          <div className="flex flex-col gap-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <MatchSlot
                key={`izq-${i}`}
                match={allMatches[i] || null}
                onClick={() => allMatches[i] && handleOpen(allMatches[i])}
              />
            ))}
          </div>
          {/* Cuartos Izquierda */}
          <div className="flex flex-col justify-around h-full py-20 gap-24">
            {/* Siempre renderizamos el slot. Si el match es null, MatchSlot pintará el "?" automáticamente */}
            <MatchSlot
              match={getWinnerOfMatch(allMatches[0], allMatches[1])}
              onClick={() => {}}
            />
            {/* El segundo slot de cuartos depende del partido 2 y 3 de octavos */}
            <MatchSlot
              match={getWinnerOfMatch(allMatches[2], allMatches[3])}
              onClick={() => {}}
            />
          </div>

          {/**SEMIFINAL */}
          <div className="flex flex-col justify-center h-full gap-4">
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
        <div className="flex flex-col items-center justify-center mb-40">
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
          <div className="text-sm font-bold mt-4">Final</div>
        </div>

        {/* LADO DERECHO */}
        <div className="flex flex-row-reverse items-center gap-4">
          {/* Octavos Derecha */}
          <div className="flex flex-col gap-12">
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
          <div className="flex flex-col justify-around h-full py-20 gap-24">
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
          <div className="flex flex-col justify-center h-full gap-4">
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
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-2">
                {/* TÍTULO CON EL VS */}
                <div className="text-center">
                  <h2 className="text-sm font-black text-gray-900 tracking-tight">
                   <span className="text-purple-800">TEAM A: </span>{selectedMatch?.team_a}
                    <span className="text-purple-500 mx-2">VS</span>
                    <span className="text-purple-800">TEAM B: </span>{selectedMatch?.team_b}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest font-semibold">
                    {selectedMatch?.stage || "Etapa en curso"}
                  </p>
                </div>

                {/* LISTA DE CANCIONES Y STREAMS */}
                <div className="space-x-0.5 gap-1 flex flex-row text-[9px]">
                  {selectedMatch?.song?.map(
                    (songName: string, index: number) => (
                      <div key={index} className="">
                        <span className="">
                          <span className="">Target:</span>
                          {songName}
                        </span>

                        <span className="">
                          <span className="">Goal:</span>
                          {selectedMatch.target_streams?.[
                            index
                          ]?.toLocaleString() || 0}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

{
  /**NEW COMPONENT IN PROGRESS.... */
}

const BTSFifa2026 = () => {
  const [formData, setFormData] = useState({
    lastfm: "",
    album: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [view, setView] = useState<"join" | "bracket" | "stats">("join");
  const [matches, setMatches] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [isLoadingMatches, setIsLoadingMatches] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      // Para actualizar las vistas, si no estamos en la vista correct 
      // No hacemos nada y salimos
      if (view !== 'stats' && view !== 'bracket') return;

      setIsLoadingMatches(true);
      setIsLoadingStats(true);

      try {
        const [matchesData, statsData] = await Promise.all([
          getBTSMatches(),
          getBTSStats(),
        ]);

        if (matchesData && matchesData.length > 0) {
          const mappedMatches = matchesData.map((doc) => ({
            id: doc.$id,
            team_a: doc.team_a,
            team_b: doc.team_b,
            song: doc.target_songs || doc.song || [],
            target_streams: doc.target_streams_v2 || doc.target_streams || [],
            team_a_streams:
              doc.team_a_current_streams ?? (doc.team_a_start_streams || 0),
            team_b_streams:
              doc.team_b_current_streams ?? (doc.team_b_start_streams || 0),
            stage: doc.stage,
            status: doc.status,
            winner: doc.winner,
          }));
          setMatches(mappedMatches);
        }

        if (statsData) {
          // Sort by total_members descending
          const sortedStats = statsData.sort(
            (a, b) => (b.total_members || 0) - (a.total_members || 0),
          );
          setStats(sortedStats);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoadingMatches(false);
        setIsLoadingStats(false);
      }
    };

    fetchData()
  }, [view]); // React "vigila" este estado

/*
 const fetchData = useCallback(async () => {
        setIsLoadingMatches(true);
        setIsLoadingStats(true);
        try {
          const [matchesData, statsData] = await Promise.all([
          getBTSMatches(),
          getBTSStats(),
        ]);

        
        if (matchesData && matchesData.length > 0) {
          const mappedMatches = matchesData.map((doc) => ({
            id: doc.$id,
            team_a: doc.team_a,
            team_b: doc.team_b,
            song: doc.target_songs || doc.song || [],
            target_streams: doc.target_streams_v2 || doc.target_streams || [],
            team_a_streams:
              doc.team_a_current_streams ?? (doc.team_a_start_streams || 0),
            team_b_streams:
              doc.team_b_current_streams ?? (doc.team_b_start_streams || 0),
            stage: doc.stage,
            status: doc.status,
            winner: doc.winner,
          }));
          setMatches(mappedMatches);
        }

        if (statsData) {
          // Sort by total_members descending
          const sortedStats = statsData.sort(
            (a, b) => (b.total_members || 0) - (a.total_members || 0),
          );
          setStats(sortedStats);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoadingMatches(false);
        setIsLoadingStats(false);
      }
    }, []);

    useEffect(() => {
  if (view === 'stats' || view === 'bracket') {
    fetchData();
  }
}, [view, fetchData]); // Ahora fetchData es una depend*/


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      await createBTSFifaUser(formData.lastfm, formData.album);

      setSuccess(true);
      setFormData({ lastfm: "", album: "" });
      // Cambiar a la vista del bracket después de 2 segundos de éxito
      setTimeout(() => {
        setView("bracket");
      }, 2000);
    } catch (err: any) {
      console.error(err);
      if (err.message === "ALREADY_EXISTS") {
        setError(
          "¡Este usuario de Last.fm ya está registrado en un equipo! No puedes hacer trampa.",
        );
      } else {
        setError("Hubo un error al unirte al equipo. Intenta nuevamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 p-4 lg:p-8 bg-[url('https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed bg-center relative font-sans">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header / Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 border-b border-white/10 pb-6">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-emerald-400 tracking-tight">
              BTS x FIFA 2026
            </h1>
            <p className="text-neutral-400 text-sm mt-1 flex items-center justify-center sm:justify-start gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              The Ultimate Streaming Playoffs
            </p>
          </div>

          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <button
              onClick={() => setView("join")}
              className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-all ${view === "join" ? "bg-purple-600 text-white shadow-lg" : "text-neutral-400 hover:text-white"}`}
            >
              Join Team
            </button>
            <button
              onClick={() => setView("bracket")}
              className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-all ${view === "bracket" ? "bg-pink-600 text-white shadow-lg" : "text-neutral-400 hover:text-white"}`}
            >
              Playoffs Bracket
            </button>
            <button
              onClick={() => setView("stats")}
              className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-all ${view === "stats" ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400 hover:text-white"}`}
            >
              Teams Stats
            </button>
          </div>
        </div>

        {/* View: Join Form */}
        {view === "join" && (
          <div className="flex justify-center items-center py-10 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl hover:shadow-purple-500/10 transition-all">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg transform rotate-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Choose Your Era
                </h2>
                <p className="text-neutral-300 text-sm">
                  Join an album team to participate in the global streaming
                  playoffs.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Last.fm Field */}
                <div className="space-y-2 group">
                  <label
                    htmlFor="lastfm"
                    className="text-sm font-medium text-neutral-200 flex items-center gap-2"
                  >
                    <Music className="w-4 h-4 text-blue-400 group-focus-within:text-blue-300 transition-colors" />
                    Last.fm Username
                  </label>
                  <input
                    type="text"
                    id="lastfm"
                    name="lastfm"
                    value={formData.lastfm}
                    onChange={handleChange}
                    required
                    placeholder="e.g. musiclover99"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-black/70"
                  />
                </div>

                {/* Album Field */}
                <div className="space-y-2 group">
                  <label
                    htmlFor="album"
                    className="text-sm font-medium text-neutral-200 flex items-center gap-2"
                  >
                    <Disc className="w-4 h-4 text-emerald-400 group-focus-within:text-emerald-300 transition-colors" />
                    Select Album (Team)
                  </label>
                  <div className="relative">
                    <select
                      id="album"
                      name="album"
                      value={formData.album}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-black/70"
                    >
                      <option value="" disabled className="text-neutral-500">
                        Choose your era...
                      </option>
                      {albums.map((a) => (
                        <option
                          key={a}
                          value={a}
                          className="bg-neutral-900 text-white"
                        >
                          {a}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                      ▼
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-4 rounded-xl text-center flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-sm p-4 rounded-xl text-center flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    ¡Te has unido exitosamente! Redirigiendo a Playoffs...
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 text-white font-bold py-4 px-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Join the Tournament
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* View: Bracket Dashboard */}
        {view === "bracket" && (
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
                Los primeros 16 álbumes se enfrentan cara a cara. El equipo que
                llegue primero a la meta de streams avanza a Cuartos de Final.
              </p>
            </div>

            {/* Grid for Bracket */}
            <div className="grid grid-cols-1 gap-6 place-items-center min-h-[200px]">
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
                * Las estadísticas se actualizan automáticamente según los datos
                de Last.fm de los usuarios inscritos. Asegúrate de streamear la{" "}
                <strong className="text-pink-400">Target Song</strong> para
                ayudar a tu equipo.
              </p>
            </div>
          </div>
        )}

        {/* View: Teams Stats */}
        {view === "stats" && (
          <div className="animate-in fade-in zoom-in-95 duration-500 max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                <BarChart3 className="w-8 h-8 text-blue-400" />
                Global Teams Standings
              </h2>
              <p className="text-neutral-400 mt-2 text-sm">
                Ranking oficial basado en la cantidad de ARMYs reclutados por
                cada álbum.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-neutral-300 text-xs uppercase tracking-widest border-b border-white/10">
                    <th className="p-5 font-semibold text-center w-16">Rank</th>
                    <th className="p-5 font-semibold">Album Era</th>
                    <th className="p-5 font-semibold text-center">
                      ARMYs Recruited
                    </th>
                    <th className="p-5 font-semibold text-center w-32">
                      Status
                    </th>
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
        )}
      </div>
    </div>
  );
};

export default BTSFifa2026;
