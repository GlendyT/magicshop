import { appwriteConfig } from "./appwrite";

export const getImageUrl = (fileId: string): string => {
  return `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${fileId}/view?project=${appwriteConfig.projectId}`;
};

export const getOptimizedImageUrl = (fileId: string, width?: number, height?: number): string => {
  const baseUrl = getImageUrl(fileId);
  const params = new URLSearchParams();
  
  if (width) params.append('width', width.toString());
  if (height) params.append('height', height.toString());
  params.append('output', 'webp'); // Formato optimizado
  
  return `${baseUrl}&${params.toString()}`;
};