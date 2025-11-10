import useBingo from "@/hooks/useBingo";
import { UserSectionProps } from "@/types/lastfmtypes";
import Image from "next/image";
import React from "react";
import { FaUser } from "react-icons/fa";

const UserSection = ({ userExists, userInfo }: UserSectionProps) => {
  const { result } = useBingo();
  if (userExists === false) {
    return (
      <div className="col-span-2 flex flex-col items-center justify-center">
        <div className=" flex flex-col items-center border rounded-lg bg-gradient-to-br from-orange-50 to-red-50 border-orange-300 p-2 ">
          <div className="w-20 h-20 bg-orange-200 text-orange-600 rounded-full flex items-center justify-center ">
            <FaUser />
          </div>
          <p className="text-sm font-semibold text-orange-600">
            User not found
          </p>
          <div className="text-xs text-orange-700 text-center">
            <p>The username doesn&apos;t exist</p>
            <p>Try again.</p>
          </div>
        </div>
      </div>
    );
  }
  if (userInfo) {
    return (
      <div className="col-span-2 w-auto flex flex-col items-center justify-center  ">
        <div className="flex flex-row  items-center justify-between gap-2 px-2 py-2  backdrop-blur-sm bg-black/10  shadow-md  ">
          {userInfo.image ? (
            <Image
              src={userInfo.image}
              alt={`${userInfo.name} profile`}
              width={60}
              height={60}
              className="rounded-full border-2 border-white shadow-lg"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <FaUser />
            </div>
          )}
          <div className="text-center ">
            <h2 className="text-sm max-sm:text-xs font-bold text-gray-900">
              {userInfo.name}
            </h2>
            {userInfo.realname && (
              <p className="text-gray-900">{userInfo.realname}</p>
            )}
            <p className="text-xs text-gray-500">
              {parseInt(userInfo.playcount || "0").toLocaleString()} scrobbles
            </p>
          </div>
        </div>

        {!result?.found ? (
          <span className="text-[0.5rem]" > Song(s) is missing, you can not save your card </span>
        ) : (
          <span className="text-lg font-semibold text-center ">🎉 BINGO 🎉
          
           <br/>
           <span className="text-[0.5rem] font-semibold ">You have listened to all the songs within the last hour </span>
          </span>
          
        )}
      </div>
    );
  }
  // Estado inicial - no se ha hecho ninguna verificación
  return (
    <div className="col-span-2 w-auto flex flex-col items-center justify-center ">
      <div className="flex items-center flex-col rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 border-gray-300 px-4 py-1 border">
        <div className="w-14 h-14 bg-gray-400 rounded-full border flex items-center justify-center mb-2 ">
          <FaUser />
        </div>
        <p className="text-sm font-semibold text-gray-800 ">User</p>
      </div>
    </div>
  );
};

export default UserSection;
