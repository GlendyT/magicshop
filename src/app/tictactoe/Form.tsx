import InputNameUtils from "@/utils/InputNameUtils";
import { btsgrid } from "./Data/BTSarr";
import RadioOptionsUtils from "@/utils/RadioOptionsUtils";
import useTicTacToe from "@/hooks/useTicTacToe";
import { gameModeOptions, playerOptions } from "./Data/constants";
import { ButtonUtils } from "@/utils/ButtonUtils";
import useRequestInfo from "@/hooks/useRequestInfo";

const Form = () => {
  const {
    changeMode,
    mode,
    GAME_MODES,
    choosePlayer,
    PLAYER_0,
    PLAYER_X,
    playerChoice,
  } = useTicTacToe();
  const { usuario, handleSubmit } = useRequestInfo();
  const name = usuario?.name?.trim();
  const isNameFilled = !!name;
  const isModeSelected = !!mode;

  return (
    <div className=" min-h-screen flex flex-row max-sm:flex-col max-sm:gap-14 items-center justify-center h-fit w-full gap-44 px-40 bg-purple-950">
      <div className="h-ful w-full flex flex-col items-center justify-center">
        <span className="shadow-[0px_1px_6px_18px_rgba(147,_51,_234,_0.5)] border-purple-400 text-center text-white border-2 w-44 max-sm:w-24 max-sm:text-xs text-lg uppercase font-extrabold rounded-t-xl">
          tic-tac-toe
        </span>
        <div className="w-full max-sm:w-40 flex items-center justify-center py-10 max-sm:py-2 shadow-[0px_1px_6px_18px_rgba(147,_51,_234,_0.5)] border-purple-400 border-2 font-extrabold rounded-3xl bg-black/50">
          <div className="text-white w-96 max-sm:w-36 text-center p-1 grid grid-cols-3 gap-6 max-sm:gap-4 text-5xl max-sm:text-lg">
            {btsgrid.map((letra) => (
              <div
                key={letra.id}
                className="rounded-xl max-sm:rounded-sm uppercase flex items-center justify-center h-24 max-sm:h-6 max-sm:w-6 w-full shadow-[0px_1px_6px_8px_rgba(147,_51,_234,_0.5)] "
              >
                {letra.letter}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="font-extrabold w-full h-full flex flex-col items-center justify-center">
        <span className="shadow-[0px_1px_6px_18px_rgba(147,_51,_234,_0.5)] border-purple-400 text-center text-white border-2 w-44 max-sm:w-24 max-sm:text-xs text-lg uppercase font-extrabold rounded-t-xl">
          game details
        </span>
        <div className="rounded-md text-white p-8 shadow-[0px_1px_6px_18px_rgba(147,_51,_234,_0.5)] border-purple-400 border-2 py-28 bg-black/50 max-sm:py-4 max-sm:px-2 ">
          <div className="flex flex-col items-center mb-6 p-2">
            <form
              className="flex flex-col gap-4 items-center max-sm:text-xs"
              onSubmit={handleSubmit}
            >
              <InputNameUtils placeholder="write your name first" className=" text-white  " />

              <label
                className={`mb-2 ${
                  !name
                    ? " disabled:cursor-not-allowed text-purple-200 opacity-50"
                    : "  text-purple-200"
                }`}
              >
                Level of the game
              </label>
              <RadioOptionsUtils
                id="mode"
                name="mode"
                value={mode || ""}
                options={gameModeOptions}
                onChange={changeMode}
                checked={mode}
                className="flex gap-4"
                labelStyles="flex items-center justify-center gap-2 max-sm:gap-1 max-sm:flex-wrap border max-sm:text-xs border-none p-1 rounded-md text-violet-200"
                spanStyles={(option, isSelected) =>
                  isSelected
                    ? "ring-4 bg-purple-700"
                    : "bg-gray-300 outline-purple-500 outline"
                }
                disabled={!isNameFilled}
              />

              <div className="flex flex-col items-center mb-8 p-2">
                <label
                  className={`mb-2 ${
                    mode === GAME_MODES.medium
                      ? " disabled:cursor-not-allowed text-purple-200 opacity-50"
                      : "  text-purple-200"
                  }`}
                >
                  who you are going to be
                </label>
                <div className="flex w-28 justify-between items-center">
                  <ButtonUtils
                    label="X"
                    onClick={() => choosePlayer(PLAYER_X)}
                    className={` shadow-[0px_1px_6px_4px_rgba(147,_51,_234,_0.5)]  px-3 py-0 max-sm:py-2 rounded-none ${
                      mode === GAME_MODES.medium
                        ? "bg-purple-200 disabled:cursor-not-allowed opacity-50"
                        : "bg-purple-200 text-purple-950 font-extrabold"
                    }`}
                    disabled={!mode || !name}
                  />
                  <ButtonUtils
                    label="0"
                    onClick={() => choosePlayer(PLAYER_0)}
                    className={` shadow-[0px_1px_6px_4px_rgba(147,_51,_234,_0.5)]  px-3 py-0 max-sm:py-2 rounded-none ${
                      mode === GAME_MODES.medium
                        ? "bg-purple-200 disabled:cursor-not-allowed opacity-50"
                        : "bg-purple-200 text-purple-950 font-extrabold"
                    }`}
                    disabled={!mode || !name}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
