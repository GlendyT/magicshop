import Image from "next/image";

type LogoProps = {
  backgroundImage: string | null;
};

const Logo = ({ backgroundImage }: LogoProps) => {
  return (
    <div
      className={`pt-2  border-4 w-40 h-36 max-sm:pb-2 max-sm:w-40 ${
        backgroundImage ? "border-none" : "border-white border-solid"
      }`}
    >
      {backgroundImage ? (
        ""
      ) : (
        <Image
          src="/Photobooth/festa_logo2.webp"
          alt="logoarmy"
          width={196}
          height={196}
        />
      )}
    </div>
  );
};

export default Logo;
