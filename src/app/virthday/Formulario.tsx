import useFlip from "@/hooks/useFlip";
import useRequestInfo from "@/hooks/useRequestInfo";
import Modal from "./Modal";
import InputName from "@/utils/InputName";
import { Button } from "@/utils/Button";
import Vgiftoptions from "./Vgiftoptions";

const Formulario = () => {
  const { usuario, handleSubmit } = useRequestInfo();
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
              className="backdrop-blur-xl bg-black/50 rounded-xl p-4 flex flex-col gap-4 items-center text-white"
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
              <Vgiftoptions />
              <Button
                label="Request"
                className={`w-full uppercase text-lg max-sm:text-base flex items-center bg-black text-white disabled:text-gray-400 disabled:cursor-not-allowed py-3 px-2 ${diseño ? "border border-gray-400" : ""}`}
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
