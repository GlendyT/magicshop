"use client";
import useRequestInfo from "@/hooks/useRequestInfo";
import Formulario from "./Formulario";
import CardRPS from "./CardRPS";
import { rock } from "@/utils/Fonts";

const RPS = () => {
  const { cargando, resultado } = useRequestInfo();

  return (
    <div className="min-h-screen flex items-center justify-center bg-rps ">
      <div className="flex flex-col items-center justify-center ">
        <div
          className={`rounded-xl bg-purple-100/25 backdrop-blur-md shadow-lg ${rock.className}`}
        >
          <h1 data-testid="title" className="text-2xl max-md:text-xl pt-6 text-center font-extrabold uppercase max-sm:text-xs pb-2">
            Let´s play
          </h1>
          {cargando ? <Formulario /> : resultado && <CardRPS />}
        </div>
      </div>
    </div>
  );
};

export default RPS;
