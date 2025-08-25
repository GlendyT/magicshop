import Link from "next/link";
import React from "react";

const Contact = () => {
  return (
    <div className="flex absolute">
      <div className="fixed bottom-0 left-0 w-full flex items-center justify-center text-center transition-all duration-150 max-sm:w-full text-[0.9rem] max-sm:text-[0.6rem] font-semibold backdrop-blur-sm bg-black/30   text-white  ">
        If you run into technical issues with the app, please reach out to:{" "}
        <Link
          className=" text-purple-200  "
          href="https://x.com/beyond_ARMY_"
          target="_blank"
          rel="noopener noreferrer"
        >
          @Beyond_ARMY_
        </Link>{" "}
        on X
      </div>
    </div>
  );
};

export default Contact;
