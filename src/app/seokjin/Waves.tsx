import Image from "next/image";


const Waves = () => {
  return (
    <div className="header">
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 170 25"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-20 88-20s58 20 88 20 58-20 88-20 58 20 88 20 v44h-352z"
          />
        </defs>
        <g className="parallax">
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(255,255,255,0.7)"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(16, 74, 189, 0.5)"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="5"
            fill="rgba(132, 170, 246, 0.5)"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="7"
            fill="rgba(68, 226, 219, 0.3)"
          />
          <use xlinkHref="#gentle-wave" x="48" y="15" fill="#0e5c94" />
          <use xlinkHref="#gentle-wave" x="48" y="19" fill="#012d51" />
        </g>
      </svg>
      <div className="fish">
        <Image
          src="/FishJin/fish1.webp"
          alt="fishjin1"
          width={600}
          height={600}
        />
        <Image
          src="/FishJin/fish2.webp"
          alt="fishjin1"
          width={185}
          height={185}
        />
        <Image
          src="/FishJin/fish3.webp"
          alt="fishjin1"
          width={185}
          height={185}
        />
      </div>
    </div>
  );
};

export default Waves;
