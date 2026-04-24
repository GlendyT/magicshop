import { useQuery } from "@tanstack/react-query";
import { getBTSPolaroid, getSugaVerse } from "./appwrite";
import { BTSPhrases, SugaVerse } from "../../type";

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
