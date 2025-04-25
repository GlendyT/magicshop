import useRequestInfo from "@/hooks/useRequestInfo";
import { ButtonUtils } from "@/utils/ButtonUtils";
import { michroma } from "@/utils/Fonts";
import InputNameUtils from "@/utils/InputNameUtils";

const Formulario = () => {
  const { usuario, handleSubmit } = useRequestInfo();
  const { name } = usuario;
  return (
    <div className=" w-96max-sm:text-xs max-sm:px-10 ">
      <div className="max-sm:px-10 max-sm:py-10 w-96 px-8">
        <form
          className={`backdrop-blur-xl bg-black/50 rounded-xl p-4 flex flex-col gap-6 text-white max-sm:text-xs ${michroma.className}`}
          onSubmit={handleSubmit}
        >
          <label
            className={`flex float-start text-sm text-white uppercase font-bold justify-center ${michroma.className}`}
          >
            get your passport
          </label>
          <InputNameUtils
            placeholder="Your Name"
            className="text-black text-base text-center placeholder:text-gray-500 border bg-gray-100"
          />
          <ButtonUtils
            label="Generate"
            className={`w-full uppercase text-xs bg-blue-950 text-white py-4 px-2 ${michroma.className}`}
            disableColors="disabled:bg-opacity-25 disabled:cursor-not-allowed disabled:bg-black/30 disabled:text-gray-500"
            disabled={!name}
          />
        </form>
      </div>
    </div>
  );
};

export default Formulario;
