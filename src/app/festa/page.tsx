"use client";
import React from 'react'
import Formulario from './Formulario'
import Resultado from './Resultado';
import useRequestInfo from '@/hooks/useRequestInfo';

export default function page() {

   const { resultado, cargando } = useRequestInfo()
    
  const backFesta2025 = cargando
    ? "bg-[url('/Festa2025/festa_2025.webp')] max-sm:bg-[url('/Festa2025/hobis_discharge_app_bg_mobile.webp')] bg-cover bg-center bg-no-repeat"
    : resultado
    ? "bg-[url('/Festa2025/festa_2025.webp')] max-sm:bg-[url('/Festa2025/hobis_discharge_2_app_bg_mobile.webp')] bg-cover bg-center bg-no-repeat"
    : "";
   return (
    <div
      className={`min-h-screen flex items-center justify-center ${backFesta2025}`}>
        <div className='flex flex-col items-center gap-2'>

           {cargando ? <Formulario /> : resultado && <Resultado />}
                
        </div>
    </div>
  )
}
