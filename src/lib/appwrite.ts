import { Client, Databases, Query } from "appwrite";

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
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
};

let client: Client | null = null;
let databases: Databases | null = null;

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

export { client, databases };

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

    console.log("[Appwrite] getBTSPolaroid loaded:", btsphrases.documents.length);

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

    console.log("[Appwrite] getSugaVerse loaded:", sugaverse.documents.length);

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

    console.log("[Appwrite] getLoveNotes loaded:", lovenotes.documents.length);

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

    console.log("[Appwrite] getBTSMembers loaded:", btsmembers.documents.length);

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

    console.log("[Appwrite] getTetrisBTS loaded:", tetrisbts.documents.length);

    return tetrisbts.documents;
  } catch (error) {
    console.error("[Appwrite] Error fetching tetris bts", error);
    return [];
  }
};