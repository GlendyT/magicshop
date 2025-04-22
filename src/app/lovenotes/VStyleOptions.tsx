import useRequestInfo from "@/hooks/useRequestInfo";
import { loveNotesImg } from "./loveNotesImg";

const VStyleOptions = () => {
  const { usuario, usuarioGenerado } = useRequestInfo();
  const { diseño, content } = usuario;
  return (
    <div className="">
      <label className="text-sm mb-2 text-white">Select BTS or a member</label>
      <select
        id="diseño"
        name="diseño"
        value={diseño}
        onChange={usuarioGenerado}
        className="appearance-none  transition-all  border-white border disabled:border-gray-300 disabled:text-gray-300 rounded w-full py-2 px-3 text-white focus:outline-none focus:shadow-outline resize-none "
        disabled={!content}
      >
        <option value="" className="text-black">
          Select your art work
        </option>
        {loveNotesImg.map((loveNote) => (
          <option
            key={loveNote.id}
            value={loveNote.name}
            className="text-black border border-t-black"
          >
            {loveNote.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VStyleOptions;
