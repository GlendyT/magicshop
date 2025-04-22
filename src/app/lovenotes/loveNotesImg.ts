import { LoveNotesTypes } from "@/types/index";

const commonStylesDiv1 = " relative h-[500px] w-[400px] shadow-lg ";

const commonStylesDiv2 =
  "flex flex-col gap-20 text-pink-600 font-montserrat text-xs ";

const commonStylesDiv3 = " font-extrabold flex absolute";
const commonPStyles = "  font-extrabold flex  absolute";
const commonToStyles = "  font-bold ";
const commonFromStyles = "  font-bold  ";

export const loveNotesImg: LoveNotesTypes[] = [
  {
    id: 1,
    name: "BTS",
    image: "/LoveNotes/btsflower.webp",
    style: [
      {
        div1: `${commonStylesDiv1}`,
        div2: `${commonStylesDiv2}`,
        div3: `${commonStylesDiv3} top-[70px] left-[60px]  gap-1 `,
        p: `${commonPStyles} top-[160px] right-[140px]  gap-1  `,
        to: `${commonToStyles}top-[70px] left-[85px] `,
        from: `${commonFromStyles} left-9`,
      },
    ],
  },
  {
    id: 2,
    name: "Namjoon",
    image: "/LoveNotes/rmflower.webp",
    style: [
      {
        div1: `${commonStylesDiv1}`,
        div2: `${commonStylesDiv2}`,
        div3: `${commonStylesDiv3}  bottom-[243px] left-[59px]  flex-col`,
        p: `${commonPStyles} bottom-[200px] left-[59px]  flex-col`,
        to: `${commonToStyles} `,
        from: `${commonFromStyles} bottom-[215px] left-[59px] `,
      },
    ],
  },
  {
    id: 3,
    name: "Seokjin",
    image: "/LoveNotes/jinflower.webp",
    style: [
      {
        div1: `${commonStylesDiv1}`,
        div2: `${commonStylesDiv2}`,
        div3: `${commonStylesDiv3} top-[205px] right-[60px]  flex-col  `,
        p: `${commonPStyles}  right-[30px] bottom-[220px]  flex-col `,
        to: `${commonToStyles}top-[219px] left-[243px] `,
        from: `${commonFromStyles} bottom-[230px] left-[245px] `,
      },
    ],
  },
  {
    id: 4,
    name: "Yoongi",
    image: "/LoveNotes/sugaflower.webp",
    style: [
      {
        div1: `${commonStylesDiv1}`,
        div2: `${commonStylesDiv2}`,
        div3: `${commonStylesDiv3}  bottom-[270px] left-[57px]  gap-1 `,
        p: `${commonPStyles} bottom-[250px] left-[57px]  gap-1 `,
        to: `${commonToStyles} bottom-[270px] left-[79px] `,
        from: `${commonFromStyles} bottom-[250px] left-[94px] `,
      },
    ],
  },
  {
    id: 5,
    name: "Hoseok",
    image: "/LoveNotes/jhopeflower.webp",
    style: [
      {
        div1: `${commonStylesDiv1}`,
        div2: `${commonStylesDiv2} text-pink-900`,
        div3: `${commonStylesDiv3} bottom-[110px] right-[55px]   gap-1  `,
        p: `${commonPStyles}   bottom-[95px] right-[55px]  gap-1 `,
        to: `${commonToStyles} bottom-[110px] left-[196px] `,
        from: `${commonFromStyles} bottom-[95px] left-[210px] `,
      },
    ],
  },
  {
    id: 6,
    name: "Jimin",
    image: "/LoveNotes/jiminflower.webp",
    style: [
      {
        div1: `${commonStylesDiv1}`,
        div2: `${commonStylesDiv2}`,
        div3: `${commonStylesDiv3} bottom-[100px] right-[80px]  gap-1 text-pink-400`,
        p: `${commonPStyles} bottom-[80px] right-[65px]  gap-1 text-pink-400`,
        to: `${commonToStyles} bottom-[100px] left-[225px]`,
        from: `${commonFromStyles} bottom-[80px] left-[240px] `,
      },
    ],
  },
  {
    id: 7,
    name: "Taehyung",
    image: "/LoveNotes/vflower.webp",
    style: [
      {
        div1: `${commonStylesDiv1}`,
        div2: `${commonStylesDiv2}`,
        div3: `${commonStylesDiv3} bottom-[150px] right-[92px]  gap-1 text-pink-400 `,
        p: `${commonPStyles}  bottom-[130px] right-[74px]  gap-1 text-pink-400`,
        to: `${commonToStyles} bottom-[150px] left-[210px] `,
        from: `${commonFromStyles} bottom-[130px] left-[230px]`,
      },
    ],
  },
  {
    id: 8,
    name: "JungKook",
    image: "/LoveNotes/jungkookflower.webp",
    style: [
      {
        div1: `${commonStylesDiv1}`,
        div2: `${commonStylesDiv2}`,
        div3: `${commonStylesDiv3}  top-[160px] right-[86px]  flex-col `,
        p: `${commonPStyles} bottom-[270px] right-[50px]  flex-col `,
        to: `${commonToStyles} top-[175px] left-[238px] `,
        from: `${commonFromStyles} bottom-[275px] left-[239px]  `,
      },
    ],
  },
];
