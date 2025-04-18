"use client";
import useRequestInfo from "@/hooks/useRequestInfo";
import React from "react";
import Formulario from "./Formulario";
import Resultado from "./Resultado";

const Vpassport = () => {
  const { resultado, cargando } = useRequestInfo();
  const fondoBase = cargando
    ? "bg-[url('/VPassport/VpassWeb2.webp')] max-sm:bg-[url('/VPassport/VpassPhone2.webp')]"
    : resultado
    ? "bg-[url('/VPassport/VPassWeb.webp')] max-sm:bg-[url('/VPassport/VpassPhone.webp')]"
    : "";

  return (
    <div
      className={`min-h-screen bg-cover bg-center flex items-center justify-center ${fondoBase}`}
    >
      <div className="flex items-center justify-center">
        {cargando ? <Formulario /> : resultado && <Resultado />}
      </div>
    </div>
  );
};

export default Vpassport;
