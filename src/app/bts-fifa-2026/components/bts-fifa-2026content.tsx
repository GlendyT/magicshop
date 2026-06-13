import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AlbumStat, Match } from "../types";
import { createBTSFifaUser, getBTSMatches, getBTSStats } from "@/lib/appwrite";
import { albums } from "../page";
import { Trophy } from "lucide-react";
import FormTeam from "../views/form-team";
import Playoffs from "../views/palyoffs";
import Stats from "../views/stats";

const BTSFifa2026Content = () => {
  const [formData, setFormData] = useState({
    lastfm: "",
    album: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();

  // Initialize view state immediately from searchParams to avoid flashing
  const [view, setView] = useState<"join" | "bracket" | "stats">(() => {
    const tabParam = searchParams.get("tab");
    return tabParam === "join" || tabParam === "bracket" || tabParam === "stats"
      ? tabParam
      : "join";
  });

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const currentTab = currentParams.get("tab");
      if (
        currentTab === "join" ||
        currentTab === "bracket" ||
        currentTab === "stats"
      ) {
        setView(currentTab);
      } else {
        setView("join");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleViewChange = (newView: "join" | "bracket" | "stats") => {
    setView(newView);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", newView);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const [matches, setMatches] = useState<Match[]>([]);
  const [stats, setStats] = useState<AlbumStat[]>([]);
  const [isLoadingMatches, setIsLoadingMatches] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Para actualizar las vistas, si no estamos en la vista correct
      // No hacemos nada y salimos
      if (view !== "stats" && view !== "bracket") return;

      setIsLoadingMatches(true);
      setIsLoadingStats(true);

      try {
        const [matchesData, statsData] = await Promise.all([
          getBTSMatches(),
          getBTSStats(),
        ]);

        if (matchesData && matchesData.length > 0) {
          const mappedMatches: Match[] = matchesData.map((doc) => ({
            id: doc.$id,
            team_a: doc.team_a,
            team_b: doc.team_b,
            target_songs: doc.target_songs,
            target_streams_v2: doc.target_streams_v2,

            // Devolviendo lo que la interfaz pide:
            team_a_start_streams: Number(doc.team_a_start_streams ?? 0),
            team_b_start_stream: Number(
              doc.team_b_start_stream ?? doc.team_b_start_streams ?? 0,
            ),
            team_a_current_streams: Number(doc.team_a_current_streams || 0),
            team_b_current_streams: Number(doc.team_b_current_streams || 0),

            team_a_streams: Number(
              doc.team_a_current_streams ?? doc.team_a_start_streams ?? 0,
            ),
            team_b_streams: Number(
              doc.team_b_current_streams ?? doc.team_b_start_stream ?? 0,
            ),
            stage: doc.stage,
            status: doc.status,
            winner: doc.winner,
          }));
          setMatches(mappedMatches);
        }

        if (statsData) {
          // Sort by total_members descending

          // define a narrow type for the raw documents we get from Appwrite
          type RawStatDoc = {
            $id: string;
            album_name?: string;
            total_members?: number | string;
            status?: string;
            [key: string]: unknown;
          };

          // keep only albums we care about (no `any`)
          const filteredStats = (statsData as RawStatDoc[]).filter((item) =>
            albums.includes(String(item.album_name ?? item.$id)),
          );

          // map RawStatDoc -> AlbumStat and coerce types safely
          const mappedStats: AlbumStat[] = filteredStats.map((d) => ({
            $id: d.$id,
            album_name: String(d.album_name ?? d.$id ?? ""),
            total_members:
              typeof d.total_members === "string"
                ? Number(d.total_members)
                : Number(d.total_members ?? 0),
            status: d.status ?? undefined,
          }));

          // comparator now works with guaranteed numbers
          const sortedStats = mappedStats.sort(
            (a, b) => b.total_members - a.total_members,
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

    fetchData();

    // Resetemaos el feedback del usuario en view
    setSuccess(false);
    setError("");
  }, [view]); // React "vigila" este estado

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
        setSuccess(false); // Agregamos para limpiar antes de navegar

        handleViewChange("bracket");
      }, 2000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);

      if (errorMessage.includes("ALREADY_EXISTS")) {
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
              onClick={() => handleViewChange("join")}
              className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-all ${view === "join" ? "bg-purple-600 text-white shadow-lg" : "text-neutral-400 hover:text-white"}`}
            >
              Join Team
            </button>
            <button
              onClick={() => handleViewChange("bracket")}
              className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-all ${view === "bracket" ? "bg-pink-600 text-white shadow-lg" : "text-neutral-400 hover:text-white"}`}
            >
              Playoffs Bracket
            </button>
            <button
              onClick={() => handleViewChange("stats")}
              className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-all ${view === "stats" ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400 hover:text-white"}`}
            >
              Teams Stats
            </button>
          </div>
        </div>

        {/* View: Join Form */}
        {view === "join" && (
          <FormTeam
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
            isSubmitting={isSubmitting}
            error={error}
            success={success}
            setError={setError}
            albums={albums}
          />
        )}

        {/* View: Bracket Dashboard */}
        {view === "bracket" && (
          <Playoffs isLoadingMatches={isLoadingMatches} matches={matches} />
        )}

        {/* View: Teams Stats */}
        {view === "stats" && (
          <Stats isLoadingStats={isLoadingStats} stats={stats} />
        )}
      </div>
    </div>
  );
};

export default BTSFifa2026Content;
