import { GridLayoutProps, SongDetails } from "@/types/lastfmtypes";
import React from "react";
import SongCard from "./SongCard";
import UserSection from "./UserSection";

const GridLayout = ({ songs, userExists, userInfo }: GridLayoutProps) => (
  <div className=" w-full">
    <div className="grid grid-cols-2 gap-1 ">
      {songs.slice(0, 2).map((song, index) => (
        <SongCard
          key={index}
          song={song}
          isFound={(song as SongDetails).isFound}
        />
      ))}

      {songs.slice(2, 4).map((song, index) => (
        <SongCard
          key={index + 2}
          song={song}
          isFound={(song as SongDetails).isFound}
        />
      ))}
      <UserSection userExists={userExists} userInfo={userInfo} />
    </div>
  </div>
);

export default GridLayout;
