"use client";
import useRequestInfo from "@/hooks/useRequestInfo";
import React from "react";
import Formulario from "./Formulario";
import Resultado from "./Resultado";

const Sugaverse = () => {
  const { resultado, cargando } = useRequestInfo();
  return (
    <div className="min-h-screen flex justify-center items-center bg-sugaverse">
      <div className="flex flex-col items-center ">
        {cargando ? <Formulario /> : resultado && <Resultado />}
      </div>
    </div>
  );
};

export default Sugaverse;
