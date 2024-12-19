import React, { useState } from "react";

const ProductCard = () => {
  const product = {
    name: "Floating Phone",
    mainImage: "https://via.placeholder.com/400x300", // Default Main Image
    images: [
      "https://via.placeholder.com/400x300",
      "https://via.placeholder.com/400x301",
      "https://via.placeholder.com/400x302",
    ],
    reviews: 10,
    price: 1139.33,
    inStock: true,
    description:
      "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.",
    colors: ["#00A8E8", "#FF4A4A", "#2ECC71", "#2C3E50"],
  };

  // Aktif resim index'ini tutmak için state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sol oka tıklanırsa
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  // Sağ oka tıklanırsa
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 flex justify-center">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-md p-6 w-full max-w-5xl">
        {/* Left: Product Images */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="relative">
            {/* Aktif Resmi Göster */}
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="rounded-md w-full h-auto"
            />
            {/* Sol Ok */}
            <div
              onClick={handlePrevImage}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 text-gray-500 cursor-pointer text-3xl px-2"
            >
              &#9664;
            </div>
            {/* Sağ Ok */}
            <div
              onClick={handleNextImage}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 text-gray-500 cursor-pointer text-3xl px-2"
            >
              &#9654;
            </div>
          </div>
          {/* Küçük Resimler */}
          <div className="flex mt-4 space-x-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`product-${index}`}
                className={`w-16 h-16 border rounded-md cursor-pointer ${
                  index === currentImageIndex ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setCurrentImageIndex(index)} // Küçük resme tıklanırsa
              />
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="w-full md:w-1/2 px-6">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <div className="flex items-center mb-2">
            <span className="text-yellow-400">★★★★☆</span>
            <span className="ml-2 text-gray-600">{product.reviews} Reviews</span>
          </div>
          <p className="text-xl font-semibold mb-2">${product.price}</p>
          <p className={`mb-4 ${product.inStock ? "text-green-500" : "text-red-500"}`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          {/* Colors */}
          <div className="flex space-x-2 mb-4">
            {product.colors.map((color, index) => (
              <span
                key={index}
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: color }}
              ></span>
            ))}
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Select Options
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
