import React, { useState } from "react";

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 flex justify-center">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-md p-6 w-full max-w-5xl">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="relative">
            <img
              src={product.images[currentImageIndex]?.url}
              alt={product.name}
              className="rounded-md w-full h-auto"
            />
            <div
              onClick={handlePrevImage}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 text-gray-500 cursor-pointer text-3xl px-2"
            >
              &#9664;
            </div>
            <div
              onClick={handleNextImage}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 text-gray-500 cursor-pointer text-3xl px-2"
            >
              &#9654;
            </div>
          </div>
          <div className="flex mt-4 space-x-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={`${product.name}-${index}`}
                className={`w-16 h-16 border rounded-md cursor-pointer ${
                  index === currentImageIndex ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 px-6">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <div className="flex items-center mb-2">
            <span className="text-yellow-400">★</span>
            <span className="ml-2 text-gray-600">{product.rating} Puan</span>
          </div>
          <p className="text-xl font-semibold mb-2">
            {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
          </p>
          <p className={`mb-4 ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
            {product.stock > 0 ? `Stokta (${product.stock} adet)` : "Stokta Yok"}
          </p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="mb-4">
            <p className="text-gray-600">Satış: {product.sell_count}</p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full">
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
