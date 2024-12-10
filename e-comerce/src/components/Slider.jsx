import React from "react";

const Slider = () => {
  return (
    <div className="relative z-10">
      <img
        src="image/d491d421800e62998b9af7c838cc25d1.jpg"
        alt="New Collection"
        className="w-full " 
      />
      <div
        className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 text-center"
      >
        <p className="text-sm uppercase tracking-wide md:text-lg">Summer 2020</p>
        <h2 className="text-2xl font-bold md:text-4xl">New Collection</h2>
        <p className="text-sm mt-2 max-w-md md:text-base">
          We know how large objects will act, but things on a small scale.
        </p>
        <button
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded md:px-8 md:py-3"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Slider;
