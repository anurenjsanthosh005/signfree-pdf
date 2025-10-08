import React from "react";
import Loader from "../UI/Loader";

function Download() {
  return (
    <div
      className="
    container mx-auto 
    text-lg sm:text-xl md:text-2xl font-bold 
    flex flex-col justify-center items-center 
    bg-[#134686] text-white 
    min-h-[150px] 
    w-[300px] sm:w-[400px] md:w-[700px] lg:w-[800px] 
    rounded-xl p-4
    gap-5
  "
    >
      <h1>Downloading</h1>
      <Loader />
    </div>
  );
}

export default Download;
