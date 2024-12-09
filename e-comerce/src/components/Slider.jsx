
import React from "react";

const Slider = () => {
  return (
    <div className="relative">
      <img
        src="https://via.placeholder.com/800x400/00AEEF/FFFFFF?text=New+Collection"
        alt="New Collection"
        className="w-full"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-start text-white px-4">
        <p className="text-sm uppercase">Summer 2020</p>
        <h2 className="text-2xl font-bold">New Collection</h2>
        <p className="text-sm">
          We know how large objects will act, but things on a small scale.
        </p>
        <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Slider;
