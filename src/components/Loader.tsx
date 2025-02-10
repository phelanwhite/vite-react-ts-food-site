import React from "react";
import { GiCampCookingPot } from "react-icons/gi";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 text-white flex items-center justify-center">
      <div className="flex flex-col gap-2 justify-center items-center">
        <GiCampCookingPot size={32} className="animate-bounce" />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
