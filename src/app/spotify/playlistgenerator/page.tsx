"use client";
import useSpotify from "../../../hooks/useSpotify";
import { ButtonUtils } from "@/utils/ButtonUtils";
import SearchView from "./SearchView";
import PlaylistView from "./PlaylistView";
import DurationView from "./DurationView";

const PlaylistGenerator = () => {
  const {
    generatePlaylist,
    handleLogout,
    accessToken,
    selectedTracks,
    targetDurationHours,
    fillArtistIds,
    clearAll,
  } = useSpotify();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-100 to-violet-100 p-2 flex flex-col items-center gap-2">
      <div className=" w-full flex flex-row items-center justify-center ">
        <h1 className="text-4xl max-sm:text-xs w-full flex items-center justify-center text-center font-bold">
          BTS Playlist Generator{" "}
        </h1>
        <div className="w-auto items-end flex justify-end gap-2">
          {accessToken ? (
            <>
              <ButtonUtils
                label="Logout"
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold p-2 rounded-lg transition-colors duration-200 flex items-center gap-2 cursor-pointer"
              />

              <ButtonUtils
                label="Clear"
                onClick={clearAll}
                disabled={
                  selectedTracks.size === 0 &&
                  !targetDurationHours &&
                  fillArtistIds.length === 0
                }
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 cursor-pointer"
              />
            </>
          ) : (
            <ButtonUtils
              label="Login"
              onClick={generatePlaylist}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold p-2 rounded-lg transition-colors duration-200 flex items-center gap-3 shadow-lg text-lg cursor-pointer"
            />
          )}
        </div>
      </div>
      <div className="flex flex-wrap w-full gap-4 justify-center">
        {/* //TODO: RIGHT SIDE */}
        <SearchView />
        {/* //TODO: CENTER SIDE */}
        <PlaylistView />
        {/* //TODO: LEFT SIDE */}
        <DurationView />
      </div>
    </div>
  );
};

export default PlaylistGenerator;
