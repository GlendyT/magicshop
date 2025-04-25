import useFlip from "@/hooks/useFlip";
import useRequestInfo from "@/hooks/useRequestInfo";
import Modal from "./Modal";
import InputName from "@/utils/InputNameUtils";
import { virthday } from "@/utils/Fonts";
import { virthdayGift } from "./Data/imagesList";
import { ButtonUtils } from "@/utils/ButtonUtils";
import RadioOptionsUtils from "@/utils/RadioOptionsUtils";

const Formulario = () => {
  const { usuario, handleSubmit, usuarioGenerado } = useRequestInfo();
  const { showAccessModal, handleUnlockClick } = useFlip();
  const { name, diseño } = usuario;

  return (
    <>
      {showAccessModal ? (
        <Modal />
      ) : (
        <div className="flex justify-center items-center fixed inset-10 z-10 flex-col max-sm:text-xs">
          <div className="z-50 px-10 py-4 max-sm:px-10 max-sm:py-10 w-96">
            <form
              className={`backdrop-blur-xl bg-black/50 rounded-xl p-4 flex flex-col gap-4 items-center text-white ${virthday.className}`}
              onSubmit={handleSubmit}
            >
              <label
                className="flex float-start text-base max-sm:text-base text-white text-center uppercase font-bold justify-center"
                htmlFor="name"
              >
                Add your name to get your card
              </label>
              <InputName
                placeholder="Write your name here"
                className="text-white text-base text-center placeholder:text-gray-400 max-sm:text-base"
              />

              <RadioOptionsUtils
                id="diseño"
                name="diseño"
                value={diseño}
                options={virthdayGift}
                onChange={usuarioGenerado}
                checked={diseño}
                className="w-full py-2 flex flex-row items-center justify-center gap-8"
                label="Select your Card"
                labelStyles="flex w-full items-center justify-between gap-2 p-1 rounded-md  max-md:text-xs  bg-gray-600/20 "
                spanStyles={(option, isSelected) =>
                  isSelected
                    ? "ring-2 bg-gray-950"
                    : "bg-gray-100 outline-gray-100 outline "
                }
                disabled={!name}
              />
              <ButtonUtils
                label="Request"
                className={`w-full uppercase text-lg max-sm:text-base flex items-center bg-black text-white disabled:text-gray-400 disabled:cursor-not-allowed py-3 px-2 ${
                  diseño ? "border border-gray-400" : ""
                }`}
                onClick={name ? handleUnlockClick : undefined}
                disabled={!diseño}
              />
            </form>
          </div>
          <div className="opacity-80 fixed  inset-44 z-30 bg-black rounded-3xl max-sm:inset-8 max-lg:inset-8"></div>
        </div>
      )}
    </>
  );
};

export default Formulario;
