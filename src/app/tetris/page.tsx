"use client";
import useRequestInfo from "@/hooks/useRequestInfo";
import Formulario from "./Formulario";
import Resultado from "./Resultado";

const Tetris = () => {
  const { cargando, resultado } = useRequestInfo();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-950 from-10% via-slate-950 via-50% to-black to-90%"> 
      <div className="flex flex-col items-center justify-center">
        <div
          className={`rounded-xl backdrop-blur-md `}
        >

        </div>
        {cargando ? <Formulario /> : resultado && <Resultado />}
      </div>
    </div>
  );
};

export default Tetris;
