import useRequestInfo from "@/hooks/useRequestInfo";
import { hobiMusic } from "./Data/hobiMusic";
import SelectUtils from "@/utils/SelectUtils";

const SelectAlbum = () => {
  const { usuario } = useRequestInfo();
  const { diseño, song, name } = usuario;
  const selectedAlbum = hobiMusic.find((album) => album.name === diseño);
  const songOptions =
    selectedAlbum?.songs.map((song) => ({
      id: song.id,
      name: song.title,
    })) || [];
  const commonstyleSelect =
    "appearance-none rounded transition-all border-white border bg-white placeholder:text-gray-400 text-black w-full py-2 px-3 text-center  border-white  disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed";
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
