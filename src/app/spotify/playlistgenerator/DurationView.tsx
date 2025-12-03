import useSpotify from "@/hooks/useSpotify";
import { ButtonUtils } from "@/utils/ButtonUtils";
import React from "react";
import { PiPlusCircle } from "react-icons/pi";
import { ARTISTS } from "../Data/btspotify";
import UnauthView from "./UnauthView";

const DurationView = () => {
  const {
    accessToken,
    targetDurationHours,
    setTargetDurationHours,
    fillArtistIds,
    toggleFillArtist,
    currentDuration,
    fillPlaylistToTarget,
    isFilling,
  } = useSpotify();
  return (
    <div
      className={`relative w-96 ${!accessToken ? "pointer-events-none" : ""}`}
    >
      {!accessToken && <UnauthView />}
      <div className="bg-white rounded-lg shadow-md p-4 flex items-start gap-2 flex-col">
        <h2 className="text-xl font-semibold text-gray-900">
          Set Playlist Duration
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 w-full ">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((hours) => (
            <ButtonUtils
              label={`${hours}h`}
              key={hours}
              onClick={() => setTargetDurationHours(hours)}
              className={`p-2  rounded-lg font-semibold transition-all cursor-pointer text-xs ${
                targetDurationHours === hours
                  ? "bg-slate-600 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Current Duration Display */}
        <div className="bg-purple-50 rounded-lg p-2 w-full ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Current Duration:</p>
              <p className="text-xl font-bold text-purple-900">
                {currentDuration.hours}h {currentDuration.minutes}m
              </p>
            </div>
            { (
              <div>
                <p className="text-xs text-gray-600">Target Duration:</p>
                <p className="text-xl font-bold text-slate-600">
                 {targetDurationHours}h
                </p>
              </div>
            )}
          </div>
          {targetDurationHours && currentDuration.totalMs > 0 && (
            <>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>
                  {Math.min(
                    100,
                    Math.round(
                      (currentDuration.totalMs /
                        (targetDurationHours * 60 * 60 * 1000)) *
                        100
                    )
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-slate-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      (currentDuration.totalMs /
                        (targetDurationHours * 60 * 60 * 1000)) *
                        100
                    )}%`,
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* Artist Selector for Filling */}
        <div className="">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select artists to complete your playlist:
          </label>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            {ARTISTS.map((artist) => {
              const isSelected = fillArtistIds.includes(artist.id);
              return (
                <ButtonUtils
                  label={artist.name}
                  key={artist.id}
                  onClick={() => toggleFillArtist(artist.id)}
                  className={`py-2 px-3 rounded-lg font-medium text-xs transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                />
              );
            })}
          </div>

          <p className="text-xs text-center text-gray-500 mt-2">
            {fillArtistIds.length > 0
              ? `Random songs from ${fillArtistIds.length} selected artist${
                  fillArtistIds.length !== 1 ? "s" : ""
                } will be added to reach ${targetDurationHours}h`
              : `Select one or more artists to fill your ${targetDurationHours}h playlist`}
          </p>
        </div>
        <ButtonUtils
          label={
            isFilling ? (
              <>
                <div className="animate-spin rounded-full border-b-2 border-white"></div>
                Filling playlist...
              </>
            ) : (
              <>
                <PiPlusCircle />
                Fill Playlist with {fillArtistIds.length} artist
                {fillArtistIds.length !== 1 ? "s" : ""}
              </>
            )
          }
          onClick={fillPlaylistToTarget}
          disabled={
            fillArtistIds.length === 0 ||
            isFilling ||
            !targetDurationHours ||
            currentDuration.totalMs >= targetDurationHours * 60 * 60 * 1000
          }
          className=" bg-slate-950 w-full hover:bg-slate-900 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DurationView;
