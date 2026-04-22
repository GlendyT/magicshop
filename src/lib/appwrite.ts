import { Client, Databases, Query } from "appwrite";

export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "",
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "",
  projectName: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME || "",
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
  polaroidCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_POLAROID_COLLECTION_ID || "",
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
};

// Only initialize client if we have valid config
let client: Client | null = null;
let databases: Databases | null = null;

if (typeof window !== 'undefined' && appwriteConfig.endpoint && appwriteConfig.projectId) {
  client = new Client();
  client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);
  databases = new Databases(client);
}

export { client, databases };

export const getBTSPhrases = async () => {
  if (!databases || !appwriteConfig.databaseId || !appwriteConfig.polaroidCollectionId) {
    console.warn('Appwrite not properly configured');
    return [];
  }
  
  try {
    const btsphrases = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.polaroidCollectionId,
      [Query.limit(100)]
    );

    return btsphrases.documents;
  } catch (error) {
    console.log("Error fetching BTS phrases", error);
    return [];
  }
};
