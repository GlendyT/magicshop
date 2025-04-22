"use client";
import useRequestInfo from "@/hooks/useRequestInfo";
import Formulario from "./Formulario";
import CardRPS from "./CardRPS";

const RPS = () => {
  const { cargando, resultado } = useRequestInfo();

  return (
    <div className="min-h-screen bg-center bg-cover bg-rps">
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-xl bg-purple-100/25 backdrop-blur-md shadow-lg">
          <h1 className="text-3xl max-md:text-xl pt-6 text-center font-extrabold uppercase">
            Let´s play
          </h1>
          {cargando ? <Formulario /> : resultado && <CardRPS />}
        </div>
      </div>
    </div>
  );
};

export default RPS;
