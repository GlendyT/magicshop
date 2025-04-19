"use client";
import useRequestInfo from "@/hooks/useRequestInfo";
import Formulario from "./Formulario";
import Resultado from "./Resultado";
import Modal from "./Modal";

const HopeisBack = () => {
  const { cargando, resultado, showModal, isMobile } = useRequestInfo();

  const backHobiDischarge = cargando
    ? "bg-[url('/HobiDischarge/hobis_discharge_abb_bg_desktop.webp')] max-sm:bg-[url('/HobiDischarge/hobis_discharge_app_bg_mobile.webp')]"
    : resultado
    ? "bg-[url('/HobiDischarge/hobis_discharge_2_app_bg_desktop.webp')] max-sm:bg-[url('/HobiDischarge/hobis_discharge_2_app_bg_mobile.webp')]"
    : "";
  return (
    <div
      className={`min-h-screen flex items-center justify-center ${backHobiDischarge} bg-cover bg-center bg-no-repeat ${
        isMobile ? "pt1" : "pt16"
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        {cargando ? <Formulario /> : resultado && <Resultado />}{" "}
        {showModal ? <Modal /> : null}
      </div>
    </div>
  );
};

export default HopeisBack;
