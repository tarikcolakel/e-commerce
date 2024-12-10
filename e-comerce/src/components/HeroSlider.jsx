import React from "react";

const HeroSlider = () => {
  return (
    <section className="bg-[#23856D] py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        
        <div className="text-white md:w-1/2 text-center md:text-left">
          <h2 className="text-xl font-bold mb-4">SUMMER 2020</h2>
          <h3 className="text-4xl font-bold mb-4">Vita Classic</h3>
          <h4 className="text-4xl font-bold mb-4">Product</h4>
          <p className="text-lg mb-4">
            We know how large objects will act, We know how are objects will
            act, We know
          </p>
          <div className="flex items-center justify-center md:justify-start mb-4">
            <span className="text-2xl font-bold mr-4">$16.48</span>
            <button
              className="bg-[#2DC071] text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-green-600"
            >
              ADD TO CART
            </button>
          </div>
        </div>

        
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src="https://via.placeholder.com/500x500?text=Product+Image"
            alt="Product"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
