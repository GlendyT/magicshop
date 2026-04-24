import { useQuery } from "@tanstack/react-query";
import { getBTSPolaroid, getLoveNotes, getSugaVerse } from "./appwrite";
import { BTSPhrases, LoveNotes, SugaVerse } from "../../type";

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
