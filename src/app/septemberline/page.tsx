"use client";
import useRequestInfo from "@/hooks/useRequestInfo";
import React from "react";
import Formulario from "./Formulario";
import Resultado from "./Resultado";

const SeptemberLine = () => {
  const { resultado, cargando } = useRequestInfo();


  return (
    <div
      className={`min-h-screen flex items-center justify-center  bg-septemberline  bg-center bg-cover bg-no-repeat`}
    >
      <div className="flex flex-col items-center justify-center">
        {cargando ? <Formulario /> : resultado && <Resultado />}
      </div>
    </div>
  );
};

export default SeptemberLine;