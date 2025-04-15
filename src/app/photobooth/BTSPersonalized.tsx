import useRequestInfo from "@/hooks/useRequestInfo";
import { btsPerzonalizedBG } from "./btsPersonalizedBG";
import usePhotobooth from "@/hooks/usePhotobooth";

const BTSPersonalized = () => {
  const { usuario } = useRequestInfo();
  const { diseño } = usuario;
  const { handleSelection } = usePhotobooth();

  return (
    <div className="py-2 flex flex-col items-center justify-center gap-2">
      {btsPerzonalizedBG.map((member) => (
        <label
          key={member.id}
          className={`flex w-full items-center justify-between gap-2 border-none p-1 rounded-md text-violet-100 cursor-pointer bg-purple-800 max-md:text-xs`}
        >
          {member.name}
          <input
            id="diseño"
            name="diseño"
            type="radio"
            value={member.name}
            onChange={handleSelection}
            checked={diseño === member.name}
            className="hidden"
          />
          <span
            className={`w-4 h-4 rounded ${
              diseño === member.name
                ? "ring-4 bg-purple-950"
                : "bg-violet-300 outline-violet-500 outline"
            }`}
          ></span>
        </label>
      ))}
    </div>
  );
};

export default BTSPersonalized;
