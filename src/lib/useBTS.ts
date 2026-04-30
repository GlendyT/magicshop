"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getBTSMembers,
  getBTSPolaroid,
  getJinFishingGame,
  getLoveNotes,
  getSugaVerse,
} from "./appwrite";
import { BTSMembers, BTSPhrases, JinFishingGame, LoveNotes, SugaVerse } from "../../type";

export const useBTSPolaroid = () => {
  const {
    data: btsPhrases = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["btsPhrases"],
    queryFn: getBTSPolaroid,
  });

  return {
    btsPhrases: btsPhrases as unknown as BTSPhrases[],
    isLoading,
    error,
  };
};

export const useSugaVerse = () => {
  const {
    data: sugaverse = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sugaverse"],
    queryFn: getSugaVerse,
  });

  return {
    sugaverse: sugaverse as unknown as SugaVerse[],
    isLoading,
    error,
  };
};

export const useLoveNotes = () => {
  const {
    data: lovenotes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["lovenotes"],
    queryFn: getLoveNotes,
  });

  return {
    lovenotes: lovenotes as unknown as LoveNotes[],
    isLoading,
    error,
  };
};

export const useJinFishingGame = () => {
  const {
    data: jinfishinggame = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["jinfishinggame"],
    queryFn: getJinFishingGame,
  });

  return {
    jinfishinggame: jinfishinggame as unknown as JinFishingGame[],
    isLoading,
    error,
  };
};

export const useBTSMembers = () => {
  const {
    data: btsMembers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["btsMembers"],
    queryFn: getBTSMembers,
  });

  return {
    btsMembers: btsMembers as unknown as BTSMembers[],
    isLoading,
    error,
  };
};
