import Link from "next/link";
import React from "react";

const Contact = () => {
  return (
    <div className="relative w-full max-sm:w-full text-purple-500 text-[0.9rem] dark:text-[#1a012d] max-sm:text-[0.5rem] font-extrabold">
      If you run into technical issues with the app, please reach out to:{" "}
      <Link
        className="  hover:text-violet-400 text-violet-300 dark:text-violet-700"
        href="https://x.com/beyond_ARMY_"
        target="_blank"
        rel="noopener noreferrer"
      >
        @Beyond_ARMY_
      </Link> on X
    </div>
  );
};

export default Contact;
