import React from "react";

const C2A = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-gray-100">
      
      <div className="w-full md:w-1/2 h-full">
        <img
          src="https://via.placeholder.com/500"
          alt="Summer 2020"
          className="w-full h-full object-cover"
        />
      </div>

      
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-4 md:items-start md:text-left">
       
        <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left">SUMMER 2020</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-center md:text-left">Part of the Neural</h3>
        <h3 className="text-4xl md:text-5xl font-bold text-center md:text-left">Universe</h3>

        
        <p className="text-lg text-gray-700 text-center md:text-left">
          We know how large objects will act,
        </p>
        <p className="text-lg text-gray-700 text-center md:text-left">
          but things on a small scale.
        </p>

        
        <div className="flex flex-col md:flex-row gap-4 mt-6  justify-center md:justify-start">
          
          
          
          <button className="bg-[#23A6F0] text-white py-2 px-6 rounded-lg md:w-auto md:bg-[#2DC071] md:text-white">
            BUT NOW
          </button>

          
          <button className="bg-white text-[#23A6F0] py-2 px-6 border border-[#2DC071] rounded-lg md:w-auto md:bg-white md:text-[#2DC071] ">
            READ MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default C2A;
