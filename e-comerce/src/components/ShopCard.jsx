import React from "react";

const ShopCard = () => {
  const images = [
    "https://via.placeholder.com/300x200", 
    "https://via.placeholder.com/300x200", 
    "https://via.placeholder.com/300x200", 
    "https://via.placeholder.com/300x200", 
    "https://via.placeholder.com/300x200"
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-6">
      {images.map((image, index) => (
        <div key={index} className="relative">
          <img src={image} alt={`Shop Item ${index + 1}`} className="w-full h-full object-cover rounded-lg shadow-md" />
          
          {/* Text Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4">
            <h2 className="text-2xl font-bold">CLOTHS</h2>
            <p className="mt-2 text-lg">5 Items</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ShopCard;
