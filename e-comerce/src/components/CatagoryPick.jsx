import React from "react";

const CategoryPick = () => {
  return (
    <section className="p-6 bg-gray-50">
     
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-3xl font-bold">EDITOR'S PICK</h2>
        <p className="text-sm md:text-lg text-gray-600 mt-2">
          Problems trying to resolve the conflict between
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
       
        <div className="md:col-span-2 relative">
          <img
            src="image/men.jpg"
            alt="Men"
            className="w-full h-full object-cover"
          />
          <button className="absolute bottom-4 left-4 bg-white text-black px-4 py-2 text-sm font-medium shadow-md hover:bg-gray-100">
            MEN
          </button>
        </div>

        
        <div className="relative">
          <img
            src="image/women.jpg"
            alt="Women"
            className="w-full h-full object-cover"
          />
          <button className="absolute bottom-4 left-4 bg-white text-black px-4 py-2 text-sm font-medium shadow-md hover:bg-gray-100">
            WOMEN
          </button>
        </div>

        
        <div className="flex flex-col gap-4">
          
          <div className="relative h-full">
            <img
              src="image/accessories.jpg"
              alt="Accessories"
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-4 left-4 bg-white text-black px-4 py-2 text-sm font-medium shadow-md hover:bg-gray-100">
              ACCESSORIES
            </button>
          </div>
        
          <div className="relative h-full">
            <img
              src="image/kids.jpg"
              alt="Kids"
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-4 left-4 bg-white text-black px-4 py-2 text-sm font-medium shadow-md hover:bg-gray-100">
              KIDS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPick;
