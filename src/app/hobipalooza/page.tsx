"use client";
import useRequestInfo from "@/hooks/useRequestInfo";
import Formulario from "./Formulario";
import Resultado from "./Resultado";

const Hobipalooza = () => {
  const {resultado, cargando } = useRequestInfo()
  return (
    <div className="min-h-screen flex justify-center items-center bg-hobipalooza ">
      <div className="flex flex-col items-center">
        {cargando ? <Formulario /> : resultado && <Resultado/>}
      </div>
    </div>
  );
};

export default Hobipalooza;
