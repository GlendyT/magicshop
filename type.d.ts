import { Models } from "appwrite";

export interface BTSPhrases extends Models.Document {
  title?: string;
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

export interface BTSMembers extends Models.Document {
  name: string;
  aka: string;
  btsGroup: string;
  borndate: Date;
  spotifyUrl: string;
}


export interface TetrisBTS extends Models.Document {
  image: string;
  btsMembers: {
    name: string;
    aka: string;
    borndate: Date | string;
    shortAKA: string;
  };
  aka?: string;
  shortAka?: string;
  birthdaycard?: string;
  date?: string | Date;
  borndate?: string | Date;
}