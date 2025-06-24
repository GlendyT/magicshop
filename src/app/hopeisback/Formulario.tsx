import useRequestInfo from "@/hooks/useRequestInfo";
import { providence } from "@/utils/Fonts";
import RadioOptions from "@/utils/RadioOptionsUtils";
import { hobiPersonalized } from "./Data/hobiPersonalized";
import { ButtonUtils } from "@/utils/ButtonUtils";
import InputNameUtils from "@/utils/InputNameUtils";
import InputContentUtils from "@/utils/InputContentUtils";
import { test } from '@playwright/test';

const Formulario = () => {
  const {
    isMaxCharLimitReachedH,
    usuario,
    handleSubmit,
    isMobile,
    usuarioGenerado,
  } = useRequestInfo();
  const { content, diseño } = usuario;
  const selectedStyle = isMobile
    ? hobiPersonalized.find((style) => style.name === "Vertical Style")
    : hobiPersonalized.find((style) => style.name === "Square Style");
  return (
    <div className="w-96 text-white max-sm:text-xs max-sm:px-0 max-sm:py-1 ">
      <div className="max-sm:px-10 max-sm:py-10">
        <form
          className={`backdrop-blur-sm bg-black/40 rounded-xl p-4 flex flex-col gap-4 max-sm:gap-2 ${providence.className}`}
          onSubmit={handleSubmit}
          data-testid="form"
        >
          <InputNameUtils
            className="text-black text-base placeholder:text-gray-400 bg-white border border-gray-300"
            placeholder="Your Name"
          />

          <InputContentUtils
            placeholder="Write your country or city"
            className={`appearance-none border rounded w-full py-2 px-3 text-black bg-white placeholder:text-gray-400 leading-tight focus:outline-none focus:shadow-outline resize-none disabled:cursor-not-allowed disabled:bg-black/20 disabled:border-none ${isMaxCharLimitReachedH
                ? "border-red-500 text-red-500"
                : "border-gray-300"
              }`}
          />

          <RadioOptions
            id="diseño"
            name="diseño"
            value={diseño}
            options={selectedStyle?.styles || []}
            onChange={usuarioGenerado}
            checked={diseño}
            className="flex flex-row gap-2 items-center justify-center text-black font-extrabold"
            label="Select your Card"
            labelStyles="px-[0.2rem] py-3  flex flex-row gap-4 items-center justify-center  text-white capitalize text-base max-sm:text-xs rounded-2xl bg-gray-950/20 "
            spanStyles={(option, isSelected) =>
              isSelected
                ? "ring-4 bg-gray-950"
                : "bg-gray-100 outline-gray-700 outline-2"
            }
            disabled={!content}
          />
          <div className="flex justify-center">
            <ButtonUtils
              label="Create Post"
              disabled={!diseño}
              className={`bg-black w-full text-white disabled:bg-opacity-25 disabled:cursor-not-allowed py-2 px-3 uppercase disabled:bg-black/30 disabled:text-gray-400 ${providence.className}`}
            />
          </div>
        </form>
        {diseño && (
          <div
            className={`${providence.className} ${diseño
                ? "{`relative px-10 py-4 max-sm:px-2 max-sm:py-8 backdrop-blur-sm bg-black/20 rounded-3xl  my-2 text-center font-providence transition-transform delay-150 text-black max-sm:backdrop-blur-sm max-sm:bg-black/40 p-4 gap-4 sm:justify-center items-center max-sm:text-xs `}"
                : "hidden"
              } `}
          >
            Let&apos;s welcome Hobi with a special card
            <p className="text-xs text-black/40 max-sm:text-xs ">
              This message will be shown in korean
            </p>
            &quot;Welcome home, Jung Hoseok! We missed you and we are proud of
            you. Our sunshine is home. Wishing you all the best of luck. Sending
            you all of our love.&quot;
          </div>
        )}

      </div>
    </div>
  );
};

export default Formulario;
