import useFish from "@/hooks/useFish";
import useRequestInfo from "@/hooks/useRequestInfo";
import { Button } from "@/utils/Button";
import InputName from "@/utils/InputName";

const Formulario = () => {
  const { usuario, handleSubmit } = useRequestInfo();
  const { name } = usuario;
  const { setShowModal } = useFish();
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="flex justify-center items-center fixed inset-10 z-10 flex-col text-white">
      <div className="z-50 w-96 px-8 py-4 max-sm:px-10 max-sm:py-10">
        <form
          className="backdrop-blur-xl bg-black/50 rounded-xl p-4 flex flex-col gap-6 max-sm:text-xs "
          onSubmit={handleSubmit}
        >
          <label
            className="flex float-start text-xs max-sm:text-xs text-white text-center uppercase font-bold justify-center"
            htmlFor="name"
          >
            Unlock the game by adding your name
          </label>
          <InputName
            placeholder="Your name"
            className="text-sm text-center py-3 text-white placeholder:text-gray-400 w-full"
          />
          <Button
            label={name ? "Unlocked" : "Lock"}
            className={`w-full uppercase text-lg max-sm:text-xs flex items-center text-white py-2 rounded ${
              name ? "bg-blue-900" : "bg-blue-950"
            }`}
            disabled={!name}
            onClick={handleCloseModal}
            icon={
              name ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              )
            }
          />
        </form>
      </div>
      <div className="opacity-90 fixed inset-30 z-30 bg-blue-950 rounded-3xl max-sm:inset-8 max-lg:inset-8"></div>
    </div>
  );
};

export default Formulario;
