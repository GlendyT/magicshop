import useRequestInfo from "@/hooks/useRequestInfo";
import { sugaStyles } from "./Data/sugaStyles";

const SelectDesign = () => {
  const { usuario, usuarioGenerado } = useRequestInfo();
  const { diseño, name } = usuario;

  return (
    <div className="my-5">
      <label className="text-sm mb-2 text-white">
        Choose Your favorite song
      </label>
      <select
        id="diseño"
        name="diseño"
        value={diseño}
        onChange={usuarioGenerado}
        className="appearance-none  transition-all  border-white border disabled:border-gray-600 disabled:text-gray-400 rounded w-full py-2 px-3 text-white "
        disabled={!name}
      >
        <option value="" className="text-black  ">
          Select your art work
        </option>
        {sugaStyles.map((suga) => (
          <option
            key={suga.id}
            value={suga.name}
            className="text-black border border-t-black"
          >
            {suga.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDesign;
