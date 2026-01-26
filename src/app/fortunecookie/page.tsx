"use client";
import { useState, useEffect } from "react";
import { fortuneCookieList } from "./data/fortuneCookieList";
import { ButtonUtils } from "@/utils/ButtonUtils";

const FortuneStyle = () => (
  <div className="flex flex-row h-3 justify-between">
    <div className="bg-purple-800 w-20 " />
    <div className="bg-white w-80 " />
    <div className="bg-purple-800 w-20" />
  </div>
);

const FortuneCookie = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % fortuneCookieList.length);
    }, 500);
    return () => clearInterval(interval);
  }, [isRunning]);

  const currentFortune = fortuneCookieList[currentIndex];

  return (
    <div className="min-h-screen flex flex-col gap-8 items-center justify-center bg-purple-200">
      <h1 className=" text-center font-extrabold text-purple-900">
        What Bangtan
        <br />
        afirmation do you
        <br /> need to hear today?
      </h1>

      <div className=" w-72 border border-purple-200 bg-white">
        <FortuneStyle />
        <div className=" text-center text-xs py-2 px-14">
          <h1 className="font-semibold"> {currentFortune.message} </h1>
        </div>
        <FortuneStyle />
      </div>
      <div>
        <h1 className=" text-center font-extrabold text-purple-900">
          {" "}
          {currentFortune.song}{" "}
        </h1>
      </div>

      <ButtonUtils
        label={isRunning ? "Stop" : "Start"}
        onClick={() => setIsRunning(!isRunning)}
        className="px-6 py-2 bg-purple-600 text-white roundeed-lg "
      />
    </div>
  );
};

export default FortuneCookie;
