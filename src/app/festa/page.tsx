"use client";
import React from 'react'
import Formulario from './Formulario'
import Resultado from './Resultado';
import useRequestInfo from '@/hooks/useRequestInfo';

export default function Festa() {

   const { resultado, cargando } = useRequestInfo()
    
  const backFesta2025 = cargando
    ? "bg-[url('/Festa2025/bangtan_bg_desktop_ver.webp')] max-sm:bg-[url('/Festa2025/bangtan_bg_mobile_ver.webp')] bg-cover bg-center bg-no-repeat"
    : resultado
    ? "bg-[url('/Festa2025/bangtan_bg_desktop_ver.webp')] max-sm:bg-[url('/Festa2025/bangtan_bg_mobile_ver.webp')] bg-cover bg-center bg-no-repeat"
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
