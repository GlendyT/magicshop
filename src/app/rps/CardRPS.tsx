import useDownload from "@/hooks/useDownload";
import useRequestInfo from "@/hooks/useRequestInfo";
import useRPS from "@/hooks/useRPS";
import OptionsButton from "./OptionsButton";
import { BtsImgRPS, UserImgRPS } from "./ImagesRPS";
import { BtsRPS, ResultRPS, UserRPS } from "./PlayersRPS";
import RPSFreebie from "./RPSFreebie";
import { ButtonUtils } from "@/utils/ButtonUtils";

const CardRPS = () => {
  const { result, maxTurns, turns, options, handlePlay, disabled, resetAll } =
    useRPS();
  const { setShowModal, showModal, usuario } = useRequestInfo();
  const { name, song } = usuario;
  const { handleDownloadImage } = useDownload();
  const handleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div data-testid="card-rps" className="flex flex-col items-center justify-center px-4">
      <div
        className={`w-full py-4 rounded-t-xl bg-white/5 backdrop-blur-sm ${
          result === 1
            ? "border-4 border-green-400"
            : result === 2
            ? "border-4 border-red-400"
            : "border-4 border-blue-400"
        }`}
      >
        <span className=" flex justify-center w-full font-extrabold">
          {name} side, press here
        </span>
        <div className="flex flex-row items-center justify-center">
          {options.map((option) => (
            <OptionsButton
              key={option.id}
              option={option}
              handlePlay={handlePlay}
              disabled={disabled}
              turns={turns}
              maxTurns={maxTurns}
            />
          ))}
        </div>
        <UserImgRPS />
        
      </div>
      <div className="flex flex-row items-center text-center w-full">
        <UserRPS />
        <ResultRPS />
        <BtsRPS />
      </div>
      <BtsImgRPS />

      <div className="py-2 flex flex-row gap-2 justify-between">
        {maxTurns - turns === 0 && (
          <ButtonUtils
            onClick={resetAll}
            label="Restart"
            className="uppercase bg-purple-400 px-2 py-2"
          />
        )}
        {maxTurns - turns === 0 && (
          <ButtonUtils
            onClick={handleModal}
            label={showModal ? "Show your Gift 🎁" : "Hide"}
            className="uppercase bg-purple-400 px-2 py-2"
          />
        )}
        {maxTurns - turns === 0 && !showModal && <RPSFreebie />}
        {maxTurns - turns === 0 && !showModal && (
          <ButtonUtils
            onClick={handleDownloadImage}
            label={showModal ? "" : "Download"}
            className="uppercase bg-purple-400 px-2 py-2"
          />
        )}
      </div>
    </div>
  );
};

export default CardRPS;
