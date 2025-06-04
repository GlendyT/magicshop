"use client";
import { createContext, useEffect, useState } from "react";
import { AllProviderProps, FlipContextProps, ImageListTypes } from "../types";
import useRequestInfo from "@/hooks/useRequestInfo";
import { initialItems } from "app/(V)irthday/Data/imagesList";

const FlipContext = createContext<FlipContextProps>(null!);

const FlipProvider = ({ children }: AllProviderProps) => {
  const [items, setItems] = useState<ImageListTypes[]>(initialItems.flat());
  const [prev, setPrev] = useState<number>(-1);
  const [timer, setTimer] = useState<number>(50);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);
  const [timeExpired, setTimeExpired] = useState<boolean>(false);
  const [showAccessModal, setShowAccessModal] = useState<boolean>(false);
  const [restart, setRestart] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const { setShowModal, setUsuario } = useRequestInfo();

  const handleUnlockClick = () => {
    setShowModal(false);
    setShowAccessModal(true);
  };

  const handleRestart = () => {
    setGameOver(false);
    setWin(false);
    setTimeExpired(false);
    setTimer(50);
    setPrev(-1);
    setRestart(true);
    setGameStarted(false);
    setShowAccessModal(false);
    setUsuario({ name: "", content: "", diseño: "", song: "" });
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setRestart(false);
    setTimer(50);
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    const activeItems = shuffledItems.map((item) => ({
      ...item,
      price: "active",
    }));
    setItems(activeItems);

    const timeout = setTimeout(() => {
      const hiddenItems = activeItems.map((item) => ({ ...item, price: "" }));
      setItems(hiddenItems);
    }, 2000);

    return () => clearTimeout(timeout);
  };

  const startTimer = () => {
    setGameStarted(true);
    setTimer(50);
  };

  useEffect(() => {
    if (timer > 0 && gameStarted && !gameOver) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setGameOver(true);
      setTimeExpired(true);
    }
  }, [timer, gameStarted, gameOver]);

  useEffect(() => {
    if (items.every((item) => item.price === "correct")) {
      const timeout = setTimeout(() => {
        setWin(true);
      }, 3000);
      setGameOver(true);
      return () => clearTimeout(timeout);
    }
  }, [items]);

  const check = (current: number) => {
    if (items[current].id === items[prev].id) {
      items[current].price = "correct";
      items[prev].price = "correct";
      setItems([...items]);
      setPrev(-1);
    } else {
      items[current].price = "wrong";
      items[prev].price = "wrong";
      setItems([...items]);
      setTimeout(() => {
        items[current].price = "";
        items[prev].price = "";
        setItems([...items]);
        setPrev(-1);
      }, 1000);
    }
  };

  const handleClick = (id: number) => {
    if (
      items[id].price === "correct" ||
      items[id].price === "active" ||
      gameOver ||
      !gameStarted
    )
      return;

    if (prev === -1) {
      items[id].price = "active";
      setItems([...items]);
      setPrev(id);
    } else {
      check(id);
    }
  };

  const isFlipped = (item: ImageListTypes): string | boolean => {
    return item.isMatched || (item.price ? "active" + item.price : "");
  };

  const onCardClick = (item: ImageListTypes) => {
    if (!item.isMatched) {
      handleClick(items.indexOf(item));
    }
  };

  return (
    <FlipContext.Provider
      value={{
        timer,
        setTimer,
        items,
        setItems,
        prev,
        setPrev,
        gameOver,
        setGameOver,
        win,
        setWin,
        timeExpired,
        setTimeExpired,
        showAccessModal,
        setShowAccessModal,
        restart,
        setRestart,
        gameStarted,
        setGameStarted,
        handleUnlockClick,
        handleRestart,
        handleStartGame,
        startTimer,
        handleClick,
        isFlipped,
        onCardClick,
      }}
    >
      {children}
    </FlipContext.Provider>
  );
};

export { FlipProvider };
export default FlipContext;
