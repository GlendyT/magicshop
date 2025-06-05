import { SugaStyle } from "@/types/index";

const commonDiv1Styles = "flex justify-center aspect-square max-sm:p-4";
const commonTextStyles = "text-sm font-dmmono max-sm:text-xs tracking-tight";
const commonPStyles = "font-dmmono text-right max-sm:text-xs";

export const sugaStyles: SugaStyle[] = [
  {
    id: 1,
    name: "D-Day",
    image: "/Sugaverse/dday.webp",
    style: [
      {
        div1: `${commonDiv1Styles} flex-col relative items-center `,
        div2: "flex flex-col absolute z-20 pb-16 w-68 text-center text-white",
        div3: `${commonTextStyles} font-dmmono `,
        p: `${commonPStyles} pt-6`,
      },
    ],
  },
  {
    id: 2,
    name: "D-2",
    image: "/Sugaverse/d2.webp",
    style: [
      {
        div1: `${commonDiv1Styles} flex-col relative items-center`,
        div2: "flex flex-col absolute z-20 w-68 pl-14 text-white",
        div3: `${commonTextStyles}  font-dmmono text-center`,
        p: `${commonPStyles}  pt-6`,
      },
    ],
  },
  {
    id: 3,
    name: "Agust D",
    image: "/Sugaverse/agustd.webp",
    style: [
      {
        div1: `flex flex-col relative items-center `,
        div2: "bg-black w-full z-20 absolute py-6 px-4 text-white mt-40",
        div3: `${commonTextStyles} font-dmmono  text-justify`,
        p: `${commonPStyles} pt-6`,
      },
    ],
  },
  {
    id: 4,
    name: "People Pt2",
    image: "/Sugaverse/pp2.webp",
    style: [
      {
        div1: `${commonDiv1Styles} flex-col relative items-center`,
        div2: " flex flex-col gap-10 w-56 absolute z-20 pb-20",
        div3: `${commonTextStyles}  font-dmmono text-black text-center`,
        p: `${commonPStyles} text-black `,
      },
    ],
  },
  {
    id: 5,
    name: "Haegum",
    image: "/Sugaverse/hgm.webp",
    style: [
      {
        div1: `${commonDiv1Styles}  flex-col relative items-center`,
        div2: "bg-orange-600 text-white w-full h-auto flex flex-col absolute z-20 px-8 py-2 max-sm:px-2 max-sm:w-82",
        div3: `${commonTextStyles} font-dmmono  bg-orange-600 `,
        p: `${commonPStyles} bg-orange-600 pt-6`,
      },
    ],
  },
  {
    id: 6,
    name: "Yoongi Special Collage",
    image: "/Sugaverse/agustdd.webp",
    style: [
      {
        div1: `${commonDiv1Styles} flex flex-col relative items-center`,
        div2: "flex flex-col w-full max-md:w-96 h-auto absolute z-20 px-4",
        div3: `${commonTextStyles} font-dmmono text-white text-center backdrop-blur-sm bg-black/30 py-2`,
        p: `${commonPStyles} text-white backdrop-blur-sm bg-black/30 `,
      },
    ],
  },
];
