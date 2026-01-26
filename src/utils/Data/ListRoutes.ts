import { LinkRoutesTypes } from "@/types/index";

export const LinkRoutes: LinkRoutesTypes[] = [
  // {
  //   id: 1,
  //   name: "Home",
  //   path: "/",
  //   image: "/Polaroid/Only-graphic-darkpurple.webp",
  // },
  {
    id: 2,
    name: "Polaroid",
    path: "/polaroid",
    image: "/Logos/polaroid.webp",
  },
  {
    id: 3,
    name: "Photobooth",
    path: "/photobooth",
    image: "/Logos/photostrip.webp",
  },
  {
    id: 4,
    name: "Sugaverse",
    path: "/sugaverse",
    image: "/Logos/sugaverse (4).webp",
  },
  {
    id: 5,
    name: "Hobipalooza",
    path: "/hobipalooza",
    image: "/Logos/hobipalloza (1).webp",
  },
  {
    id: 6,
    name: "VPassport",
    path: "/vpassport",
    image: "/Logos/vpassport.webp",
  },
  {
    id: 7,
    name: "Hobisback",
    path: "/hopeisback",
    image: "/Logos/hopedischarge.webp",
  },
  {
    id: 8,
    name: "(V)irthday",
    path: "/(V)irthday",
    image: "/Logos/virthday.webp",
  },
  {
    id: 9,
    name: "Love Notes",
    path: "/lovenotes",
    image: "/Logos/Valentin.webp",
  },
  {
    id: 10,
    name: "Seokjin",
    path: "/seokjin",
    image: "/Logos/jinlogo.webp",
  },
  {
    id: 11,
    name: "RPS",
    path: "/rps",
    image: "/Logos/RPS.webp",
  },
  {
    id: 12,
    name: "Festa",
    path: "/festa",
    image: "/Logos/festa2025.webp",
  },
  {
    id: 13,
    name: "Tetris",
    path: "/tetris",
    image: "/Logos/btstetris.webp",
  },
  {
    id: 14,
    name: "Bingo",
    path: "/bingo",
    image: "/Logos/1B.webp",
  },
  {
    id: 15,
    name: "Spotify",
    path: "/spotify",
    image: "/Logos/spotify.webp",
    subroutes: [
      {
        id: 1,
        name: "Playlist Generator",
        path: "/spotify/playlist",
        image: "/Logos/spotify.webp",
      },
    ],
  },
  // {
  //   id: 16,
  //   name: "Fortune Cookie",
  //   path: "/fortunecookie",
  //   image: "/Logos/polaroid.webp",
  // },
  {
    id: 17,
    name: "ARIRANG",
    path: "/arirang",
    image: "/Logos/arirang.png",
  },
];
