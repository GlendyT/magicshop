import css from "styled-jsx/css";
import { PLAYER_0, PLAYER_X } from "./constants";

export const switchPlayer = (player: number) => {
  return player === PLAYER_X ? PLAYER_0 : PLAYER_X;
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const border = css`
  border-radius: 255px 15px 255px 15px / 15px 255px 15px;
  border: 2px solid #41403e;
`;
