"use client";
import { createContext, useState, ReactNode } from "react";
import { TrackResult } from "@/types/lastfmtypes";
import { checkRecentTrack } from "@/services/lastfm";
import { BingoContextType } from "../types";
import useRequestInfo from "@/hooks/useRequestInfo";

const BingoContext = createContext<BingoContextType>(null!);

export const BingoProvider = ({ children }: { children: ReactNode }) => {
  const [result, setResult] = useState<TrackResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const { handleResetContent } = useRequestInfo()

  const handleCheck = async (username: string) => {
    if (!username.trim()) return;
    
    setIsChecking(true);
    try {
      const bingoResult = await checkRecentTrack(username);
      setResult(bingoResult);
      setHasChecked(true);
    } catch {
      setResult({
        found: false,
        userExists: false,
        error: "An error occurred while checking tracks",
        allTargetSongs: []
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleCleanCheck = () => {
    handleResetContent();
    setResult(null);
    setIsChecking(false);
    setHasChecked(false);
  };


  return (
    <BingoContext.Provider value={{
      result,
      isChecking,
      hasChecked,
      handleCheck, handleCleanCheck
    }}>
      {children}
    </BingoContext.Provider>
  );
};

export default BingoContext;