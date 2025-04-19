import Image from "next/image";
import useRequestInfo from "@/hooks/useRequestInfo";
import PassportDetails from "./PassportDetails";

const Passport = () => {
  const { usuario, stamp } = useRequestInfo();
  const { name } = usuario;
  return (
    <div className="shadow-md rounded-xl w-full h-full relative">
      <Image
        src="/VPassport/Passport Image Generated Right Side.webp"
        alt="vpassport"
        width={185}
        height={185}
        className="w-96 h-auto"
        layout="responsive"
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-start pt-14 justify-center">
        <div className=" flex flex-col pr-8 max-sm:pr-3 px-2">
          <p className="flex text-center items-center justify-center font-extrabold pb-4 text-md uppercase max-sm:pb-0 max-sm:text-[0.6rem]">
            Republic of ARMY
          </p>
          <div className="flex flex-row-2 pt-4 gap-2 pl-6 max-sm:pl-0 max-sm:gap-1">
            <PassportDetails
              items={[
                { label: "Surname/Apellidos", value: "BORAHE" },
                { label: "Nacionality/Nacionalidad", value: "ARMY" },
                {
                  label: "VisaType/TipodeVisa",
                  value: "Permanent/Permanente",
                },
              ]}
            />

            <PassportDetails
              items={[
                { label: "Names/Nombre", value: name },
                { label: "PlaceofBirth/LugardeNacimiento", value: "KOREA" },
                {
                  label: "PassportNo/No.dePassaporte",
                  value: "tvh-31-12-1995",
                },
              ]}
            />
          </div>
          <div className="flex flex-col w-full items-center justify-center pt-4 max-lg:gap-2 max-sm:gap-0 text-[0.7rem] max-xl:text-[0.6rem] max-md:text-[0.5rem] max-sm:text-[0.4rem] max-lg:text-[0.7rem]">
            <p className="font-normal text-violet-950  flex flex-col ">
              DateofBirth/FechadeNacimiento
              <span className=" font-extrabold ">13/06/20213</span>
            </p>
          </div>
        </div>
      </div>
      <div className=" rotate-90 absolute bottom-32 max-sm:hidden">
        <Image
          src={stamp}
          alt="vpassport"
          width={185}
          height={185}
          className=" relative px-14 w-72"
        />
      </div>
    </div>
  );
};

export default Passport;
