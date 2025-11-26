"use client";

import html2canvas from "html2canvas-pro";
import { createContext } from "react";
import { AllProviderProps, DownloadContextType } from "../types";

export const DownloadContext = createContext<DownloadContextType>(null!);

export const DownloadProvider = ({ children }: AllProviderProps) => {
  const handleDownloadImage = async () => {
    const element = document.getElementById("print");

    if (!element) {
      return;
    }
    
    // Pequeña espera adicional para asegurar el renderizado
    await new Promise(resolve => setTimeout(resolve, 100));

    const options = {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: null,
      removeContainer: true,
      onclone: (clonedDoc: Document) => {
        const clonedElement = clonedDoc.getElementById("print");
        if (clonedElement) {
          // Forzar el estilo de fuente en el elemento clonado
          clonedElement.style.fontFamily = getComputedStyle(element).fontFamily;
        }
      },
    };
    const canvas = await html2canvas(element, options);
    const data = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.href = data;
    link.download = "BTS+ARMY";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DownloadContext.Provider value={{ handleDownloadImage }}>
      {children}
    </DownloadContext.Provider>
  );
};
