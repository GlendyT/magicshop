import useSpotify from "@/hooks/useSpotify";
import React from "react";
import UnauthView from "./UnauthView";
import InputContentUtils from "@/utils/InputContentUtils";
import SelectUtils from "@/utils/SelectUtils";
import { ARTISTS } from "../Data/btspotify";
import { FaMinus, FaPlus, FaSearch } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdSearchOff } from "react-icons/md";
import Image from "next/image";
import { ButtonUtils } from "@/utils/ButtonUtils";

const SearchView = () => {
  const {
    searchResults,
    setSearchQuery,
    loading,
    setArtistFilter,
    hasSearched,
    searchQuery,
    artistFilter,
    accessToken,
    toggleTrackSelection,
    selectedTracks,
    updateQuantity,
  } = useSpotify();

  return (
    <div
      className={`relative w-96  ${!accessToken ? "pointer-events-none" : ""}`}
    >
      {!accessToken && <UnauthView />}
      <div className={`mb-2 bg-white  rounded-lg shadow-md px-4 py-4`}>
        <div className="flex flex-row gap-2 items-center justify-between">
          <InputContentUtils
            from="Search songs"
            placeholder="Search by song or artist name.."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchQuery}
            onChange={setSearchQuery}
            disabled={false}
          />

          <SelectUtils
            id={artistFilter}
            name={artistFilter}
            label="Filter by Artist"
            value={artistFilter}
            options={[
              { id: "all", name: "All Artists" },
              ...ARTISTS.map((artist) => ({
                id: artist.id,
                name: artist.name,
              })),
            ]}
            disabled={false}
            className=" w-full  p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            onChange={(e) => setArtistFilter(e.target.value)}
          />
        </div>

        <div className=" text-xs text-gray-600">
          <span>
            {hasSearched
              ? `Found ${searchResults.length} songs`
              : "Type at least 2 characters to search"}
          </span>
        </div>
      </div>
      {/* Available Tracks */}
      <div className="bg-white h-auto rounded-lg shadow-md p-4 ">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Search Results
          </h2>
        </div>

        <div className="flex flex-col gap-1 h-auto  overflow-y-auto">
          {!hasSearched ? (
            <div className="flex flex-col  w-auto items-center justify-center text-gray-500 py-14">
              <FaSearch className="text-3xl items-center" />
              <p className="text-lg font-medium">
                Start by searching a song name
              </p>
            </div>
          ) : loading ? (
            <div className="flex flex-col w-auto items-center justify-center text-gray-500 py-14">
              <AiOutlineLoading3Quarters className="text-3xl animate-spin items-center" />
              <p>Searching...</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="flex flex-col w-auto items-center justify-center text-gray-500 py-14">
              <MdSearchOff className="text-3xl items-center" />
              <p className="text-lg font-medium">No songs found</p>
              <p className="text-sm mt-2">
                Try adjusting your search or artist filter
              </p>
            </div>
          ) : (
            searchResults.map((track) => {
              const isSelected = selectedTracks.has(track.id);

              return (
                <div
                  key={track.id}
                  className={`flex flex-col ${
                    isSelected
                      ? "bg-slate-100 border-2 border-slate-400"
                      : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                  }`}
                >
                  <div
                    className={`flex flex-row w-full items-center justify-between gap-2 p-2 rounded-lg transition-colors `}
                  >
                    {track.album.images[0] && (
                      <Image
                        src={track.album.images[0].url}
                        alt={track.album.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded"
                      />
                    )}

                    <div className="flex-1 ">
                      <p className="font-medium text-gray-900 text-md truncate w-62 ">
                        {track.name}
                      </p>
                      <div className="text-xs text-gray-600 flex flex-row">
                        {track.artists.map((a) => a.name).join(", ")}
                        {isSelected ? (
                          <div className="flex flex-row w-full items-center justify-end gap-1">
                            <ButtonUtils
                              icon={<FaMinus />}
                              onClick={() => updateQuantity(track.id, -1)}
                              className="w-8 h-8 hover:bg-gray-300 rounded-full flex items-center justify-center font-bold cursor-pointer transition-colors"
                            />
                            <span className="w-8 text-center font-semibold text-sm">
                              {selectedTracks.get(track.id)?.quantity || 0}
                            </span>
                            <ButtonUtils
                              icon={<FaPlus />}
                              onClick={() => updateQuantity(track.id, 1)}
                              className="w-8 h-8 hover:bg-gray-300 rounded-full flex items-center justify-center font-bold cursor-pointer transition-colors"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-row w-full items-center justify-end gap-1">
                            <ButtonUtils
                              icon={<FaPlus />}
                              onClick={() => toggleTrackSelection(track)}
                              className="w-8 h-8  text-slate-600 rounded-sm flex items-center justify-center font-bold cursor-pointer transition-colors shadow-sm"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {/* Selected Tracks Summary */}
    </div>
  );
};

export default SearchView;
