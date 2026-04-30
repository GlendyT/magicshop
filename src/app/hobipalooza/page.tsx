"use client";
import useRequestInfo from "@/hooks/useRequestInfo";
import Formulario from "./Formulario";
import Resultado from "./Resultado";
import { getHOBIAlbums } from "@/services/hobiAlbums";
import { useEffect } from "react";

const Hobipalooza = () => {
  const { resultado, cargando, generateAlbumHobiList, setAlbums } =
    useRequestInfo();

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const albums = await getHOBIAlbums();
        const albumOptions = albums.map((album) => ({
          id: album.id,
          name: album.name,
        }));
        setAlbums(albumOptions);
      } catch (error) {
        console.error("Error loading albums:", error);
      }
    };
    loadAlbums();
  }, [setAlbums]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-hobipalooza ">
      <div className="flex flex-col items-center">
        {cargando ? <Formulario /> : resultado && <Resultado />}
      </div>
    </div>
  );
};

export default Hobipalooza;
