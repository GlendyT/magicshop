import useRequestInfo from "@/hooks/useRequestInfo";
import InputName from "@/utils/InputName";
import ListOponent from "./ListOponent";
import { Button } from "@/utils/Button";

const Formulario = () => {
  const { usuario, handleSubmit } = useRequestInfo();
  const { song } = usuario;
  return (
    <div className="flex">
      <div className="w-96 relative flex flex-col outline-none focus:outline-none rounded-lg p-5">
        <div className="flex items-center justify-center">
          <h3 className="text-2xl text-purple-950">Rock-Paper-Scissors</h3>
        </div>
        <form className="" onSubmit={handleSubmit}>
          <InputName
            placeholder="write one name"
            className="placeholder:text-violet-600 bg-transparent"
          />
          <ListOponent />
          <Button
            label="Start the game"
            className={`w-full uppercase py-2 px-2  text-white ${
              song ? "bg-purple-800" : "bg-purple-400"
            }`}
            disabled={!song}
          />
        </form>
      </div>
    </div>
  );
};

export default Formulario;
