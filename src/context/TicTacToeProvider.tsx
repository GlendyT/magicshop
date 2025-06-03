"use client";

import {
  ChangeEvent,
  createContext,
  CSSProperties,
  useCallback,
  useEffect,
  useState,
} from "react";
import { TicTacToeContextType, TicTacToeProviderProps } from "../types/index";
import {
  DIMENSIONS,
  DRAW,
  GAME_MODES,
  GAME_STATES,
  GameState,
  PLAYER_0,
  PLAYER_X,
  SQUARE_DIMS,
} from "@/tictactoe/Data/constants";
import Board from "@/tictactoe/Board";
import { getRandomInt, switchPlayer } from "@/tictactoe/Data/utils";
import { minimax } from "@/tictactoe/Data/minimax";

const TicTacToeContext = createContext<TicTacToeContextType>(null!);

const makeEmptyGrid = () => Array(DIMENSIONS ** 2).fill(null);
const board = new Board();

const TicTacToeProvider = ({ children }: TicTacToeProviderProps) => {
  const [players, setPlayers] = useState<Record<string, number | null>>({
    human: null,
    ai: null,
  });
  const [gameState, setGameState] = useState<GameState>(GAME_STATES.notStarted);
  const [grid, setGrid] = useState<Array<number | null>>(makeEmptyGrid());
  const [winner, setWinner] = useState<string | null>(null);
  const [nextMove, setNextMove] = useState<null | number>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [playerChoice, setPlayerChoice] = useState<number | null>(null);
  const [mode, setMode] = useState(GAME_MODES.medium);

  useEffect(() => {
    const boardWinner = board.getWinner(grid);

    const declareWinner = (winner: number) => {
      let winnerStr;
      switch (winner) {
        case PLAYER_X:
          winnerStr = "Player X wins!";
          break;
        case PLAYER_0:
          winnerStr = "Player 0 wins!";
          break;
        case DRAW:
        default:
          winnerStr = "It´s a draw";
      }
      setGameState(GAME_STATES.over);
      setWinner(winnerStr);

      setTimeout(() => setModalOpen(true), 300);
    };

    if (boardWinner !== null && gameState !== GAME_STATES.over) {
      declareWinner(boardWinner);
    }
  }, [gameState, grid, nextMove]);

  const move = useCallback(
    (index: number, player: number | null) => {
      if (player !== null && gameState === GAME_STATES.inProgress) {
        setGrid((grid) => {
          const gridCopy = grid.concat();
          gridCopy[index] = player;
          return gridCopy;
        });
      }
    },
    [gameState]
  );

  const aiMove = useCallback(() => {
    const board = new Board(grid.concat());
    const emptyIndices = board.getEmptySquares(grid);
    let index;
    switch (mode) {
      case GAME_MODES.easy:
        do {
          index = getRandomInt(0, 8);
        } while (!emptyIndices.includes(index));
        break;

      case GAME_MODES.medium:
        const smartMove = !board.isEmpty(grid) && Math.random() < 0.5;
        if (smartMove) {
          index = minimax(board, players.ai!)[1];
        } else {
          do {
            index = getRandomInt(0, 8);
          } while (!emptyIndices.includes(index));
        }
        break;
      case GAME_MODES.difficult:
      default:
        index = board.isEmpty(grid)
          ? getRandomInt(0, 8)
          : minimax(board, players.ai!)[1];
    }
    if (index !== null && !grid[index]) {
      if (players.ai !== null) {
        move(index, players.ai);
      }
      setNextMove(players.human);
    }
  }, [move, grid, players, mode]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (
      nextMove !== null &&
      nextMove === players.ai &&
      gameState !== GAME_STATES.over
    ) {
      timeout = setTimeout(() => {
        aiMove();
      }, 500);
    }
    return () => timeout && clearTimeout(timeout);
  }, [nextMove, aiMove, players.ai, gameState]);

  const humanMove = (index: number) => {
    if (!grid[index] && nextMove === players.human) {
      move(index, players.human);
      setNextMove(players.ai);
    }
  };

  const choosePlayer = (option: number) => {
    setPlayers({ human: option, ai: switchPlayer(option) });
    setGameState(GAME_STATES.inProgress);
    setNextMove(PLAYER_X);
    setPlayerChoice(option);
  };

  const startNewGame = () => {
    setGrid(makeEmptyGrid());
    setGameState(GAME_STATES.inProgress);
    setWinner(null);
    setNextMove(PLAYER_X);
    setModalOpen(false);
  };

  const startAll = () => {
    startNewGame();
    setGameState(GAME_STATES.notStarted);
  };

  const changeMode = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setMode(
      e.target.value as
        | typeof GAME_MODES.easy
        | typeof GAME_MODES.medium
        | typeof GAME_MODES.difficult
    );
  };

  const containerWidth = DIMENSIONS * (SQUARE_DIMS + 2);

  const strikeStyles: CSSProperties =
    gameState === GAME_STATES.over ? board.getStriketrhoughStyles() ?? {} : {};

  return (
    <TicTacToeContext.Provider
      value={{
        humanMove,
        choosePlayer,
        startNewGame,
        changeMode,
        winner,
        modalOpen,
        setModalOpen,
        gameState,
        GAME_STATES,
        GAME_MODES,
        mode,
        PLAYER_0,
        PLAYER_X,
        grid,
        setGrid,
        SQUARE_DIMS,
        players,
        setPlayers,
        setGameState,
        setWinner,
        setNextMove,
        nextMove,
        containerWidth,
        strikeStyles,
        startAll,
        playerChoice,
        setPlayerChoice
      }}
    >
      {children}
    </TicTacToeContext.Provider>
  );
};

export { TicTacToeProvider };

export default TicTacToeContext;
