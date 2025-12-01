import { birthdayCardType } from "@/types/index";

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const SHAPES = [
  [[1, 1, 1, 1]], // I
  [
    [1, 1],
    [1, 1],
  ], // O
  [
    [0, 1, 0],
    [1, 1, 1],
  ], // T
  [
    [0, 1, 1],
    [1, 1, 0],
  ], // S
  [
    [1, 1, 0],
    [0, 1, 1],
  ], // Z
  [
    [1, 0, 0],
    [1, 1, 1],
  ], // J
  [
    [0, 0, 1],
    [1, 1, 1],
  ], // L
];

export const colors = [
  "#000000",
  "#cb8458",
  "#e3a1c2",
  "#88d7f7",
  "#f7ea00",
  "#f2f2f2",
  "#d3bfda",
  "#f03935",
];

export const BirthdayCards: birthdayCardType[] = [
  {
    id: 1,
    name: "Jeon Jungkook",
    aka: "Jungkook",
    shortAka: "JK",
    date: new Date(1997, 8, 1),
    birthdaycard: "/Tetris/JK.webp",
  },
  {
    id: 2,
    name: "Kim Namjoon",
    aka: "RM",
    shortAka: "RM",
    date: new Date(1994, 8, 12),
    birthdaycard: "/Tetris/RM.webp",
  },
  {
    id: 3,
    name: "Park Jimin",
    aka: "Jimin",
    shortAka: "JM",
    date: new Date(1995, 9, 13),
    birthdaycard: "/Tetris/JM.webp",
  },
  {
    id: 4,
    name: "Kim Seokjin",
    aka: "Jin",
    shortAka: "JN",
    date: new Date(1992, 11, 4),
    birthdaycard: "/Tetris/JIN.webp",
  },
  {
    id: 5,
    name: "Kim Taehyung",
    aka: "V",
    shortAka: "V",
    date: new Date(1995, 11, 30),
    birthdaycard: "",
  },
  {
    id: 6,
    name: "Jung Hoseok",
    aka: "J-Hope",
    shortAka: "JH",
    date: new Date(1994, 1, 18),
    birthdaycard: "",
  },
  {
    id: 7,
    name: "Min Yoongi",
    aka: "Suga",
    shortAka: "SG",
    date: new Date(1993, 2, 9),
    birthdaycard: "",
  },
];
