"use client";
import useRequestInfo from "@/hooks/useRequestInfo";
import React from "react";
import Formulario from "./Formulario";
import Resultado from "./Resultado";

const Vpassport = () => {
  const { resultado, cargando, isMobile } = useRequestInfo();
  const fondoBase = cargando
    ? "bg-[url('/VPassport/VpassWeb2.webp')] max-sm:bg-[url('/VPassport/VpassPhone2.webp')] bg-cover bg-center bg-no-repeat"
    : resultado
    ? "bg-[url('/VPassport/VPassWeb.webp')] max-sm:bg-[url('/VPassport/VpassPhone.webp')] bg-cover bg-center bg-no-repeat"
    : "";

  return (
    <div
      className={`min-h-screen  flex items-center justify-center ${fondoBase} ${
        isMobile ? "pt1" : "pt16"
      }`}
    >
      <div className="flex flex-col items-center  justify-center">
        {cargando ? <Formulario /> : resultado && <Resultado />}
      </div>
    </div>
  );
};

export default Vpassport;
