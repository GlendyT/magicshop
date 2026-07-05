import { Client, Databases, Query } from 'node-appwrite';
import axios from 'axios';

export default async function ({ req, res, log, error }) {
  const cleanVar = (val) => val ? val.replace(/^["']|["']$/g, '').trim() : undefined;

  const endpoint = cleanVar(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) || cleanVar(process.env.APPWRITE_ENDPOINT) || "https://sfo.cloud.appwrite.io/v1";
  const projectId = cleanVar(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) || cleanVar(process.env.APPWRITE_PROJECT_ID) || "69e6b56900059b447b48";
  const apiKey = req.headers['x-appwrite-key'] || cleanVar(process.env.APPWRITE_API_KEY);

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  const db = new Databases(client);
  
  const DATABASE_ID = cleanVar(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID) || cleanVar(process.env.APPWRITE_DATABASE_ID) || cleanVar(process.env.DATABASE_ID) || "69eaeed7001d3e14a936";
  const MATCHES_COLLECTION = cleanVar(process.env.NEXT_PUBLIC_APPWRITE_BTSMATCHES_COLLECTION_ID) || cleanVar(process.env.APPWRITE_BTSMATCHES_COLLECTION_ID) || "btsmatches";
  const FIFA_COLLECTION = cleanVar(process.env.NEXT_PUBLIC_APPWRITE_BTSFIFA_COLLECTION_ID) || cleanVar(process.env.APPWRITE_BTSFIFA_COLLECTION_ID) || "btsfifa";

  // Spotify Credentials
  const SPOTIFY_CLIENT_ID = cleanVar(process.env.SPOTIFY_CLIENT_ID);
  const SPOTIFY_CLIENT_SECRET = cleanVar(process.env.SPOTIFY_CLIENT_SECRET);

  log("Iniciando escaneo de partidos en vivo (Spotify)...");

  try {
    const activeMatches = await db.listDocuments(DATABASE_ID, MATCHES_COLLECTION, [
      Query.equal("status", "active")
    ]);

    for (const match of activeMatches.documents) {
      // Usar los arreglos en lugar del string simple
      const targetSongs = match.target_songs || [];
      const targetStreamsV2 = match.target_streams_v2 || [];
      const totalTargetStreams = targetStreamsV2.reduce((acc, curr) => acc + curr, 0);

      log(`Calculando: ${match.team_a} vs ${match.team_b} | Meta total: ${totalTargetStreams}`);

      const usersTeamA = await db.listDocuments(DATABASE_ID, FIFA_COLLECTION, [Query.equal("fifateam", match.team_a)]);
      const usersTeamB = await db.listDocuments(DATABASE_ID, FIFA_COLLECTION, [Query.equal("fifateam", match.team_b)]);

      let totalA = 0;
      for (const user of usersTeamA.documents) {
        // En lugar de lastfmuser, usamos spotifyUserId y el token de acceso que tengas guardado en BD
        // OJO: Aquí requieres recuperar el accessToken del usuario para llamar a la API de Spotify
        const accessToken = user.spotifyAccessToken; // Suponiendo que lo guardas aquí al autorizar
        if (accessToken) {
            totalA += await fetchSpotifyStreams(user.spotifyUserId, accessToken, targetSongs, log, error);
        }
      }

      let totalB = 0;
      for (const user of usersTeamB.documents) {
        const accessToken = user.spotifyAccessToken;
        if (accessToken) {
            totalB += await fetchSpotifyStreams(user.spotifyUserId, accessToken, targetSongs, log, error);
        }
      }

      let startA = match.team_a_start_streams || 0;
      let startB = match.team_b_start_stream || match.team_b_start_streams || 0;

      let updates = {};

      if (startA === 0 && startB === 0) {
        log(`Primera sincronización. Guardando snapshot inicial: A=${totalA}, B=${totalB}`);
        updates.team_a_start_streams = totalA;
        updates.team_b_start_stream = totalB; 
        updates.team_a_current_streams = 0;
        updates.team_b_current_streams = 0;
      } else {
        // Para Spotify, ya que iteraremos sobre "recently-played", totalA/totalB serán los *nuevos* streams
        // descubiertos en esta pasada, así que el progreso se suma al current_streams acumulado.
        const currentA = (match.team_a_current_streams || 0) + totalA;
        const currentB = (match.team_b_current_streams || 0) + totalB;
        
        log(`Streams acumulados: A=${currentA}, B=${currentB}`);

        updates.team_a_current_streams = currentA;
        updates.team_b_current_streams = currentB;

        if (totalTargetStreams > 0) {
          if (currentA >= totalTargetStreams) {
            updates.status = "completed";
            updates.winner = match.team_a;
            log(`¡${match.team_a} ha ganado el partido!`);
          } else if (currentB >= totalTargetStreams) {
            updates.status = "completed";
            updates.winner = match.team_b;
            log(`¡${match.team_b} ha ganado el partido!`);
          }
        }
      }

      await db.updateDocument(DATABASE_ID, MATCHES_COLLECTION, match.$id, updates);
    }

    return res.json({ success: true, message: "Marcadores actualizados" });
  } catch (err) {
    error("Fallo general: " + err.message);
    return res.json({ success: false, error: err.message });
  }
}

/**
 * Función que consulta el historial reciente de Spotify.
 * Retorna el número de veces que se escucharon las canciones objetivo en el periodo consultado.
 */
async function fetchSpotifyStreams(spotifyUserId, accessToken, targetSongs, log, errorLogger) {
  try {
    // 1. Obtener los "recently-played" (últimas 50 reproducciones)
    const url = `https://api.spotify.com/v1/me/player/recently-played?limit=50`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const items = response.data.items || [];
    let matchCount = 0;

    // 2. Revisar cuántas veces están las canciones objetivo en este historial
    // IMPORTANTE: Esta lógica asume que tienes un sistema para no contar canciones repetidas 
    // en llamadas anteriores (Ej. usando el timestamp 'played_at' guardado en tu BD).
    for (const item of items) {
      const track = item.track;
      if (track) {
        // Comprobar por ID de Spotify o nombre exacto
        const isTarget = targetSongs.some(target => 
          track.id === target || track.name.toLowerCase() === target.toLowerCase()
        );
        if (isTarget) {
          matchCount++;
        }
      }
    }

    log(`Usuario: ${spotifyUserId} | Streams recientes de metas: ${matchCount}`);
    return matchCount;
  } catch(e) {
    errorLogger(`Error API Spotify para ${spotifyUserId}: ${e.response?.data?.error?.message || e.message}`);
    // Si el error es 401, el token expiró y necesitarás usar el refresh_token de Spotify para obtener uno nuevo.
    return 0;
  }
}
