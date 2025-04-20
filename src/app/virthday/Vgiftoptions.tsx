import useRequestInfo from "@/hooks/useRequestInfo";
import { virthdayGift } from "./Data/imagesList";

const Vgiftoptions = () => {
  const { usuarioGenerado, usuario } = useRequestInfo();
  const { diseño, name } = usuario;
  return (
    <div className="py-2 flex flex-row items-center justify-center gap-2">
      {virthdayGift.map((vgift) => (
        <label
          key={vgift.id}
          className={`flex w-full items-center justify-between gap-2 p-1 rounded-md text-white disabled:cursor-not-allowed cursor-pointer bg-black max-md:text-xs ${name ? "border-gray-600 border" : ""}`}
        >
          <input
            id="diseño"
            name="diseño"
            type="radio"
            value={vgift.name} 
            onChange={usuarioGenerado}
            checked={diseño === vgift.name}
            className="hidden"
            disabled={!name}
          />
          <span
            className={`w-4 h-4 object-cover rounded ${
              diseño === vgift.name
                ? "rign-4 bg-white"
                : "bg-gray-700 outline-gray-600 outline "
            }`}
          ></span>
          {vgift.name}
        </label>
      ))}
    </div>
  );
};

export default Vgiftoptions;
