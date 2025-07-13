"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { AllProviderProps, Board, Piece, TetrisContextType } from "../types";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  SHAPES,
} from "@/app/tetris/Data/TetrisSize";

const TetrisContext = createContext<TetrisContextType>(null!);

const TetrisProvider = ({ children }: AllProviderProps) => {
  const [board, setBoard] = useState<Board>(() =>
    Array(BOARD_HEIGHT)
      .fill(null)
      .map(() => Array(BOARD_WIDTH).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [level, setLevel] = useState(1);

  const createPiece = (): Piece => ({
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    x: Math.floor(BOARD_WIDTH / 2) - 1,
    y: 0,
    color: Math.floor(Math.random() * 7) + 1,
  });

  const isValidMove = (piece: Piece, dx = 0, dy = 0, newShape?: number[][]) => {
    const shape = newShape || piece.shape;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const newX = piece.x + x + dx;
          const newY = piece.y + y + dy;
          if (
            newX < 0 ||
            newX >= BOARD_WIDTH ||
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && board[newY][newX])
          )
            return false;
        }
      }
    }
    return true;
  };

  const placePiece = (piece: Piece) => {
    const newBoard = board.map((row) => [...row]);
    piece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell && piece.y + y >= 0) {
          newBoard[piece.y + y][piece.x + x] = piece.color;
        }
      });
    });

    // Clear lines
    const clearedBoard = newBoard.filter((row) =>
      row.some((cell) => cell === 0)
    );
    const linesCleared = BOARD_HEIGHT - clearedBoard.length;
    while (clearedBoard.length < BOARD_HEIGHT) {
      clearedBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }

    setBoard(clearedBoard);
    setScore((prev) => prev + linesCleared * 100);
  };

  const movePiece = useCallback(
    (dx: number, dy: number) => {
      if (!currentPiece || gameOver || isPaused) return;
      if (isValidMove(currentPiece, dx, dy)) {
        setCurrentPiece((prev) =>
          prev ? { ...prev, x: prev.x + dx, y: prev.y + dy } : null
        );
      } else if (dy > 0) {
        placePiece(currentPiece);
        const newPiece = createPiece();
        if (!isValidMove(newPiece)) {
          setGameOver(true);
          if (score > highScore) {
            setHighScore(score);
          }
        } else {
          setCurrentPiece(newPiece);
        }
      }
    },
    [currentPiece, board, gameOver, isPaused]
  );

  const rotatePiece = () => {
    if (!currentPiece || gameOver || isPaused) return;
    const rotated = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map((row) => row[i]).reverse()
    );
    if (isValidMove(currentPiece, 0, 0, rotated)) {
      setCurrentPiece((prev) => (prev ? { ...prev, shape: rotated } : null));
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          movePiece(-1, 0);
          break;
        case "ArrowRight":
          movePiece(1, 0);
          break;
        case "ArrowDown":
          movePiece(0, 1);
          break;
        case "ArrowUp":
          rotatePiece();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [movePiece]);

  useEffect(() => {
    if (!currentPiece && !gameOver && isPlaying) {
      setCurrentPiece(createPiece());
    }
  }, [currentPiece, gameOver, isPlaying]);

  useEffect(() => {
    const newLevel = Math.floor(score / 1000) + 1;
    setLevel(newLevel);
  }, [score]);

  useEffect(() => {
    if (!isPlaying || isPaused || gameOver) return;
    const baseSpeed = 600;
    const speed = Math.max(100, baseSpeed - (level - 1) * 100);

    const interval = setInterval(() => movePiece(0, 1), speed);
    return () => clearInterval(interval);
  }, [movePiece, isPlaying, gameOver, isPaused, level]);

  const renderBoard = () => {
    const displayBoard = board.map((row) => [...row]);
    if (currentPiece) {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell && currentPiece.y + y >= 0) {
            displayBoard[currentPiece.y + y][currentPiece.x + x] =
              currentPiece.color;
          }
        });
      });
    }
    return displayBoard;
  };

  const startGame = () => {
    setBoard(
      Array(BOARD_HEIGHT)
        .fill(null)
        .map(() => Array(BOARD_WIDTH).fill(0))
    );
    setCurrentPiece(createPiece());
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
  };

  const pauseGame = () => {
    setIsPaused((prev) => !prev);
  };

  const resetGame = () => {
    setBoard(
      Array(BOARD_HEIGHT)
        .fill(null)
        .map(() => Array(BOARD_WIDTH).fill(0))
    );
    setCurrentPiece(null);
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setIsPlaying(false);
    setLevel(1);
  };

  return (
    <TetrisContext.Provider
      value={{
        score,
        highScore,
        gameOver,
        renderBoard,
        startGame,
        isPlaying,
        isPaused,
        pauseGame,
        movePiece,
        rotatePiece,
        level,
        resetGame
      }}
    >
      {children}
    </TetrisContext.Provider>
  );
};

export { TetrisProvider };
export default TetrisContext;
