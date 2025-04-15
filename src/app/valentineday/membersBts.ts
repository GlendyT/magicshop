import { BTSFlowerKey } from "@/types/index";



export const btsImg: Record<BTSFlowerKey, string> = {
  btsflower: "/ValentinesDay/btsflower.webp",
  rmflower: "/ValentinesDay/btsflower.webp",
  jinflower: "/ValentinesDay/btsflower.webp",
  sugaflower: "/ValentinesDay/btsflower.webp",
  jhopeflower: "/ValentinesDay/btsflower.webp",
  jiminflower: "/ValentinesDay/btsflower.webp",
  vflower: "/ValentinesDay/btsflower.webp",
  jungkookflower: "/ValentinesDay/btsflower.webp",
};

const commonStylesDiv1 =
  " relative h-[500px] w-[400px] shadow-lg outline-none focus:outline-none bg-no-repeat bg-contain bg-center";

const commonTextStyles =
  " font-montserrat text-pink-400 text-xs font-bold absolute";
const commonPStyles =
  "font-montserrat text-pink-400 font-bold text-xs absolute";
const commontStyles =
  "font-montserrat text-pink-400 font-bold text-xs absolute";
const commonfStyles =
  "font-montserrat text-pink-400 font-bold text-xs absolute";

export const membersBts = {
  btsflower: {
    div1: `${commonStylesDiv1}`,
    div2: "flex flex-col gap-20",
    div3: `${commonTextStyles} top-[70px] left-[60px] text-pink-600`,
    p: `${commonPStyles} top-[160px] right-[180px] text-pink-600 `,
    to: `${commontStyles} top-[70px] left-[85px] text-pink-600`,
    from: `${commonfStyles} top-[160px] left-[224px] text-pink-600`,
  },
  rmflower: {
    div1: `${commonStylesDiv1}`,
    div2: "flex flex-col gap-20",
    div3: `${commonTextStyles} bottom-[263px] left-[59px] text-pink-600 `,
    p: `${commonPStyles} bottom-[230px] left-[59px] text-pink-600`,
    to: `${commontStyles} bottom-[249px] left-[59px] text-pink-600`,
    from: `${commonfStyles} bottom-[215px] left-[59px] text-pink-600`,
  },
  jinflower: {
    div1: `${commonStylesDiv1}`,
    div2: "flex flex-col gap-20",
    div3: `${commonTextStyles}  top-[205px] right-[139px] text-pink-600 `,
    p: `${commonPStyles}   right-[123px] bottom-[244px]  text-pink-600`,
    to: `${commontStyles} top-[219px] left-[243px] text-pink-600`,
    from: `${commonfStyles} bottom-[230px] left-[245px] text-pink-600`,
  },
  sugaflower: {
    div1: `${commonStylesDiv1}`,
    div2: "flex flex-col gap-20",
    div3: `${commonTextStyles} bottom-[270px] left-[57px] text-pink-600 `,
    p: `${commonPStyles} bottom-[250px] left-[57px] text-pink-600`,
    to: `${commontStyles} bottom-[270px] left-[79px] text-pink-600`,
    from: `${commonfStyles} bottom-[250px] left-[94px] text-pink-600`,
  },
  jhopeflower: {
    div1: `${commonStylesDiv1}`,
    div2: "flex flex-col gap-20",
    div3: `${commonTextStyles} bottom-[110px] right-[210px] text-pink-900   `,
    p: `${commonPStyles} bottom-[95px] right-[195px] text-pink-900 `,
    to: `${commontStyles} bottom-[110px] left-[196px] text-pink-900 `,
    from: `${commonfStyles} bottom-[95px] left-[210px] text-pink-900 `,
  },
  jiminflower: {
    div1: `${commonStylesDiv1}`,
    div2: "flex flex-col gap-20",
    div3: `${commonTextStyles} bottom-[100px] right-[180px] `,
    p: `${commonPStyles} bottom-[80px] right-[165px]  `,
    to: `${commontStyles} bottom-[100px] left-[225px]`,
    from: `${commonfStyles} bottom-[80px] left-[240px] `,
  },
  vflower: {
    div1: `${commonStylesDiv1}`,
    div2: "flex flex-col gap-20",
    div3: `${commonTextStyles} bottom-[150px] right-[192px] `,
    p: `${commonPStyles} bottom-[130px] right-[174px]  `,
    to: `${commontStyles} bottom-[150px] left-[210px] `,
    from: `${commonfStyles} bottom-[130px] left-[230px]`,
  },
  jungkookflower: {
    div1: `${commonStylesDiv1}`,
    div2: "flex flex-col gap-20",
    div3: `${commonTextStyles} top-[160px] right-[146px] text-pink-600 `,
    p: `${commonPStyles}  bottom-[290px] right-[130px] text-pink-600 `,
    to: `${commontStyles} top-[175px] left-[238px] text-pink-600`,
    from: `${commonfStyles} bottom-[275px] left-[239px] text-pink-600 `,
  },
};
