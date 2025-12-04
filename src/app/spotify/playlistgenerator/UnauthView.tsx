import React from "react";
import { FaLock } from "react-icons/fa";

const UnauthView = () => {
  return (
    <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-xs z-10 rounded-lg flex items-center justify-center">
      <div className="bg-white flex flex-col gap-2 items-center rounded-lg shadow-xl p-6 text-center max-w-sm mx-4">
        <FaLock/>
        <h3 className="text-xl font-bold text-gray-900">Login Required</h3>
        <p className="text-gray-600 ">
          Please login with Spotify to search and add songs to your playlist
        </p>
      </div>
    </div>
  );
};

export default UnauthView;
