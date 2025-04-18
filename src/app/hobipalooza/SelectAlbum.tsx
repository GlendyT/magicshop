import useRequestInfo from "@/hooks/useRequestInfo";
import { hobiMusic } from "./Data/hobiMusic";

const SelectAlbum = () => {
  const { usuario, usuarioGenerado } = useRequestInfo();
  const { diseño, song, name } = usuario;
  const selectedAlbum = hobiMusic.find((album) => album.name === diseño);
  const commonstyleSelect =
    "appearance-none rounded transition-all border-white border bg-white placeholder:text-gray-400 text-black w-full py-2 px-3 text-center  border-white  disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed";
  const commonstyleOption = "text-black placeholder:text-gray-400";
  return (
    <div className="flex flex-col gap-6">
      <select
        id="diseño"
        name="diseño"
        value={diseño}
        onChange={usuarioGenerado}
        className={`${commonstyleSelect}`}
        disabled={!name}
      >
        <option value="" className="text-gray-500">
          Choose your favorite
        </option>
        {hobiMusic.map((hobi) => (
          <option
            key={hobi.id}
            value={hobi.name}
            className={`${commonstyleOption}`}
          >
            {hobi.name}
          </option>
        ))}
      </select>

      <select
        id="song"
        name="song"
        value={song}
        onChange={usuarioGenerado}
        className={`${commonstyleSelect}`}
        disabled={!diseño}
      >
        <option value="" className="text-gray-500">
          {selectedAlbum ? "Choose a Song" : "Select an album first"}
        </option>
        {selectedAlbum?.songs.map((hobiSong) => (
          <option
            key={hobiSong.id}
            value={hobiSong.title}
            className={`${commonstyleOption}`}
          >
            {hobiSong.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectAlbum;
