import React from "react";

const products = [
  {
    id: 1,
    title: "Graphic Design",
    department: "English Department",
    oldPrice: "$16.48",
    newPrice: "$6.48",
    imgSrc: "https://via.placeholder.com/300x300?text=Product+1",
  },
  {
    id: 2,
    title: "Graphic Design",
    department: "English Department",
    oldPrice: "$16.48",
    newPrice: "$6.48",
    imgSrc: "https://via.placeholder.com/300x300?text=Product+2",
  },
  {
    id: 3,
    title: "Graphic Design",
    department: "English Department",
    oldPrice: "$16.48",
    newPrice: "$6.48",
    imgSrc: "https://via.placeholder.com/300x300?text=Product+3",
  },
  {
    id: 4,
    title: "Graphic Design",
    department: "English Department",
    oldPrice: "$16.48",
    newPrice: "$6.48",
    imgSrc: "https://via.placeholder.com/300x300?text=Product+4",
  },
  {
    id: 5,
    title: "Graphic Design",
    department: "English Department",
    oldPrice: "$16.48",
    newPrice: "$6.48",
    imgSrc: "https://via.placeholder.com/300x300?text=Product+5",
  },
  {
    id: 6,
    title: "Graphic Design",
    department: "English Department",
    oldPrice: "$16.48",
    newPrice: "$6.48",
    imgSrc: "https://via.placeholder.com/300x300?text=Product+6",
  },
  {
    id: 7,
    title: "Graphic Design",
    department: "English Department",
    oldPrice: "$16.48",
    newPrice: "$6.48",
    imgSrc: "https://via.placeholder.com/300x300?text=Product+7",
  },
  {
    id: 8,
    title: "Graphic Design",
    department: "English Department",
    oldPrice: "$16.48",
    newPrice: "$6.48",
    imgSrc: "https://via.placeholder.com/300x300?text=Product+8",
  },
];

const BestsellerProduct = () => {
  return (
    <div className="p-4">
      <h2 className="text-center text-xl font-bold mb-2">BESTSELLER PRODUCTS</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center bg-white shadow-md p-4 rounded"
          >
            {/* Product Image */}
            <img
              src={product.imgSrc}
              alt={product.title}
              className="w-full h-64 object-cover mb-4 rounded"
            />

            {/* Product Info */}
            <div className="text-center">
              <h4 className="font-bold text-lg mb-1">{product.title}</h4>
              <p className="text-gray-500 mb-2">{product.department}</p>
              <div className="flex justify-center items-center gap-2">
                <span className="text-gray-400 line-through">
                  {product.oldPrice}
                </span>
                <span className="text-green-600 font-bold">
                  {product.newPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestsellerProduct;
