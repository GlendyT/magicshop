"use client";
import { createContext, useEffect, useState } from "react";
import useRequestInfo from "@/hooks/useRequestInfo";
import { options } from "@/rps/Data/rockpaper";
import { RPSContextType, RPSProviderProps } from "../types";

const RPSContext = createContext<RPSContextType>(null!);

const RPSProvider = ({ children }: RPSProviderProps) => {
  const getResult = (userChoice: number, computerChoice: number): number => {
    if (userChoice === computerChoice) {
      return 0;
    }
    if (options[userChoice].beats.includes(computerChoice)) {
      return 1;
    }
    return 2;
  };

  const [userChoice, setUserChoice] = useState<number | null>(null);
  const [computerChoice, setComputerChoice] = useState<number | null>(null);
  const [userMessage, setUserMessage] = useState<string | null>(null);
  const [computerMessage, setComputerMessage] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [turns, setTurns] = useState<number>(0);
  const [userWins, setUserWins] = useState<number>(0);
  const [computerWins, setComputerWins] = useState<number>(0);
  const { handleResetContent } = useRequestInfo();
  const maxTurns = 3;

  useEffect(() => {
    if (userChoice !== null) {
      setUserMessage(`${options[userChoice]?.emoji}`);
    }
  }, [userChoice]);

  useEffect(() => {
    if (computerChoice !== null) {
      setComputerMessage(`${options[computerChoice]?.emoji}`);
    }
  }, [computerChoice]);

  const handlePlay = (choice: number) => {
    if (turns >= maxTurns) return;

    setUserChoice(choice);
    setDisabled(true);
    const randomChoice = Math.floor(Math.random() * 3);
    setComputerChoice(randomChoice);

    const gameResult = getResult(choice, randomChoice);
    setResult(gameResult);

    if (gameResult !== 0) {
      setTurns((prev) => prev + 1);
      if (gameResult === 1) {
        setUserWins((prev) => prev + 1);
      } else if (gameResult === 2) {
        setComputerWins((prev) => prev + 1);
      }
    }

    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  };

  const reset = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setUserMessage(null);
    setComputerMessage(null);
    setResult(null);
    setDisabled(false);
    setTurns(0);
    setUserWins(0);
    setComputerWins(0);
  };

  const resetAll = () => {
    handleResetContent();
    reset();
  };

  return (
    <RPSContext.Provider
      value={{
        userChoice,
        computerChoice,
        userMessage,
        computerMessage,
        result,
        disabled,
        handlePlay,
        reset,
        options,
        turns,
        maxTurns,
        userWins,
        computerWins,
        setComputerMessage,
        resetAll,
      }}
    >
      {children}
    </RPSContext.Provider>
  );
};

export { RPSProvider };
export default RPSContext;
