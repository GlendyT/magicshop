import useRequestInfo from "@/hooks/useRequestInfo";
import { Button } from "@/utils/Button";
import InputName from "@/utils/InputName";

const Formulario = () => {
  const { usuario, handleSubmit } = useRequestInfo();
  const { name } = usuario;
  return (
    <div className=" py-4 max-sm:px-10 max-sm:py-1 w-full">
      <form
        className="backdrop-blur-xl bg-black/50 rounded-xl p-4 flex flex-col gap-6 sm:justify-center items-center text-white max-sm:text-xs"
        onSubmit={handleSubmit}
      >
        <label className="flex float-start text-sm text-black hover:text-white uppercase font-bold justify-center ">
          get your passport
        </label>
        <InputName
          placeholder="Your Name"
          className="text-black py-3 px-2 text-sm text-center placeholder:text-gray-500 bg-gray-100"
        />
        <Button
          label="Generate"
          className="w-full uppercase text-xs bg-blue-950 text-white py-4 px-2"
          disableColors="disabled:bg-opacity-25 disabled:cursor-not-allowed disabled:bg-black/30 disabled:text-gray-500"
          disabled={!name}
        />
      </form>
    </div>
  );
};

export default Formulario;
