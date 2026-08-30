import useRequestInfo from "@/hooks/useRequestInfo";
import { ButtonUtils } from "@/utils/ButtonUtils";
import { michroma } from "@/utils/Fonts";
import InputNameUtils from "@/utils/InputNameUtils";

const Formulario = () => {
  const { usuario, handleSubmit, usuarioGenerado } = useRequestInfo();
  const { name, diseño } = usuario;
  
  const options = [
    { 
      id: "Namjoon", 
      name: "Namjoon", 
      bg: "bg-linear-to-r from-blue-600 via-blue-800 to-cyan-900", 
      selectedBg: "bg-linear-to-r from-indigo-900 via-blue-500 to-cyan-900 font-bold" 
    },
    { 
      id: "Jungkook", 
      name: "Jungkook", 
      bg: "bg-linear-to-r from-red-600 via-rose-800 to-orange-900", 
      selectedBg: "bg-linear-to-r from-gray-900 via-rose-500 to-orange-900 ring-white font-bold" 
    },
    { 
      id: "Ambos", 
      name: "Ambos", 
      bg: "bg-gradient-to-r from-indigo-900 via-white-10 to-red-900", 
      selectedBg: "bg-gradient-to-r from-indigo-500 to-red-800 ring-2 ring-white font-bold" 
    },
  ];

  return (
    <div className=" w-96 text-white max-sm:text-xs max-sm:px-0 max-sm:py-1">
      <div className="max-sm:px-10 max-sm:py-10 w-96 px-8">
        <form
          className={`backdrop-blur-xl bg-black/10 rounded-xl p-4 flex flex-col gap-2 text-white max-sm:text-xs ${michroma.className}`}
          onSubmit={handleSubmit}
          data-testid="form"
        >
          <label
            className={`flex float-start text-sm text-black uppercase font-bold justify-center text-center ${michroma.className}`}
          >
            Enter your name to wish the September-Line a Happy Birthday!
          </label>
          <InputNameUtils
            placeholder="Your Name"
            className="text-black text-base text-center placeholder:text-gray-500 border bg-gray-100"
          />
          <div className="py-2 flex flex-wrap items-center justify-center gap-2">
            {options.map((option) => {
              const isSelected = diseño === option.name;
              return (
                <label
                  key={option.id}
                  className={`flex items-center justify-center gap-2 p-2 rounded-md text-white cursor-pointer transition-all ${
                    !name ? "opacity-50 cursor-not-allowed" : ""
                  } ${isSelected ? option.selectedBg : option.bg}`}
                >
                  {option.name}
                  <input
                    type="radio"
                    name="diseño"
                    value={option.name}
                    onChange={usuarioGenerado}
                    checked={isSelected}
                    className="hidden"
                    disabled={!name}
                  />
                  <span
                    className={`w-4 h-4 rounded-full border border-white ${
                      isSelected ? "bg-white" : "bg-transparent"
                    }`}
                  ></span>
                </label>
              );
            })}
          </div>

          <ButtonUtils
            label="Generate"
            className={`w-full uppercase text-xs text-white py-4 px-2 mt-2 ${michroma.className} ${diseño ? 'bg-blue-950 hover:bg-blue-800' : 'bg-blue-950/50 cursor-not-allowed'}`}
            disableColors="disabled:bg-opacity-25 disabled:cursor-not-allowed disabled:bg-black/30 disabled:text-gray-500"
            disabled={!name || !diseño}
          />
        </form>
      </div>
    </div>
  );
};

export default Formulario;
