import { Client, Databases, Query } from 'node-appwrite';
import axios from 'axios';

export default async function ({ req, res, log, error }) {
  // Helper para quitar comillas accidentales
  const cleanVar = (val) => val ? val.replace(/^["']|["']$/g, '').trim() : undefined;

  const endpoint = cleanVar(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) || cleanVar(process.env.APPWRITE_ENDPOINT) || "https://sfo.cloud.appwrite.io/v1";
  const projectId = cleanVar(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) || cleanVar(process.env.APPWRITE_PROJECT_ID) || "69e6b56900059b447b48";
  // Appwrite ahora inyecta una llave dinámica automáticamente si marcaste los scopes en la consola
  const apiKey = req.headers['x-appwrite-key'] || cleanVar(process.env.APPWRITE_API_KEY);

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  const db = new Databases(client);
  
  const DATABASE_ID = cleanVar(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID) || cleanVar(process.env.APPWRITE_DATABASE_ID) || cleanVar(process.env.DATABASE_ID) || "69eaeed7001d3e14a936";
  const MATCHES_COLLECTION = cleanVar(process.env.NEXT_PUBLIC_APPWRITE_BTSMATCHES_COLLECTION_ID) || cleanVar(process.env.APPWRITE_BTSMATCHES_COLLECTION_ID) || "btsmatches";
  const FIFA_COLLECTION = cleanVar(process.env.NEXT_PUBLIC_APPWRITE_BTSFIFA_COLLECTION_ID) || cleanVar(process.env.APPWRITE_BTSFIFA_COLLECTION_ID) || "btsfifa";
  const LASTFM_API_KEY = cleanVar(process.env.LASTFM_API_KEY);

  log("Iniciando escaneo de partidos en vivo...");

  try {
    const activeMatches = await db.listDocuments(DATABASE_ID, MATCHES_COLLECTION, [
      Query.equal("status", "active")
    ]);

    for (const match of activeMatches.documents) {
      log(`Calculando: ${match.team_a} vs ${match.team_b} | Canción: ${match.target_song}`);

      const usersTeamA = await db.listDocuments(DATABASE_ID, FIFA_COLLECTION, [Query.equal("fifateam", match.team_a)]);
      const usersTeamB = await db.listDocuments(DATABASE_ID, FIFA_COLLECTION, [Query.equal("fifateam", match.team_b)]);

      let totalA = 0;
      for (const user of usersTeamA.documents) {
        totalA += await fetchLastFmStreams(user.lastfmuser, match.target_song, LASTFM_API_KEY, log, error);
      }

      let totalB = 0;
      for (const user of usersTeamB.documents) {
        totalB += await fetchLastFmStreams(user.lastfmuser, match.target_song, LASTFM_API_KEY, log, error);
      }

      // Leer los streams iniciales. Cuidado con el plural/singular de tus campos en la base de datos
      let startA = match.team_a_start_streams || 0;
      let startB = match.team_b_start_stream || match.team_b_start_streams || 0;

      let updates = {};

      // Si startA es 0, significa que es la primera vez que se sincroniza el partido. Tomamos la "foto" inicial.
      if (startA === 0 && startB === 0) {
        log(`Primera sincronización para este partido. Guardando snapshot inicial: A=${totalA}, B=${totalB}`);
        updates.team_a_start_streams = totalA;
        // Usa el nombre exacto de la columna en tu BD (asumimos team_b_start_stream por tu config anterior)
        updates.team_b_start_stream = totalB; 
        updates.team_a_current_streams = 0;
        updates.team_b_current_streams = 0;
      } else {
        const progressA = Math.max(0, totalA - startA);
        const progressB = Math.max(0, totalB - startB);
        log(`Progreso real: A=${progressA}, B=${progressB}`);

        updates.team_a_current_streams = progressA;
        updates.team_b_current_streams = progressB;

        if (progressA >= match.target_streams) {
          updates.status = "completed";
          updates.winner = match.team_a;
          log(`¡${match.team_a} ha ganado el partido!`);
        } else if (progressB >= match.target_streams) {
          updates.status = "completed";
          updates.winner = match.team_b;
          log(`¡${match.team_b} ha ganado el partido!`);
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

async function fetchLastFmStreams(username, songName, apiKey, log, errorLogger) {
  try {
    const url = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=BTS&track=${encodeURIComponent(songName)}&username=${encodeURIComponent(username)}&format=json`;
    const response = await axios.get(url);
    
    if (response.data.error) {
      errorLogger(`Last.fm Error API [${username}]: ${response.data.message}`);
      return 0;
    }

    const playcount = response.data.track?.userplaycount || 0;
    log(`Usuario: ${username} | Canción: ${songName} | Streams totales: ${playcount}`);
    return parseInt(playcount);
  } catch(e) {
    errorLogger(`Error HTTP al consultar Last.fm para ${username}: ${e.message}`);
    return 0;
  }
}
