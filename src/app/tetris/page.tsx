"use client";
import useRequestInfo from "@/hooks/useRequestInfo";
import Formulario from "./Formulario";
import Resultado from "./Resultado";
import { tiny } from "@/utils/Fonts";

const Tetris = () => {
  const { cargando, resultado } = useRequestInfo();
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 from-20% via-slate-800 via-60% to-slate-950 to-100% ${tiny.className}`}
    >
      <div className="flex flex-col items-center justify-center">
        {cargando ? <Formulario /> : resultado && <Resultado />}
      </div>
    </div>
  );
};

export default Tetris;
