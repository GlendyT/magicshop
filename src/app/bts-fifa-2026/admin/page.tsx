"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Plus,
  RefreshCw,
  Trophy,
  ShieldAlert,
  Music,
  Trash2,
  Users,
  DatabaseZap,
} from "lucide-react";
import {
  createBTSMatch,
  triggerMatchSync,
  getBTSMatches,
  deleteBTSMatch,
  getTeamMemberCount,
  syncGlobalStats,
} from "@/lib/appwrite";

/// funcion temporal

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
  "Love Yourself: Her",
  "Love Yourself: Tear",
  "Love Yourself: Answer",
  "Map of the Soul: Persona",
  "Map of the Soul: 7",
  "BE",
  "Proof",
  "Arirang",
];

const popularSongs = [
  "No More Dream",
  "N.O",
  "Boy In Luv",
  "Danger",
  "I NEED U",
  "RUN",
  "Burning Up (Fire)",
  "Save ME",
  "Blood Sweat & Tears",
  "Spring Day",
  "Not Today",
  "DNA",
  "MIC Drop",
  "FAKE LOVE",
  "The Truth Untold",
  "IDOL",
  "Epiphany",
  "Boy With Luv (feat. Halsey)",
  "Mikrokosmos",
  "ON",
  "Black Swan",
  "Life Goes On",
  "Dynamite",
  "Butter",
  "Permission to Dance",
  "Yet To Come",
  "Run BTS",
];

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    team_a: "",
    team_b: "",
    // target_song: '', // Cambios aqui
    //    target_streams: 10000,
    stage: "Octavos",
    status: "active",
  });

  const [functionId, setFunctionId] = useState("6a1dc0bb002398cdc3dc"); // ID de la función que vimos en consola
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSyncingStats, setIsSyncingStats] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [matches, setMatches] = useState<any[]>([]);
  const [isLoadingMatches, setIsLoadingMatches] = useState(true);

  // ESTADOS INDEPENDIENTE PARA LA LISTA DE CANCIONES
  const [targetSongs, setTargetSongs] = useState<string[]>([]);
  const [songInput, setSongInput] = useState("");

  const [targetStreams, setTargetStreams] = useState<number[]>([]);
  const [currentStreamTarget, setCurrentStreamTarget] = useState(0);

  const fetchMatches = async () => {
    setIsLoadingMatches(true);
    try {
      const data = await getBTSMatches();
      if (data && data.length > 0) {
        // Fetch user counts for each team in parallel
        const matchesWithCounts = await Promise.all(
          data.map(async (m) => {
            const countA = await getTeamMemberCount(m.team_a);
            const countB = await getTeamMemberCount(m.team_b);
            return { ...m, team_a_count: countA, team_b_count: countB };
          }),
        );
        setMatches(matchesWithCounts);
      } else {
        setMatches([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingMatches(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "target_streams" ? parseInt(value) || 0 : value,
    }));
  };

  // Calcular qué álbumes ya están jugando actualmente
  const occupiedAlbums = matches
    .filter((m) => m.status !== "completed") // Si ya terminó, el ganador podría volver a jugar en otra fase
    .flatMap((m) => [m.team_a, m.team_b]);

  const availableAlbums = albums.filter((a) => !occupiedAlbums.includes(a));

  // funcion para agregar cancon y streams
  const handleAddToList = () => {
    if (songInput.trim() !== "") {
      setTargetSongs((prev) => [...prev, songInput]);

      setTargetStreams((prev) => [...prev, currentStreamTarget || 10000]);

      setSongInput("");
      setCurrentStreamTarget(0);
    } else {
      setMessage({
        text: "Debe agregar al menos una cancion meta.",
        type: "error",
      });
    }
  };

  const handleCreateMatch = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("el formuario ha sido enviado ")
    // Verificamos si hay algo en el input para "capturarlo"
    //const songToUse = [...targetSongs]; // Usamos el estado de canciones en lugar del formData

    // Validar los equipos
    if (formData.team_a === formData.team_b) {
      setMessage({
        text: "No puedes enfrentar a un equipo contra sí mismo.",
        type: "error",
      });
      return;
    }

    // Validar que al menos se haya agregado una cancion meta
    if (targetSongs.length === 0) {
      setMessage({
        text: "Debe agregar al menos una cancion meta.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {

      console.log("Datos a enviar a Appwrite:", { team_a: formData.team_a, team_b: formData.team_b, target_songs: targetSongs,  target_streams_v2: targetStreams,});

      await createBTSMatch({
        team_a: formData.team_a,
        team_b: formData.team_b,
        target_songs: targetSongs, // AQUI CAMBIO PASAMOS EL ARRAY
        target_streams_v2: targetStreams,
        // target_streams: formData.target_streams,
        stage: formData.stage,
        status: formData.status,
        winner: "",
      
      });
      setMessage({
        text: "Partido creado exitosamente en la base de datos.",
        type: "success",
      });

      // LIMPIANDO EL ESTADO DE SONGS
      setTargetSongs([]);
      setSongInput("");
      setTargetStreams([]);
      setCurrentStreamTarget(0);
      // limpiando el estado de songs

      setFormData((prev) => ({ ...prev, target_song: "" })); // Limpiar solo un poco
      fetchMatches(); // RESETEAR ESTADOS
    } catch (err) {
      console.error(err);
      setMessage({
        text: "Error al crear el partido. Revisa la consola.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSyncStreams = async () => {
    if (!functionId) {
      setMessage({
        text: "Ingresa el ID de la función de Appwrite.",
        type: "error",
      });
      return;
    }

    setIsSyncing(true);
    setMessage({ text: "", type: "" });

    try {
      await triggerMatchSync(functionId);
      setMessage({
        text: "¡Sincronización enviada! Revisa el bracket en unos segundos.",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setMessage({
        text: 'Error al sincronizar. Asegúrate de que el usuario tenga permisos "execute" en la función, o que el Function ID sea correcto.',
        type: "error",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSyncStats = async () => {
    setIsSyncingStats(true);
    setMessage({
      text: "Calculando usuarios y actualizando el ranking global (Teams Stats)...",
      type: "success",
    });
    try {
      await syncGlobalStats(albums);
      setMessage({
        text: "¡Tabla btsStats actualizada exitosamente con los ARMYs reales!",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setMessage({
        text: "Error al sincronizar la tabla btsStats.",
        type: "error",
      });
    } finally {
      setIsSyncingStats(false);
    }
  };

  const handleDeleteMatch = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este partido permanentemente?"))
      return;
    try {
      await deleteBTSMatch(id);
      setMessage({ text: "Partido eliminado exitosamente.", type: "success" });
      fetchMatches();
    } catch (err) {
      setMessage({ text: "Error al eliminar el partido.", type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 p-4 lg:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
          <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-500/50">
            <ShieldAlert className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-neutral-400 text-sm">
              Panel de control exclusivo para organizar los Playoffs de BTS x
              FIFA.
            </p>
          </div>
        </div>

        {message.text && (
          <div
            className={`p-4 rounded-xl mb-6 text-sm font-medium flex items-center gap-3 ${
              message.type === "success"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-red-500/20 text-red-300 border border-red-500/30"
            }`}
          >
            {message.type === "success" ? (
              <Trophy className="w-4 h-4" />
            ) : (
              <ShieldAlert className="w-4 h-4" />
            )}
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Formulario de Creación de Partido */}
          <div className="md:col-span-2 bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-400" />
              Crear Nuevo Partido
            </h2>

            <form onSubmit={handleCreateMatch} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                    Team A
                  </label>
                  <select
                    name="team_a"
                    value={formData.team_a}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="" disabled>
                      Seleccionar equipo...
                    </option>
                    {availableAlbums
                      .filter((a) => a !== formData.team_b)
                      .map((a) => (
                        <option key={`a-${a}`} value={a}>
                          {a}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                    Team B
                  </label>
                  <select
                    name="team_b"
                    value={formData.team_b}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="" disabled>
                      Seleccionar equipo...
                    </option>
                    {availableAlbums
                      .filter((a) => a !== formData.team_a)
                      .map((a) => (
                        <option key={`b-${a}`} value={a}>
                          {a}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                  Canción Meta (Target Song)
                </label>
                <div className="relative">
                  <Music className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    name="target_song"
                    value={songInput}
                    onChange={(e) => {
                      setSongInput(e.target.value);

                      if (message.text !== "") {
                        setMessage({ text: "", type: "" });
                      }
                    }}
                    list="bts-songs"
                    placeholder="Escribe o selecciona de la lista (Escritura exacta de Last.fm)"
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 pl-10 text-white focus:ring-2 focus:ring-blue-500"
                  />

                  {/** BOTON PARA ANADIR MAS CANCIONES */}
                  <button
                    type="button"
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg"
                    onClick={handleAddToList} // ¡Aquí ya llamas a la función que definiste!
                  >
                    +
                  </button>
                  {/**boton para anadir mas canciones */}

                  {/** LISTA VISUAL DE CNCIONES ANADIADAS */}
                  <div className="flex flex-col gap-2 mt-2">
                    {targetSongs.map((songName, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-purple-500/20 p-2 rounded"
                      >
                        <span className="text-purple-300 flex-1">
                          {songName}{" "}
                          {/* Aquí muestras el nombre directamente */}
                        </span>

                        {/* Input para la meta individual */}
                        <input
                          type="number"
                          value={targetStreams[index]} // Accedes al array de números por el mismo índice
                          onChange={(e) => {
                            const newTarget = parseInt(e.target.value) || 0;
                            const updatedStreams = [...targetStreams];
                            updatedStreams[index] = newTarget; // Actualizas el array de números
                            setTargetStreams(updatedStreams);
                          }}
                          className="w-20 bg-black/50 text-white border border-white/10 rounded px-2"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            // Eliminas de AMBOS arrays usando el mismo índice
                            setTargetSongs(
                              targetSongs.filter((_, i) => i !== index),
                            );
                            setTargetStreams(
                              targetStreams.filter((_, i) => i !== index),
                            );
                          }}
                          className="text-red-400 hover:text-red-200 font-bold px-2"
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                  {/**LISTA VISAUL DE CANCIONES ANADIDAS */}

                  <datalist id="bts-songs">
                    {popularSongs.map((song) => (
                      <option key={song} value={song} />
                    ))}
                  </datalist>
                </div>
                <p className="text-[10px] text-blue-400/70 ml-1">
                  Debe coincidir exactamente con el título oficial en Last.fm
                  para que los streams cuenten.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                    Target Streams
                  </label>
                  <input
                    type="number"
                    name="target_streams"
                    min="1"
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                    Fase (Stage)
                  </label>
                  <select
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white"
                  >
                    <option value="Octavos">Octavos de Final</option>
                    <option value="Cuartos">Cuartos de Final</option>
                    <option value="Semifinal">Semifinal</option>
                    <option value="Final">Final</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Crear Partido e Iniciar"
                )}
              </button>
            </form>
          </div>

          {/* Panel de Sincronización */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 border border-pink-500/20 p-6 rounded-2xl shadow-lg backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl"></div>

              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Settings className="w-5 h-5 text-pink-400" />
                Motor de Streams
              </h2>
              <p className="text-xs text-neutral-400 mb-6">
                Fuerza a la Appwrite Function a consultar Last.fm en este
                preciso momento para todos los partidos activos.
              </p>

              <div className="space-y-3 mb-6">
                <label className="text-xs text-neutral-500 font-medium">
                  Function ID
                </label>
                <input
                  type="text"
                  value={functionId}
                  onChange={(e) => setFunctionId(e.target.value)}
                  className="w-full bg-black/50 border border-pink-500/20 rounded-lg p-2 text-xs text-neutral-300 focus:outline-none"
                />
              </div>

              <button
                onClick={handleSyncStreams}
                disabled={isSyncing}
                className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2"
              >
                {isSyncing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Actualizar Streams (Last.fm)
                  </>
                )}
              </button>
            </div>

            {/* Botón Mágico: Global Stats */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-6 rounded-2xl shadow-lg backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>

              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <DatabaseZap className="w-5 h-5 text-blue-400" />
                Sincronizar Ranking Global
              </h2>
              <p className="text-xs text-neutral-400 mb-6">
                Calcula la cantidad de ARMYs reales inscritos en cada era y
                actualiza tu tabla de btsStats para la página pública.
              </p>

              <button
                onClick={handleSyncStats}
                disabled={isSyncingStats}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                {isSyncingStats ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <DatabaseZap className="w-4 h-4" />
                    Actualizar Teams Stats
                  </>
                )}
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <h3 className="text-sm font-bold text-white mb-2">
                Instrucciones de Avance
              </h3>
              <p className="text-xs text-neutral-400">
                1. Selecciona 2 equipos y crea el partido.
                <br />
                2. El estado iniciará como "active".
                <br />
                3. Al darle a <b>Sincronizar</b>, Appwrite buscará sus streams y
                empezará a llenar las barras.
                <br />
                4. Cuando un equipo gane, el sistema lo marcará como
                "completed".
              </p>
            </div>
          </div>
        </div>

        {/* Lista de Partidos Activos */}
        <div className="mt-8 bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-6">
            Partidos Actuales en la Base de Datos
          </h2>

          {isLoadingMatches ? (
            <div className="text-center text-purple-400 py-8">
              Cargando partidos...
            </div>
          ) : matches.length === 0 ? (
            <div className="text-center text-neutral-500 py-8">
              No hay partidos creados aún.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matches.map((m: any) => (
                <div
                  key={m.$id}
                  className="flex flex-col sm:flex-row justify-between items-center bg-black/40 p-5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all gap-4"
                >
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded uppercase">
                        {m.stage}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${m.status === "active" ? "bg-emerald-500/20 text-emerald-300" : "bg-neutral-500/20 text-neutral-300"}`}
                      >
                        {m.status}
                      </span>
                      {m.winner && (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-yellow-500/20 text-yellow-300 rounded uppercase">
                          👑 {m.winner}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3 text-sm text-white font-medium truncate mb-2">
                      <div className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded-md">
                        <span>{m.team_a}</span>
                        <span className="text-[10px] text-purple-300 flex items-center bg-purple-500/20 px-1.5 py-0.5 rounded-sm">
                          <Users className="w-3 h-3 mr-1" />
                          {m.team_a_count || 0}
                        </span>
                      </div>
                      <span className="text-neutral-500 font-normal">vs</span>
                      <div className="flex items-center gap-1.5 bg-pink-500/10 border border-pink-500/20 px-2 py-1 rounded-md">
                        <span>{m.team_b}</span>
                        <span className="text-[10px] text-pink-300 flex items-center bg-pink-500/20 px-1.5 py-0.5 rounded-sm">
                          <Users className="w-3 h-3 mr-1" />
                          {m.team_b_count || 0}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
                      <Music className="w-3 h-3 text-pink-400 " />
                      <span className="truncate">
                        {m.target_songs.map((songName : string, index : number) => (
                          <span
                            key={index}
                            className="text-white-700 font-medium"
                          >
                            {songName}
                            <span className="text-neutral-400 font-normal mx-1">
                              {/* Accedemos al número usando el mismo índice */}
                              (
                              {(
                                m.target_streams_v2[index] || 0
                              ).toLocaleString()}
                              )
                            </span>
                            {index < m.target_songs.length - 1 && (
                              <span className="text-neutral-300 ml-2">| </span>
                            )}
                          </span>
                        ))}
                      </span>
                      <span className="text-neutral-600">|</span>
                      Meta:
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteMatch(m.$id)}
                    title="Eliminar partido"
                    className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors shrink-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
