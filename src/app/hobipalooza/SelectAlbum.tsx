import useRequestInfo from "@/hooks/useRequestInfo";
import { hobiMusic } from "./Data/hobiMusic";
import SelectUtils from "@/utils/SelectUtils";
import { useEffect } from "react";

const SelectAlbum = () => {
  const { usuario, setUsuario } = useRequestInfo();
  const { diseño, song, name } = usuario;
  
  // Buscar el álbum por ID (el select guarda el id como string)
  const selectedAlbum = hobiMusic.find((album) => album.id === Number(diseño));
  
  const songOptions =
    selectedAlbum?.songs.map((song) => ({
      id: song.id,
      name: song.title,
    })) || [];
  
  const commonstyleSelect =
    "appearance-none rounded transition-all border-white border bg-white placeholder:text-gray-400 text-black w-full py-2 px-3 text-center  border-white  disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed";
  
  // Reset song when album changes
  useEffect(() => {
    if (diseño && song) {
      // Verificar si la canción actual existe en el álbum seleccionado
      const songExists = songOptions.find((option) => option.id === Number(song));
      if (!songExists) {
        setUsuario({ ...usuario, song: "" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diseño]);

  return (
    <div className="flex flex-col gap-2">
      <SelectUtils
        id="diseño"
        name="diseño"
        value={diseño}
        options={hobiMusic}
        disabled={!name}
        placeholder="Choose your favorite"
        className={`${commonstyleSelect}`}
        
      />

      <SelectUtils
        id="song"
        name="song"
        value={song || ""}
        options={songOptions}
        disabled={!diseño}
        placeholder={selectedAlbum ? "Choose a Song" : "Select an album first"}
        className={`${commonstyleSelect} mb-3`}
        
      />
    </div>
  );
};

export default SelectAlbum;
