"use client";
import useRequestInfo from "@/hooks/useRequestInfo";
import Formulario from "./Formulario";
import Resultado from "./Resultado";
import { tiny } from "@/utils/Fonts";

const Tetris = () => {
  const { cargando, resultado, isMobile } = useRequestInfo();

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isMobile ? "bg-tetris5 " : "bg-tetris4"
      } ${tiny.className}  `}
    >
      <div className="flex flex-col min-h-screen w-full items-center justify-center bg-black/30">
        {cargando ? <Formulario /> : resultado && <Resultado />}

        
        {/* <Resultado /> */}
      </div>
    </div>
  );
};

export default Tetris;
