import useBingo from "@/hooks/useBingo";
import { UserSectionProps } from "@/types/lastfmtypes";
import Image from "next/image";
import React from "react";
import { FaUser } from "react-icons/fa";

const UserSection = ({ userExists, userInfo }: UserSectionProps) => {
  const { result } = useBingo();
  if (userExists === false) {
    return (
      <div className=" flex flex-row items-center justify-between rounded-xs bg-gradient-to-br from-orange-50 to-red-50 p-2 ">
        <div className="text-xs text-orange-700 text-center">
          <p className="text-sm font-semibold text-orange-600">
            User not found
          </p>
          <p>The username doesn&apos;t exist</p>
          <p>Try again.</p>
        </div>
        <div className="w-14 h-14 bg-orange-200 text-orange-600 rounded-full flex items-center justify-center ">
          <FaUser />
        </div>
      </div>
    );
  }
  if (userInfo) {
    return (
      <div className=" w-full flex flex-col items-center justify-between text-white  ">
        <div className="flex flex-row w-full  items-center justify-between gap-2 px-2 py-2  backdrop-blur-sm bg-black/10  shadow-md  ">
          <div className=" ">
            <h2 className="text-sm max-sm:text-xs font-bold text-gray-100">
              {userInfo.name}
            </h2>
            {userInfo.realname && (
              <p className="text-gray-100">{userInfo.realname}</p>
            )}
            <p className="text-xs text-gray-500">
              {parseInt(userInfo.playcount || "0").toLocaleString()} scrobbles
            </p>
          </div>
          {userInfo.image ? (
            <Image
              src={userInfo.image}
              alt={`${userInfo.name} profile`}
              width={60}
              height={60}
              className="rounded-full border-2 border-purple-300  shadow-lg"
              style={{
                filter: "drop-shadow(0 0 0.75rem #a126e3)",
              }}
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <FaUser />
            </div>
          )}
        </div>

        {!result?.found ? (
          <span className="text-[0.5rem]">
            {" "}
            You haven&apos;t listent to all the songs within the last hour, no
            BINGO this time{" "}
          </span>
        ) : (
          <span className="text-lg font-semibold text-center ">
            🎉 BINGO 🎉
            <br />
            <span className="text-[0.5rem] font-semibold ">
              You have listened to all the songs within the last hour{" "}
            </span>
          </span>
        )}
      </div>
    );
  }
  // Estado inicial - no se ha hecho ninguna verificación
  return (
    <div className="flex items-center justify-between flex-row rounded-lg bg-gradient-to-br from-purple-300 to-purle-400  px-4 py-1">
      <p className="text-sm font-extrabold text-black ">User</p>
      <div className="w-14 h-14 bg-purple-200 rounded-full border flex items-center justify-center mb-2 ">
        <FaUser />
      </div>
    </div>
  );
};

export default UserSection;
