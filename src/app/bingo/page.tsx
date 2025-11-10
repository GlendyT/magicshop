"use client";
import useBingo from "@/hooks/useBingo";
import useRequestInfo from "@/hooks/useRequestInfo";
import InputNameUtils from "@/utils/InputNameUtils";
import { ButtonUtils } from "@/utils/ButtonUtils";
import Resultado from "./Resultado";
import { GiMagicBroom, GiSaveArrow } from "react-icons/gi";
import { FiCheck, FiLoader } from "react-icons/fi";
import useDownload from "@/hooks/useDownload";

const Bingo = () => {
  const { handleCheck, isChecking, result, hasChecked, handleCleanCheck } =
    useBingo();
  const { usuario } = useRequestInfo();
  const { name } = usuario;
  const { handleDownloadImage } = useDownload();

  return (
    <div className="min-h-screen flex flex-col items-center p-2 gap-4 max-sm:gap-1 bg-bingo  ">
      <h1 className="text-2xl max-sm:text-lg font-bold text-center  text-gray-100">
        Hyung-Line Billion Bingo!
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-4 max-sm:gap-2 ">
        <div className="w-auto">
          <p className="text-gray-600 max-sm:text-xs text-center">
            <span className="text-blue-100 font-semibold">Are you ready?</span>
            <br />
            <span className="text-purple-100">
              I dare you to check if you have listened <br /> to the next
              hyung-line billion goal songs in the last hour!
            </span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1">
            <InputNameUtils
              placeholder="Enter your Last.fm username"
              className="mb-0 placeholder:text-gray-500 text-white"
            />
            <ButtonUtils
              onClick={() => handleCheck(name)}
              disabled={isChecking || !name.trim()}
              className=" bg-violet-600 mt-5 cursor-pointer text-white font-semibold p-2 rounded-md transition duration-200 disabled:opacity-50 disabled:hover:bg-violet-600 disabled:cursor-not-allowed hover:bg-violet-700"
              icon={
                isChecking ? (
                  <FiLoader className="animate-spin " />
                ) : (
                  <FiCheck />
                )
              }
              title="Check"
            />

            <ButtonUtils
              onClick={() => handleCleanCheck()}
              disabled={isChecking || !name.trim()}
              icon={<GiMagicBroom />}
              className=" bg-red-600 mt-5 cursor-pointer text-white font-semibold p-2 rounded-md transition duration-200 disabled:opacity-50 disabled:hover:bg-red-600 disabled:cursor-not-allowed hover:bg-red-700"
              title="Clean"
            />
          </div>

          {hasChecked && result && result.userExists && (
            <div className=" rounded-lg text-center">
              {result.found ? (
                <div className="pt-1 text-white rounded-lg">
                  <p className="text-lg font-bold">🎉 ¡BINGO! 🎉</p>
                  <p className="mt-2 text-sm">
                    Congrats! You have achieved the billion goal!
                  </p>
                </div>
              ) : (
                <div className=" text-yellow-200 pt-1 rounded-lg">
                  <p className="text-xl max-sm:text-sm font-bold">
                    Oh, no! No BINGO this time
                  </p>
                  <p className="max-sm:text-xs">
                    {result.error ? (
                      result.error
                    ) : (
                      <>
                        You haven&apos;t listent to{" "}
                        {4 -
                          result.allTargetSongs.filter((song) => song.isFound)
                            .length}{" "}
                        {4 -
                          result.allTargetSongs.filter((song) => song.isFound)
                            .length ===
                        1
                          ? "song"
                          : "songs"}
                        . <br/> Try it later, to save your BINGO card !
                      </>
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end">
          <div
            className="w-auto border border-gray-400 p-2 rounded-sm bg-white "
            id="print"
          >
            <Resultado />
          </div>
          <ButtonUtils
            onClick={() => handleDownloadImage()}
            disabled={isChecking || !name.trim() || !result?.found}
            icon={<GiSaveArrow />}
            className=" bg-teal-600 mt-5 cursor-pointer text-white font-semibold p-2 rounded-md transition duration-200 disabled:opacity-50 disabled:hover:bg-teal-600 disabled:cursor-not-allowed hover:bg-teal-700"
            title="Save"
          />
        </div>
      </div>
      <span className="text-xs text-white">
        if your user seems that does not exist, try it later{" "}
      </span>
    </div>
  );
};

export default Bingo;
