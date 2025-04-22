"use client"
import useRequestInfo from "@/hooks/useRequestInfo";
import Formulario from "./Formulario";
import Resultado from "./Resultado";

const Lovenotes = () => {
  const { resultado, cargando } = useRequestInfo();
  return (
    <div className="flex justify-center items-center min-h-screen bg-lovenotes">
      <div className="flex flex-col items-center">
        {cargando ? <Formulario /> : resultado && <Resultado />}
      </div>
    </div>
  );
};

export default Lovenotes;
