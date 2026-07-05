"use client";

import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { AlbumStat, Match } from "../types";
import {
  createBTSFifaUserSpotify,
  getBTSMatches,
  getBTSStats,
} from "@/lib/appwrite";
import { albums } from "../constants";
import { Trophy } from "lucide-react";
import FormTeam from "../views/form-team";
import Playoffs from "../views/palyoffs";
import Stats from "../views/stats";

interface SpotifyUser {
  id: string;
  displayName: string;
  image?: string;
}

const BTSFifa2026Content = () => {
  // ── Spotify auth state ─────────────────────────────────────────────────────
  const [spotifyUser, setSpotifyUser] = useState<SpotifyUser | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // ── Form state ─────────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    spotifyUserId: "",
    spotifyUsername: "",
    album: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // ── View / navigation state ────────────────────────────────────────────────
  const searchParams = useSearchParams();

  const [view, setView] = useState<"bracket" | "join" | "stats">(() => {
    const tabParam = searchParams.get("tab");
    return tabParam === "bracket" ||
      tabParam === "join" ||
      tabParam === "stats"
      ? tabParam
      : "bracket";
  });

  // ── Matches & stats state ──────────────────────────────────────────────────
  const [matches, setMatches] = useState<Match[]>([]);
  const [stats, setStats] = useState<AlbumStat[]>([]);
  const [isLoadingMatches, setIsLoadingMatches] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // ── Helpers ────────────────────────────────────────────────────────────────

  /** Obtiene el perfil de Spotify usando el access_token */
  const fetchSpotifyProfile = useCallback(async (token: string) => {
    try {
      const res = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        // Token expirado o inválido
        sessionStorage.removeItem("btsfifa_spotify_token");
        setAccessToken(null);
        setSpotifyUser(null);
        return;
      }

      const data = await res.json();
      const user: SpotifyUser = {
        id: data.id,
        displayName: data.display_name || data.id,
        image: data.images?.[0]?.url ?? undefined,
      };

      setSpotifyUser(user);
      setAccessToken(token);
      setFormData((prev) => ({
        ...prev,
        spotifyUserId: user.id,
        spotifyUsername: user.displayName,
      }));
    } catch {
      console.error("[BTS FIFA] Error fetching Spotify profile");
    }
  }, []);

  // ── Capturar token al regresar del callback OAuth ──────────────────────────
  useEffect(() => {
    const token = searchParams.get("access_token");
    const oauthError = searchParams.get("error");

    if (oauthError) {
      const messages: Record<string, string> = {
        access_denied: "Denegaste el acceso a Spotify. Intenta nuevamente.",
        auth_failed:
          "Ocurrió un error con la autenticación. Intenta nuevamente.",
        no_code: "No se recibió el código de Spotify. Intenta nuevamente.",
      };
      setError(messages[oauthError] || "Error de autenticación con Spotify.");
      // Limpiar params de la URL
      window.history.replaceState({}, "", "/bts-fifa-2026?tab=join");
      return;
    }

    if (token) {
      // Guardar en sessionStorage y limpiar la URL
      sessionStorage.setItem("btsfifa_spotify_token", token);
      window.history.replaceState({}, "", "/bts-fifa-2026?tab=join");
      fetchSpotifyProfile(token);
      return;
    }

    // Si no hay token en URL, intentar recuperar de sessionStorage
    const savedToken = sessionStorage.getItem("btsfifa_spotify_token");
    if (savedToken) {
      fetchSpotifyProfile(savedToken);
    }
  }, [searchParams, fetchSpotifyProfile]);

  // ── Handle browser back/forward ────────────────────────────────────────────
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
        setView("bracket");
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

  // ── Fetch matches & stats ──────────────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
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
            team_a_start_streams: Number(doc.team_a_start_streams ?? 0),
            team_b_start_stream: Number(
              doc.team_b_start_stream ?? doc.team_b_start_streams ?? 0
            ),
            team_a_current_streams: Number(doc.team_a_current_streams || 0),
            team_b_current_streams: Number(doc.team_b_current_streams || 0),
            team_a_streams: Number(
              doc.team_a_current_streams ?? doc.team_a_start_streams ?? 0
            ),
            team_b_streams: Number(
              doc.team_b_current_streams ?? doc.team_b_start_stream ?? 0
            ),
            stage: doc.stage,
            status: doc.status,
            winner: doc.winner,
          }));
          setMatches(mappedMatches);
        }

        if (statsData) {
          type RawStatDoc = {
            $id: string;
            album_name?: string;
            total_members?: number | string;
            status?: string;
            [key: string]: unknown;
          };

          const filteredStats = (statsData as RawStatDoc[]).filter((item) =>
            albums.includes(String(item.album_name ?? item.$id))
          );

          const mappedStats: AlbumStat[] = filteredStats.map((d) => ({
            $id: d.$id,
            album_name: String(d.album_name ?? d.$id ?? ""),
            total_members:
              typeof d.total_members === "string"
                ? Number(d.total_members)
                : Number(d.total_members ?? 0),
            status: d.status ?? undefined,
          }));

          const sortedStats = mappedStats.sort(
            (a, b) => b.total_members - a.total_members
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
    setSuccess(false);
    setError("");
  }, [view]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /** Inicia el flujo OAuth de Spotify */
  const handleConnectSpotify = () => {
    setIsConnecting(true);
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    // Spotify no permite "localhost" como redirect URI (política desde abril 2025).
    // Reemplazamos localhost por 127.0.0.1 para cumplir con sus requisitos.
    const origin = window.location.origin.replace("localhost", "127.0.0.1");
    const redirectUri = `${origin}/api/spotify/bts-fifa`;
    const scope = "user-read-recently-played";
    // Pasamos el redirectUri en el state para que la API route lo use
    // al intercambiar el code — garantiza que ambos lados sean idénticos.
    const state = encodeURIComponent(redirectUri);

    const authUrl =
      `https://accounts.spotify.com/authorize` +
      `?client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&state=${state}`;

    window.location.href = authUrl;
  };

  /** Desconecta la cuenta de Spotify */
  const handleDisconnectSpotify = () => {
    sessionStorage.removeItem("btsfifa_spotify_token");
    setAccessToken(null);
    setSpotifyUser(null);
    setFormData({ spotifyUserId: "", spotifyUsername: "", album: "" });
    setError("");
  };

  /** Envía el formulario de registro al equipo */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spotifyUser || !formData.album) return;

    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      await createBTSFifaUserSpotify(
        formData.spotifyUserId,
        formData.spotifyUsername,
        formData.album
      );

      setSuccess(true);
      // Limpiar sesión de Spotify después del registro exitoso
      sessionStorage.removeItem("btsfifa_spotify_token");
      setFormData({ spotifyUserId: "", spotifyUsername: "", album: "" });

      setTimeout(() => {
        setSuccess(false);
        handleViewChange("bracket");
      }, 2000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);

      if (errorMessage.includes("ALREADY_EXISTS")) {
        setError(
          "¡Esta cuenta de Spotify ya está registrada en un equipo! No puedes hacer trampa."
        );
      } else {
        setError("Hubo un error al unirte al equipo. Intenta nuevamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

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

        {/* View: Bracket Dashboard */}
        {view === "bracket" && (
          <Playoffs isLoadingMatches={isLoadingMatches} matches={matches} />
        )}

        {/* View: Join Form */}
        {view === "join" && (
          <FormTeam
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
            handleConnectSpotify={handleConnectSpotify}
            handleDisconnectSpotify={handleDisconnectSpotify}
            spotifyUser={spotifyUser}
            isConnecting={isConnecting}
            isSubmitting={isSubmitting}
            error={error}
            success={success}
            setError={setError}
            albums={albums}
          />
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
