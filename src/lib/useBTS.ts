import { useQuery } from "@tanstack/react-query";
import { getBTSPhrases } from "./appwrite";
import { BTSPhrases } from "../../type";

export const useBTS = () => {
  const { data: btsPhrases = [], isLoading, error } = useQuery({
    queryKey: ["btsPhrases"],
    queryFn: getBTSPhrases,
  });

  return {
    btsPhrases: btsPhrases as unknown as BTSPhrases[],
    isLoading,
    error,
  };
};
