import useRequestInfo from "@/hooks/useRequestInfo";
import { membersBts } from "./Data/rockpaper";
import { ButtonUtils } from "@/utils/ButtonUtils";
import InputNameUtils from "@/utils/InputNameUtils";
import RadioOptionsUtils from "@/utils/RadioOptionsUtils";

const Formulario = () => {
  const { usuario, handleSubmit, usuarioGenerado } = useRequestInfo();
  const { song, name } = usuario;
  return (
    <>
      <div className="w-96 relative flex flex-col outline-none focus:outline-none rounded-lg p-5">
        <div className="flex items-center justify-center">
          <h3 className="text-2xl text-purple-950 max-sm:text-xs">
            Rock-Paper-Scissors
          </h3>
        </div>
        <form className=" gap-2 flex flex-col" onSubmit={handleSubmit}>
          <InputNameUtils
            placeholder="write one name"
            className="placeholder:text-violet-600 bg-transparent"
          />

          <label className="text-sm my-2 text-violet-950 font-extrabold text-center flex items-center justify-center max-sm:text-xs">
            Choose Your Oponent
          </label>
          <RadioOptionsUtils
            id="song"
            name="song"
            value={song || ""}
            options={membersBts}
            onChange={usuarioGenerado}
            checked={song}
            className="py-2 flex flex-wrap items-center justify-center gap-2"
            labelStyles="flex items-center justify-center gap-2 max-sm:gap-1 max-sm:flex-wrap border max-sm:text-xs border-none p-1 rounded-md text-violet-950 bg-purple-400"
            spanStyles={(option, isSelected) =>
              isSelected
                ? "ring-4 bg-purple-900"
                : "bg-violet-300 outline-violet-500 outlinee "
            }
            disabled={!name}
          />
          <ButtonUtils
            label="Start the game"
            className={`w-full uppercase py-2 px-2 max-sm:text-xs  text-white ${
              song ? "bg-purple-800" : "bg-purple-400 disabled:cursor-not-allowed"
            }`}
            disabled={!song}
          />
        </form>
      </div>
    </>
  );
};

export default Formulario;
