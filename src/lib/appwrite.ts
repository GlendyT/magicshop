import { Client, Databases, Functions, Query, ID, Account } from "appwrite";

export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "",
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "",
  projectName: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME || "",
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
  polaroidCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_POLAROID_COLLECTION_ID || "",
  sugaverseCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_SUGAVERSE_COLLECTION_ID || "",
  lovenotesCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_LOVENOTES_COLLECTION_ID || "",
  btsmembersCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_BTSMEMBERS_COLLECTION_ID || "",
  tetrisbtsCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_TETRISBTS_COLLECTION_ID || "",
  btsfifaCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_BTSFIFA_COLLECTION_ID || "",
  btsmatchesCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_BTSMATCHES_COLLECTION_ID || "",
  btsstatsCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_BTSSTATS_COLLECTION_ID || "",
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
};

let client: Client | null = null;
let databases: Databases | null = null;
let functions: Functions | null = null;
let account: Account | null = null;

const getDatabases = () => {
  if (!appwriteConfig.endpoint || !appwriteConfig.projectId) {
    console.warn("[Appwrite] Missing endpoint or projectId", {
      hasEndpoint: Boolean(appwriteConfig.endpoint),
      hasProjectId: Boolean(appwriteConfig.projectId),
    });

    return null;
  }

  if (!client) {
    client = new Client()
      .setEndpoint(appwriteConfig.endpoint)
      .setProject(appwriteConfig.projectId);
  }

  if (!databases) {
    databases = new Databases(client);
  }

  return databases;
};

const getFunctions = () => {
  if (!client) getDatabases(); // Initialize client if not already
  if (!client) return null;
  
  if (!functions) {
    functions = new Functions(client);
  }
  return functions;
};

export { client, databases, functions, getFunctions };

export const getBTSPolaroid = async () => {
  const db = getDatabases();

  if (
    !db ||
    !appwriteConfig.databaseId ||
    !appwriteConfig.polaroidCollectionId
  ) {
    console.warn("[Appwrite] getBTSPolaroid not properly configured", {
      hasDatabases: Boolean(db),
      hasDatabaseId: Boolean(appwriteConfig.databaseId),
      hasPolaroidCollectionId: Boolean(appwriteConfig.polaroidCollectionId),
    });

    return [];
  }

  try {
    const btsphrases = await db.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.polaroidCollectionId,
      [
        Query.limit(100),
        Query.select(["*", "btsGroup.*"]),
      ]
    );

   // console.log("[Appwrite] getBTSPolaroid loaded:", btsphrases.documents.length);

    return btsphrases.documents;
  } catch (error) {
    console.error("[Appwrite] Error fetching BTS phrases", error);
    return [];
  }
};

export const getSugaVerse = async () => {
  const db = getDatabases();

  if (
    !db ||
    !appwriteConfig.databaseId ||
    !appwriteConfig.sugaverseCollectionId
  ) {
    console.warn("[Appwrite] getSugaVerse not properly configured", {
      hasDatabases: Boolean(db),
      hasDatabaseId: Boolean(appwriteConfig.databaseId),
      hasSugaVerseCollectionId: Boolean(appwriteConfig.sugaverseCollectionId),
    });

    return [];
  }

  try {
    const sugaverse = await db.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.sugaverseCollectionId,
      [Query.limit(100)]
    );

    //console.log("[Appwrite] getSugaVerse loaded:", sugaverse.documents.length);

    return sugaverse.documents;
  } catch (error) {
    console.error("[Appwrite] Error fetching SugaVerse data", error);
    return [];
  }
};

export const getLoveNotes = async () => {
  const db = getDatabases();

  if (
    !db ||
    !appwriteConfig.databaseId ||
    !appwriteConfig.lovenotesCollectionId
  ) {
    console.warn("[Appwrite] getLoveNotes not properly configured", {
      hasDatabases: Boolean(db),
      hasDatabaseId: Boolean(appwriteConfig.databaseId),
      hasLoveNotesCollectionId: Boolean(appwriteConfig.lovenotesCollectionId),
    });

    return [];
  }

  try {
    const lovenotes = await db.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.lovenotesCollectionId,
      [
        Query.limit(100),
        Query.select(["*", "btsMembers.*"]),
      ]
    );

    //console.log("[Appwrite] getLoveNotes loaded:", lovenotes.documents.length);

    return lovenotes.documents;
  } catch (error) {
    console.error("[Appwrite] Error fetching Love Notes", error);
    return [];
  }
};

