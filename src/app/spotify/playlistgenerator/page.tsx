"use client";
import Image from "next/image";
import { ARTISTS } from "../Data/btspotify";
import useSpotify from "../../../hooks/useSpotify";
import { ButtonUtils } from "@/utils/ButtonUtils";
import { PiPlusCircle } from "react-icons/pi";

// Marcar como dinámico porque depende de interacción del usuario y OAuth
export const dynamic = 'force-dynamic';

const PlaylistGenerator = () => {
  const {
    searchResults,
    setSearchQuery,
    loading,
    setArtistFilter,
    hasSearched,
    isCreatingPlaylist,
    notifications,
    removeNotification,
    toggleTrackSelection,
    updateQuantity,
    generatePlaylist,
    totalSongs,
    handleLogout,
    accessToken,
    selectedTracks,
    searchQuery,
    artistFilter,
    targetDurationHours,
    setTargetDurationHours,
    fillArtistIds,
    toggleFillArtist,
    currentDuration,
    fillPlaylistToTarget,
    isFilling,
    clearAll,
  } = useSpotify();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-100 to-violet-100 p-2 flex flex-col items-center gap-2">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`rounded-lg shadow-lg p-4 flex items-start gap-3 animate-slide-in ${
              notification.type === "success"
                ? "bg-green-50 border-l-4 border-green-500"
                : notification.type === "error"
                ? "bg-red-50 border-l-4 border-red-500"
                : "bg-blue-50 border-l-4 border-blue-500"
            }`}
          >
            <div className="flex-shrink-0">
              {notification.type === "success" && (
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              {notification.type === "error" && (
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              {notification.type === "info" && (
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h4
                className={`font-semibold text-sm ${
                  notification.type === "success"
                    ? "text-green-900"
                    : notification.type === "error"
                    ? "text-red-900"
                    : "text-blue-900"
                }`}
              >
                {notification.message}
              </h4>
              {notification.description && (
                <p
                  className={`text-sm mt-1 ${
                    notification.type === "success"
                      ? "text-green-700"
                      : notification.type === "error"
                      ? "text-red-700"
                      : "text-blue-700"
                  }`}
                >
                  {notification.description}
                </p>
              )}
            </div>
            <ButtonUtils
              label="✕"
              onClick={() => removeNotification(notification.id)}
              className={`flex-shrink-0 ${
                notification.type === "success"
                  ? "text-green-400 hover:text-green-600"
                  : notification.type === "error"
                  ? "text-red-400 hover:text-red-600"
                  : "text-blue-400 hover:text-blue-600"
              }`}
            />
          </div>
        ))}
      </div>{" "}
      <h1 className="text-4xl font-bold text-purple-900">
        BTS Playlist Generator
      </h1>
      <div className="flex flex-wrap w-full gap-4 justify-center">
        {/* //TODO: RIGHT SIDE */}
        <div>
          {/* Search and Filter Section */}
          {/* Login/Logout and Action Buttons */}
          <div className="flex flex-row gap-2 justify-center">
            {accessToken ? (
              <>
                <ButtonUtils
                  label={"Create Playlist"}
                  onClick={generatePlaylist}
                  disabled={isCreatingPlaylist || selectedTracks.size === 0}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold p-2 rounded-lg transition-colors duration-200 flex items-center gap-3 shadow-lg text-lg"
                />

                <ButtonUtils
                  label="Logout"
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold p-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                />

                <ButtonUtils
                  label="Clear All"
                  onClick={clearAll}
                  disabled={
                    selectedTracks.size === 0 &&
                    !targetDurationHours &&
                    fillArtistIds.length === 0
                  }
                  className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                />
              </>
            ) : (
              <ButtonUtils
                label="Login"
                onClick={generatePlaylist}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold p-2 rounded-lg transition-colors duration-200 flex items-center gap-3 shadow-lg text-lg"
              />
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Songs
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by song or artist name..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Artist
                </label>
                <select
                  value={artistFilter}
                  onChange={(e) => setArtistFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Artists</option>
                  {ARTISTS.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                {hasSearched
                  ? `Found ${searchResults.length} songs`
                  : "Type at least 2 characters to search"}
              </span>
              <span>
                Selected: {selectedTracks.size} songs ({totalSongs} total in
                playlist)
              </span>
            </div>
          </div>
          {/* Available Tracks */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Search Results
              </h2>
              {loading && (
                <div className="flex items-center gap-2 text-purple-600">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                  <span className="text-sm">Searching...</span>
                </div>
              )}
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {!hasSearched ? (
                <div className="text-center text-gray-500 py-16">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <p className="text-lg font-medium">
                    Start searching for BTS songs
                  </p>
                  <p className="text-sm mt-2">
                    Type at least 2 characters to search by song name, artist,
                    or album
                  </p>
                </div>
              ) : loading ? (
                <div className="text-center text-gray-500 py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p>Loading songs...</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center text-gray-500 py-16">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
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
                      className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                        isSelected
                          ? "bg-purple-100 border-2 border-purple-400"
                          : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {track.album.images[0] && (
                          <Image
                            src={track.album.images[0].url}
                            alt={track.album.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {track.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {track.artists.map((a) => a.name).join(", ")} •{" "}
                            {track.album.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleTrackSelection(track)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            isSelected
                              ? "bg-red-500 hover:bg-red-600 text-white"
                              : "bg-purple-600 hover:bg-purple-700 text-white"
                          }`}
                        >
                          {isSelected ? "Remove" : "Add"}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          {/* Selected Tracks Summary */}
        </div>

        {/* //TODO: LEFT SIDE */}
        <div className="flex flex-col gap-2 w-auto">
          <p className="text-center text-gray-600">
            Search, select, and create your custom BTS playlist
          </p>

          {/* Duration Selector Section */}
          {selectedTracks.size > 0 && (
            <div className="bg-purple-50 rounded-lg shadow-md p-6 mb-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-purple-900">
                  Selected Songs ({totalSongs} total)
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Manage your selected songs below
                </p>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {Array.from(selectedTracks.values()).map(
                  ({ track, quantity }) => (
                    <div
                      key={track.id}
                      className="flex items-center justify-between bg-white p-3 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {track.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {track.artists.map((a) => a.name).join(", ")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(track.id, -1)}
                          className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(track.id, 1)}
                          className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                        <button
                          onClick={() => toggleTrackSelection(track)}
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-start gap-2 flex-col">
            <h2 className="text-xl font-semibold text-gray-900">
              Set Playlist Duration
            </h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3 ">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((hours) => (
                <ButtonUtils
                  label={`${hours}h`}
                  key={hours}
                  onClick={() => setTargetDurationHours(hours)}
                  className={`p-2  rounded-lg font-semibold transition-all text-xs ${
                    targetDurationHours === hours
                      ? "bg-purple-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Current Duration Display */}
            <div className="bg-purple-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current Duration:</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {currentDuration.hours}h {currentDuration.minutes}m
                  </p>
                </div>
                {targetDurationHours && (
                  <div>
                    <p className="text-sm text-gray-600">Target Duration:</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {targetDurationHours}h
                    </p>
                  </div>
                )}
              </div>
              {targetDurationHours && currentDuration.totalMs > 0 && (
                <div className="mt-3">
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
                      className="bg-purple-600 h-2 rounded-full transition-all"
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
                </div>
              )}
            </div>

            {/* Artist Selector for Filling */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select artists to complete your playlist:
              </label>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
                {ARTISTS.map((artist) => {
                  const isSelected = fillArtistIds.includes(artist.id);
                  return (
                    <ButtonUtils
                      label={artist.name}
                      key={artist.id}
                      onClick={() => toggleFillArtist(artist.id)}
                      className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                        isSelected
                          ? "bg-purple-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    />
                  );
                })}
              </div>
              <button
                onClick={fillPlaylistToTarget}
                disabled={
                  fillArtistIds.length === 0 ||
                  isFilling ||
                  !targetDurationHours ||
                  currentDuration.totalMs >=
                    targetDurationHours * 60 * 60 * 1000
                }
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isFilling ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Filling playlist...
                  </>
                ) : (
                  <>
                    <PiPlusCircle />
                    Fill Playlist with {fillArtistIds.length} artist
                    {fillArtistIds.length !== 1 ? "s" : ""}
                  </>
                )}
              </button>
              <p className="text-xs text-gray-500 mt-2">
                {fillArtistIds.length > 0
                  ? `Random songs from ${fillArtistIds.length} selected artist${
                      fillArtistIds.length !== 1 ? "s" : ""
                    } will be added to reach ${targetDurationHours}h`
                  : `Select one or more artists to fill your ${targetDurationHours}h playlist`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistGenerator;
