import { PassportDetailsProps } from "@/types/index";
import { michroma } from "@/utils/Fonts";

const PassportDetails = ({ items }: PassportDetailsProps) => {
  return (
    <div
      className={`flex flex-col gap-5 max-lg:gap-2 max-sm:gap-0 text-[0.6rem] max-xl:text-[0.6rem] max-md:text-[0.5rem] max-sm:text-[0.3rem] max-lg:text-[0.7rem] ${michroma.className}`}
    >
      {items.map(({ label, value }, index) => (
        <span key={index} className="font-normal text-violet-950 flex flex-col">
          {label}
          <span className="font-extrabold">{value}</span>
        </span>
      ))}
    </div>
  );
};

export default PassportDetails;
