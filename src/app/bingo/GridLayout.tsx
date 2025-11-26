import { GridLayoutProps, SongDetails } from "@/types/lastfmtypes";
import React from "react";
import SongCard from "./SongCard";
import UserSection from "./UserSection";

const GridLayout = ({ songs, userExists, userInfo }: GridLayoutProps) => (
  <div className="flex flex-col gap-1">
    <div
      className="  text-xl text-purple-500 "
      style={{ textShadow: "0 0 0.75rem #a126e3" }}
    >
      <h1 className="flex flex-row gap-2 items-end justify-between font-extrabold">BTS SONGS
        <span className="text-xs" >RM-JIN-SUGA-JHOPE</span>
      </h1>
    </div>
    <div className=" w-full flex flex-row gap-4">
      <div className="  w-10 flex items-center justify-center   ">
        <p
          className=" font-extrabold text-5xl text-purple-500 "
          style={{ 
            textShadow: "0 0 0.75rem #a126e3", 
            transform: "rotate(-90deg)",
            transformOrigin: "center"
          }}
        >
          1BILLION
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full ">
        {songs.map((song, index) => (
          <SongCard
            key={index}
            song={song}
            isFound={(song as SongDetails).isFound}
          />
        ))}
        <UserSection userExists={userExists} userInfo={userInfo} />
      </div>
    </div>
  </div>
);

export default GridLayout;
