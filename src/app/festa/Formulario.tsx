import useRequestInfo from "@/hooks/useRequestInfo"
import { ButtonUtils } from "@/utils/ButtonUtils";
import { providence } from "@/utils/Fonts";
import InputNameUtils from "@/utils/InputNameUtils"
import RadioOptionsUtils from "@/utils/RadioOptionsUtils";
import InputContentUtils from "@/utils/InputContentUtils";
import { festaBts } from "./data";


export default function Formulario() {

    const {handleSubmit, usuario, usuarioGenerado, isMaxCharLimitReachedH } = useRequestInfo();
    const { content, diseño } = usuario;

  return (
     <div className="w-96 text-white max-sm:text-sx max-sm:px-0 mx:sm:py-1">
        <div className="max-sm:px-10 max-sm:py-10">
            <form
               className={`backdrop-blur-sm bg-black/40 rounded-xl p-4 flex flex-col gap-4 max-sm:gap-2 ${providence.className}`}
               onSubmit={handleSubmit}
            >
            <InputNameUtils
              className="text-black text-base placeholder:text-gray-400 bg-white border border-gray-300"
              placeholder='Your Name'
            />

            
           <InputContentUtils
                placeholder="Write your country or city"
                className={`appearance-none border rounded w-full py-2 px-3 text-black bg-white placeholder:text-gray-400 leading-tight focus:outline-none focus:shadow-outline resize-none disabled:cursor-not-allowed disabled:bg-black/20 disabled:border-none ${
                 isMaxCharLimitReachedH
                     ? "border-red-500 text-red-500"
                     : "border-gray-300"
              }`}
            />
            
            <RadioOptionsUtils
               id='diseño'
               name= 'diseño'
               value={diseño}
               options={festaBts}
               onChange={usuarioGenerado}
               checked={diseño}
               className="flex flex-row gap-2 items-center justify-center text-purple-700 font-extrabold"
               label='Select a Member'
               labelStyles="flex items-center justify-center gap-2 max-sm:gap-1 max-sm:flex-wrap border max-sm:text-xs border-none p-1 rounded-md text-violet-950 bg-gray-300"
               spanStyles={(option, isSelected) =>
                 isSelected
                ? "ring-4 bg-gray-950"
                : "bg-gray-100 outline-gray-700 outline-2"
            }
            disabled={!content}
            />
            
           <div>
             <ButtonUtils
               label='Create Post'
               disabled={!diseño}
               className={`bg-black w-full text-white disabled:bg-opacitabled:cursor-not-allowed py-2 px-3 uppercase disabled:bg-black/30 disabled:text-gray-400 ${providence.className}`}
             />
           </div>    
            </form>   
        </div>
    </div>
  )
}
