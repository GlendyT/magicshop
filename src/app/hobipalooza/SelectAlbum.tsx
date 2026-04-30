import useRequestInfo from "@/hooks/useRequestInfo";
import SelectUtils from "@/utils/SelectUtils";
import { useEffect, useState } from "react";
import { getHobiGroupedMusic, HobiMusicGroup } from "@/services/hobiAlbums";

const SelectAlbum = () => {
  const { usuario, setUsuario } = useRequestInfo();
  const { diseño, song, name } = usuario;
  const [hobiMusic, setHobiMusic] = useState<HobiMusicGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMusic = async () => {
      setLoading(true);
      const data = await getHobiGroupedMusic();
      setHobiMusic(data);
      setLoading(false);
    };
    loadMusic();
  }, []);

  // Buscar el álbum por nombre (el select guarda el name como string)
  const selectedAlbum = hobiMusic.find((album) => album.name === diseño);

  const songOptions =
    selectedAlbum?.songs.map((s) => ({
      id: s.id,
      name: s.title,
    })) || [];

  const commonstyleSelect =
    "appearance-none rounded transition-all border-white border bg-white placeholder:text-gray-400 text-black w-full py-2 px-3 text-center  border-white  disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed";

  // Reset song when album changes
  useEffect(() => {
    if (diseño && song) {
      // Verificar si la canción actual existe en el álbum seleccionado
      const songExists = songOptions.find((option) => option.name === song);
      if (!songExists) {
        setUsuario({ ...usuario, song: "" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diseño, songOptions]);

  return (
    <div className="flex flex-col gap-2">
      <SelectUtils
        id="diseño"
        name="diseño"
        value={diseño}
        options={hobiMusic}
        disabled={!name || loading}
        placeholder={loading ? "Loading albums..." : "Choose your favorite"}
        className={`${commonstyleSelect}`}
      />

      <SelectUtils
        id="song"
        name="song"
        value={song || ""}
        options={songOptions}
        disabled={!diseño || loading}
        placeholder={selectedAlbum ? "Choose a Song" : "Select an album first"}
        className={`${commonstyleSelect} mb-3`}
      />
    </div>
  );
};

export default SelectAlbum;
