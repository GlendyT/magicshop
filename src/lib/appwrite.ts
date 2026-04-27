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
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
};

// Only initialize client if we have valid config
let client: Client | null = null;
let databases: Databases | null = null;

if (
  typeof window !== "undefined" &&
  appwriteConfig.endpoint &&
  appwriteConfig.projectId
) {
  client = new Client();
  client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);
  databases = new Databases(client);
}

export { client, databases };

export const getBTSPolaroid = async () => {
  if (
    !databases ||
    !appwriteConfig.databaseId ||
    !appwriteConfig.polaroidCollectionId
  ) {
    console.warn("Appwrite not properly configured");
    return [];
  }

  try {
    const btsphrases = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.polaroidCollectionId,
      [
        Query.limit(100),
        Query.select(["*", "btsGroup.*"]), // 👈 Expande la relación
      ]
    );

    return btsphrases.documents;
  } catch (error) {
    console.log("Error fetching BTS phrases", error);
    return [];
  }
};

export const getSugaVerse = async () => {
  if (
    !databases ||
    !appwriteConfig.databaseId ||
    !appwriteConfig.sugaverseCollectionId
  ) {
    console.warn("Appwrite not properly configured");
    return [];
  }

  try {
    const sugaverse = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.sugaverseCollectionId,
      [Query.limit(100)]
    );
    return sugaverse.documents;
  } catch (error) {
    console.log("Error fetching SugaVerse data", error);
    return [];
  }
};

export const getLoveNotes = async () => {
  if (
    !databases ||
    !appwriteConfig.databaseId ||
    !appwriteConfig.polaroidCollectionId
  ) {
    console.warn("Appwrite not properly configured");
    return [];
  }

  try {
    const lovenotes = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.lovenotesCollectionId,
      [
        Query.limit(100),
        Query.select(["*", "btsMembers.*"]) // 👈 Esto le dice a Appwrite que traiga el objeto completo del miembro
      ]
    );
    return lovenotes.documents;
  } catch (error) {
    console.log("Error fetching Love Notes", error);
    return [];
  }
};
