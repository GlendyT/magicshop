import useRequestInfo from "@/hooks/useRequestInfo";
import { montserrat } from "@/utils/Fonts";
import SelectUtils from "@/utils/SelectUtils";
import { loveNotesImg } from "./Data/loveNotesImg";
import { ButtonUtils } from "@/utils/ButtonUtils";
import InputContentUtils from "@/utils/InputContentUtils";
import InputNameUtils from "@/utils/InputNameUtils";

const Formulario = () => {
  const { handleSubmit, isMaxCharLimitReachedH, usuario } = useRequestInfo();
  const { content, diseño } = usuario;
  return (
    <div
      className={`shadow-2xl relative flex flex-col w-full backdrop-blur-xl bg-pink-100/10 outline-none focus:outline-none rounded-lg p-5 ${montserrat.className}`}
    >
      <div className="flex items-center justify-center mt-5">
        <h3 className="text-2xl font-bold font-purple-800 max-sm:text-lg">
          Love Notes with BTS and ARMY
        </h3>
      </div>
      <form data-testid="form" className="mt-5 flex flex-col gap-2" onSubmit={handleSubmit}>
        <InputNameUtils
          from="To"
          placeholder="Whom"
          className=" border border-white rounded w-full py-2 px-3 text-white transition-all leading-tight placeholder-gray-100 focus:outline-none focus:shadow-outline resize-none"
        />

        <InputContentUtils
          from="From"
          placeholder="Your Name"
          className={`appearance-none  transition-all  border-white border disabled:border-gray-300 disabled:text-gray-100 rounded w-full py-2 px-3 text-white focus:outline-none focus:shadow-outline resize-none ${
            isMaxCharLimitReachedH
              ? "border-red-500 text-red-500"
              : "border-gray-300"
          }`}
        />

        <SelectUtils
          id="diseño"
          name="diseño"
          value={diseño}
          options={loveNotesImg}
          disabled={!content}
          placeholder="Select your art work"
          label="Select BTS or a member"
          className="appearance-none  transition-all  border-white border disabled:border-gray-300 disabled:text-gray-300 rounded w-full py-2 px-3 text-white focus:outline-none focus:shadow-outline resize-none "
        />
        <ButtonUtils
          label="Create Post"
          className={`w-full p-3 uppercase disabled:cursor-not-allowed  ${
            diseño
              ? "bg-purple-800 text-white"
              : "bg-purple-500/30 text-gray-200"
          }`}
          disabled={!diseño}
        />
      </form>
    </div>
  );
};

export default Formulario;