export const getBTSMembers = async () => {
  const db = getDatabases();

  if (
    !db ||
    !appwriteConfig.databaseId ||
    !appwriteConfig.btsmembersCollectionId
  ) {
    console.warn("[Appwrite] getBTSMembers not properly configured", {
      hasDatabases: Boolean(db),
      hasDatabaseId: Boolean(appwriteConfig.databaseId),
      hasBTSMembersCollectionId: Boolean(appwriteConfig.btsmembersCollectionId),
    });

    return [];
  }

  try {
    const btsmembers = await db.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.btsmembersCollectionId,
      [Query.limit(100)]
    );

    //console.log("[Appwrite] getBTSMembers loaded:", btsmembers.documents.length);

    return btsmembers.documents;
  } catch (error) {
    console.error("[Appwrite] Error fetching BTS Members", error);
    return [];
  }
};

export const getTetrisBTS = async () => {
  const db = getDatabases();

  if (
    !db ||
    !appwriteConfig.databaseId ||
    !appwriteConfig.tetrisbtsCollectionId
  ) {
    console.warn("[Appwrite] getTetrisBTS not properly configured", {
      hasDatabases: Boolean(db),
      hasDatabaseId: Boolean(appwriteConfig.databaseId),
      hasTetrisBTSCollectionId: Boolean(appwriteConfig.tetrisbtsCollectionId),
    });

    return [];
  }

  try {
    const tetrisbts = await db.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.tetrisbtsCollectionId,
      [
        Query.limit(100),
        Query.select(["*", "btsMembers.*"]),
      ]
    );

    //console.log("[Appwrite] getTetrisBTS loaded:", tetrisbts.documents.length);

    return tetrisbts.documents;
  } catch (error) {
    console.error("[Appwrite] Error fetching tetris bts", error);
    return [];
  }
};

/**
 * @deprecated Replaced by createBTSFifaUserSpotify — uses Spotify OAuth instead of Last.fm
 */
