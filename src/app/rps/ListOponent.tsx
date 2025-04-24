import useRequestInfo from "@/hooks/useRequestInfo";
import { membersBts } from "./Data/rockpaper";

const ListOponent = () => {
  const { usuario, usuarioGenerado } = useRequestInfo();
  const { song, name } = usuario;
  return (
    <div className="my-5">
      <label className="text-sm mb-2 text-violet-950 font-extrabold text-center flex items-center justify-center max-sm:text-xs">
        Choose Your Oponent
      </label>
      <div className="flex justify-center">
        <label className="py-2 flex flex-wrap items-center justify-center gap-2">
          {membersBts.map((members) => (
            <label
              key={members.id}
              className={`flex items-center justify-center gap-2 max-sm:gap-1 max-sm:flex-wrap border max-sm:text-xs border-none p-1 rounded-md text-violet-950 ${
                name
                  ? "cursor-pointer bg-purple-400"
                  : "cursor-not-allowed bg-purple-300"
              }`}
            >
              {members.name}
              <input
                id="song"
                name="song"
                type="radio"
                value={members.name}
                checked={song === members.name}
                onChange={usuarioGenerado}
                className="hidden"
                disabled={!name}
              />
              <span
                className={`w-4 h-4 object-cover rounded ${
                  song === members.name
                    ? "ring-4 bg-purple-900"
                    : "bg-violet-300 outline-violet-500 outline"
                }`}
              ></span>
            </label>
          ))}
        </label>
      </div>
    </div>
  );
};

export default ListOponent;
