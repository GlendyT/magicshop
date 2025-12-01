"use client";

// Marcar como dinámico porque es interactivo
export const dynamic = 'force-dynamic';
import useBingo from "@/hooks/useBingo";
import useRequestInfo from "@/hooks/useRequestInfo";
import InputNameUtils from "@/utils/InputNameUtils";
import { ButtonUtils } from "@/utils/ButtonUtils";
import Resultado from "./Resultado";
import { GiMagicBroom, GiSaveArrow } from "react-icons/gi";
import { FiCheck, FiLoader } from "react-icons/fi";
import useDownload from "@/hooks/useDownload";
import Image from "next/image";
import { michroma } from "@/utils/Fonts";

const Bingo = () => {
  const { handleCheck, isChecking, result, hasChecked, handleCleanCheck } =
    useBingo();
  const { usuario } = useRequestInfo();
  const { name } = usuario;
  const { handleDownloadImage } = useDownload();

  return (
    <div
      className={`min-h-screen flex flex-col max-sm:py-10  items-center p-2 max-sm:gap-1 bg-gradient-to-r from-purple-900 via-purple-950 to-black/90  ${michroma.className}`}
    >
      <h1 className="text-xl max-sm:text-lg font-extrabold text-center uppercase text-gray-100  ">
        Hyung-Line Billion Bingo!
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-4 max-sm:gap-2 ">
        <div className="w-auto">
          <p className="text-gray-600 max-sm:text-xs text-center">
            <span className="text-blue-100 font-semibold uppercase">
              Are you ready?
            </span>
            <br />
            <span className="text-purple-100 text-xs">
              I dare you to check if you have listened <br /> to the next
              hyung-line billion goal songs in the last hour!
            </span>
          </p>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center gap-1">
              <InputNameUtils
                placeholder="Enter your Last.fm username"
                className="mb-0 placeholder:text-gray-500 text-white"
              />
              <div className="flex flex-row gap-2">
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
                <ButtonUtils
                  onClick={() => handleDownloadImage()}
                  disabled={isChecking || !name.trim()}
                  icon={<GiSaveArrow />}
                  className=" bg-teal-600 mt-5 cursor-pointer text-white font-semibold p-2 rounded-md transition duration-200 disabled:opacity-50 disabled:hover:bg-teal-600 disabled:cursor-not-allowed hover:bg-teal-700"
                  title="Save"
                />
              </div>
            </div>
            <div className=" text-center items-center text-[0.6rem] text-gray-200">
              <span>if your user seems that does not exist, try it later </span>
              <br />
              <span>This design was from the #SpotifyPurpleU</span>
            </div>
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
                <div className=" text-purple-100 pt-1 rounded-lg">
                  <p className="text-2xl max-sm:text-sm font-bold">
                    Oh, no! No BINGO this time
                  </p>
                  <div className="max-sm:text-xs">
                    {result.error ? (
                      result.error
                    ) : (
                      <p className="flex flex-col items-center text-center">
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
                        . <br /> Try it later!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col  items-end">
          <div
            className={`w-auto p-2  bg-gradient-to-bl from-gray-950 via-purple-950 to-black/90 `}
            id="print"
          >
            <Resultado />
            <div
              className={`flex flex-row items-center justify-between mt-2 font-semibold uppercase text-[0.6rem] text-gray-100 font-sans `}
            >
              <span className="flex flex-row items-center">
                <Image
                  src="/Polaroid/Only-graphic-darkpurple.webp"
                  alt="BTS Logo"
                  width={20}
                  height={20}
                  className="inline-block mr-1"
                />
                BeyondTheArmy
              </span>
              <span>themagicshop.vercel.app/bingo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bingo;
