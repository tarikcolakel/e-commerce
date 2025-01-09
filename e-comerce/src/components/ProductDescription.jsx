import React from "react";

const ProductDescription = ({ description }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Ürün Açıklaması</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
