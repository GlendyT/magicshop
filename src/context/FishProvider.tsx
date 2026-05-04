"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { AllProviderProps, FishContextType, FishJinTypes } from "../types";
import { getAllJinTracks } from "@/services/jinAlbums";

const FishContext = createContext<FishContextType>(null!);

const FishProvider = ({ children }: AllProviderProps) => {
  const [jinTracks, setJinTracks] = useState<FishJinTypes[]>([]);

  const getWord = useCallback((): FishJinTypes => {
    if (!jinTracks || jinTracks.length === 0) {
      return { word: "" } as FishJinTypes;
    }
    const randomIndex = Math.floor(Math.random() * jinTracks.length);
    return jinTracks[randomIndex];
  }, [jinTracks]);

  const MAX_TRIES = 6;
  const [wordData, setWordData] = useState<FishJinTypes>({ word: "" } as FishJinTypes);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [pressedLetter, setPressedLetter] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(true);

  useEffect(() => {
    if (jinTracks && jinTracks.length > 0 && (!wordData || !wordData.word)) {
      setWordData(getWord());
    }
  }, [jinTracks, wordData, getWord]);

  const wordToGuess = wordData?.word?.toLowerCase() || "";

  const correctLetters = guessedLetters.filter((letter) =>
    wordToGuess.includes(letter.toLowerCase()),
  );

  const incorrectGuesses = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter.toLowerCase()),
  );

  const isLoser = incorrectGuesses.length >= MAX_TRIES;
  const isWinner = wordToGuess.length > 0 && wordToGuess
    .split("")
    .filter((char) => /[a-z]/.test(char)) // Ignoramos espacios y símbolos para poder ganar
    .every((letter) => guessedLetters.includes(letter.toLowerCase()));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      const lowerCaseLetter = letter.toLowerCase();
      if (guessedLetters.includes(lowerCaseLetter) || isLoser || isWinner)
        return;

      setGuessedLetters((currentLetters) => [
        ...currentLetters,
        lowerCaseLetter,
      ]);
    },
    [guessedLetters, isWinner, isLoser],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessedLetter(key);
    };
    document.addEventListener("keypress", handler);
    return () => document.removeEventListener("keypress", handler);
  }, [addGuessedLetter, guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordData(getWord());
    };
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [getWord]);

  const handleClick = (key: string) => {
    setPressedLetter(key.toLowerCase());
    addGuessedLetter(key);

    setTimeout(() => {
      setPressedLetter(null);
    }, 200);
  };

  const handleStartOver = () => {
    setGuessedLetters([]);
    setWordData(getWord());
  };

  useEffect(() => {
    if (isWinner) {
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isWinner]);

  const handleCloseandRestart = () => {
    handleStartOver();
    setShow(false);
  };

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const tracks = await getAllJinTracks();
        // Mapeamos y limpiamos las canciones para que cumplan con la estructura del juego
        const mappedTracks = tracks.map((track) => ({
          // Eliminamos paréntesis y apóstrofes de los títulos
          word: track.name.replace(/[()'’,′ -.]/g, ""),
        }));
        setJinTracks(mappedTracks as FishJinTypes[]);
      } catch (error) {
        console.error("Error loading tracks:", error);
      }
    }
    loadTracks();
  }, [])

  return (
    <FishContext.Provider
      value={{
        showModal,
        setShowModal,
        correctGuessCount: correctLetters.length,
        correctLetters,
        incorrectGuesses,
        isLoser,
        isWinner,
        wordToGuess,
        guessedLetters,
        addGuessedLetter,
        handleClick,
        pressedLetter,
        reveal: isLoser,
        activeLetters: correctLetters,
        disabled: isWinner || isLoser,
        inactiveLetters: incorrectGuesses,
        handleStartOver,
        wordData,
        setShow,
        show,
        handleCloseandRestart,
      }}
    >
      {children}
    </FishContext.Provider>
  );
};

export { FishProvider };
export default FishContext;
