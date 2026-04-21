import { Models } from "appwrite";

export interface BTSPhrases extends Models.Document {
  title: string;
  from: string;
  image: string; // Solo el ID del archivo, no la URL completa
}
