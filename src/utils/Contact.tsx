import Link from "next/link";
import React from "react";

const Contact = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full flex items-center justify-center text-center transition-all duration-150 max-sm:w-full text-[0.9rem] max-sm:text-[0.7rem] font-semibold   text-white z-10 ">
      <p className="backdrop-blur-sm bg-black/80 px-2  rounded-xs ">
        If you run into technical issues with the app, please reach out to:{" "}
        <Link
          className=" text-purple-400  "
          href="https://x.com/beyond_ARMY_"
          target="_blank"
          rel="noopener noreferrer"
        >
          @Beyond_ARMY_
        </Link>
        on X
      </p>
    </div>
  );
};

export default Contact;
