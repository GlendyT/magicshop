import { GameModeKey, GameModeValue, PlayerOptions } from "@/types/index";

export const DIMENSIONS = 3;
export const DRAW = 0;
export const PLAYER_X = 1;
export const PLAYER_0 = 2;

export const playerOptions: PlayerOptions[] = [
  { value: PLAYER_X, label: "X", id: 1, name: "X" },
  { value: PLAYER_0, label: "0", id: 2, name: "0" },
];
export const SCORES: Record<string, number> = {
  1: 1,
  0: 0,
  2: -1,
};

export const SQUARE_DIMS = 100;
export const GAME_STATES = {
  notStarted: "not_started",
  inProgress: "in_progress",
  over: "over",
} as const;

export type GameState = (typeof GAME_STATES)[keyof typeof GAME_STATES];

export const GAME_MODES: Record<GameModeKey, GameModeValue> = {
  easy: "easy",
  medium: "medium",
  difficult: "difficult",
};

export const gameModeOptions: { id: GameModeKey; name: string }[] = [
  { id: "easy", name: "Easy" },
  { id: "medium", name: "Medium" },
  { id: "difficult", name: "Difficult" },
];
