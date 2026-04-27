import { Models } from "appwrite";

export interface BTSPhrases extends Models.Document {
  title: string;
  image: string; // Solo el ID del archivo, no la URL completa
  btsGroup: {
    name: string;
  };
}

export interface SugaVerse extends Models.Document {
  name: string;
  image: string; // Solo el ID del archivo, no la URL completa
}

export interface LoveNotes extends Models.Document {
  image: string; // Solo el ID del archivo, no la URL completa
  btsMembers: {
    name: string;
  };
}
