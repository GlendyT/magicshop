import useRequestInfo from "@/hooks/useRequestInfo";
import { virthdayGift } from "./Data/imagesList";

const Vgiftoptions = () => {
  const { usuarioGenerado, usuario } = useRequestInfo();
  const { diseño, name } = usuario;
  return (
    <div className="w-full py-2 flex flex-row items-center justify-center gap-8">
      {virthdayGift.map((vgift) => (
        <label
          key={vgift.id}
          className={`flex w-full items-center justify-between gap-2 p-1 rounded-md  max-md:text-xs border border-none ${
            name
              ? "bg-gray-700 cursor-pointer"
              : "cursor-not-allowed bg-gray-950"
          }`}
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
                ? "rign-4 bg-gray-300 "
                : "bg-gray-900 outline-gray-500 outline "
            }`}
          ></span>
          {vgift.name}
        </label>
      ))}
    </div>
  );
};

export default Vgiftoptions;