export const createBTSFifaUser = async (lastfmuser: string, fifateam: string) => {
  const db = getDatabases();

  if (!db || !appwriteConfig.databaseId || !appwriteConfig.btsfifaCollectionId) {
    console.error("[Appwrite] createBTSFifaUser not properly configured");
    throw new Error("Database not configured");
  }

  try {
    const existingUsers = await db.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.btsfifaCollectionId,
      [Query.equal('lastfmuser', lastfmuser)]
    );

    if (existingUsers.total > 0) {
      throw new Error("ALREADY_EXISTS");
    }

    const response = await db.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.btsfifaCollectionId,
      ID.unique(),
      {
        lastfmuser,
        fifateam
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Crea un nuevo participante del BTS FIFA 2026 usando su cuenta de Spotify.
 * Reemplaza a createBTSFifaUser (Last.fm).
 */
export const createBTSFifaUserSpotify = async (
  spotifyUserId: string,
  spotifyUsername: string,
  fifateam: string
) => {
  const db = getDatabases();

  if (!db || !appwriteConfig.databaseId || !appwriteConfig.btsfifaCollectionId) {
    console.error("[Appwrite] createBTSFifaUserSpotify not properly configured");
    throw new Error("Database not configured");
  }

  try {
    // Verificar si este usuario de Spotify ya está registrado
    const existingUsers = await db.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.btsfifaCollectionId,
      [Query.equal('spotifyUserId', spotifyUserId)]
    );

    if (existingUsers.total > 0) {
      throw new Error("ALREADY_EXISTS");
    }

    const response = await db.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.btsfifaCollectionId,
      ID.unique(),
      {
        spotifyUserId,
        spotifyUsername,
        fifateam,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getBTSMatches = async () => {
  const db = getDatabases();

  if (
    !db ||
    !appwriteConfig.databaseId ||
    !appwriteConfig.btsmatchesCollectionId
  ) {
    console.warn("[Appwrite] getBTSMatches not properly configured");
    return [];
  }

  try {
    const matches = await db.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.btsmatchesCollectionId,
      [Query.limit(100)]
    );

    return matches.documents;
  } catch (error) {
    console.error("[Appwrite] Error fetching BTS matches", error);
    return [];
  }
};

export const getBTSStats = async () => {
  const db = getDatabases();

  if (
    !db ||
    !appwriteConfig.databaseId ||
    !appwriteConfig.btsstatsCollectionId
  ) {
    console.warn("[Appwrite] getBTSStats not properly configured");
    return [];
  }

  try {
    const stats = await db.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.btsstatsCollectionId,
      [Query.limit(100)]
    );

    return stats.documents;
  } catch (error) {
    console.error("[Appwrite] Error fetching BTS stats", error);
    return [];
  }
};

{/**PARA QUE ACEPTE UN ARRAY DE STRINGS Y NO UNA CANCION. EDITAR AQUI */}
export const createBTSMatch = async (matchData: { team_a: string; team_b: string; target_songs: string[]; target_streams_v2: number[]; stage: string; status: string; winner?: string }) => {
  const db = getDatabases();

  if (!db || !appwriteConfig.databaseId || !appwriteConfig.btsmatchesCollectionId) {
    throw new Error("Database not configured");
  }

  try {
    const response = await db.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.btsmatchesCollectionId,
      ID.unique(),
      {
        team_a: matchData.team_a,
        team_b: matchData.team_b,
        target_songs: matchData.target_songs, 
        target_streams_v2: matchData.target_streams_v2,
        stage: matchData.stage,
        status: matchData.status,
        winner: matchData.winner || "",
        team_a_start_streams: 0, 
        team_b_start_stream: 0, // Nota: tienes este campo como team_b_start_stream en tu json
        team_a_current_streams: 0,
        team_b_current_streams: 0
      }
    );
    return response;
  } catch (error) {
    console.error("[Appwrite] Error creating BTS match", error);
    throw error;
  }
};

export const triggerMatchSync = async (functionId: string) => {
  const fns = getFunctions();
  if (!fns) throw new Error("Functions not configured");
  
  try {
    const response = await fns.createExecution(functionId);
    return response;
  } catch (error) {
    console.error("[Appwrite] Error triggering function", error);
    throw error;
  }
};

export const deleteBTSMatch = async (matchId: string) => {
  const db = getDatabases();
  if (!db || !appwriteConfig.databaseId || !appwriteConfig.btsmatchesCollectionId) {
    throw new Error("Database not configured");
  }

  try {
    await db.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.btsmatchesCollectionId,
      matchId
    );
    return true;
  } catch (error) {
    console.error("[Appwrite] Error deleting match", error);
    throw error;
  }
};

export const getTeamMemberCount = async (team: string) => {
  const db = getDatabases();
  if (!db || !appwriteConfig.databaseId || !appwriteConfig.btsfifaCollectionId) {
    return 0;
  }

  try {
    const response = await db.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.btsfifaCollectionId,
      [Query.equal('fifateam', team), Query.limit(1)]
    );
    return response.total;
  } catch (error) {
   console.error(`[Appwrite] Error fetching count for team ${team}`, error);
    return 0;
  }
};

export const syncGlobalStats = async (albums: string[]) => {
  const db = getDatabases();
  if (!db || !appwriteConfig.databaseId || !appwriteConfig.btsstatsCollectionId) {
    throw new Error("Database not configured");
  }

  try {
    for (const album of albums) {
      // 1. Get exact member count from btsfifa
      const count = await getTeamMemberCount(album);

      // 2. Check if this album already has a record in btsStats
      const existingStats = await db.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.btsstatsCollectionId,
        [Query.equal('album_name', album)]
      );

      if (existingStats.total > 0) {
        // Update existing record
        const statId = existingStats.documents[0].$id;
        await db.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.btsstatsCollectionId,
          statId,
          { total_members: count }
        );
      } else {
        // Create new record
        await db.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.btsstatsCollectionId,
          ID.unique(),
          {
            album_name: album,
            total_members: count,
            status: "active"
          }
        );
      }
    }
    return true;
  } catch (error) {
    console.error("[Appwrite] Error syncing global stats", error);
    throw error;
  }
};

// Esta es la funciom para el auth 
export const getAccount = () => {
  if (!client) {
    client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);
  }

  if (!account) {
    account = new Account(client);
  }
  return account;
};
