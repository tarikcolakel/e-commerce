import React, { useState } from "react";

const PaginatedProductList = () => {
  const allProducts = Array.from({ length: 36 }, (_, i) => ({
    title: `Product ${i + 1}`,
    department: `Department ${i + 1}`,
    oldPrice: `$${(Math.random() * 20 + 10).toFixed(2)}`,
    newPrice: `$${(Math.random() * 10 + 5).toFixed(2)}`,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const currentProducts = allProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      <h2 className="text-center text-xl font-bold mb-2">Our Products</h2>
      <h3 className="text-center text-2xl font-bold mb-4">Paginated Products</h3>
      <p className="text-center text-gray-600 mb-6">
        Browse through our exclusive collection.
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg"
          >
            <img
              src={`https://via.placeholder.com/150?text=Product+${(currentPage - 1) * itemsPerPage + index + 1}`}
              alt={product.title}
              className="w-48 h-60 object-cover mb-4 rounded-md"
            />
            <div className="text-center">
              <h4 className="font-bold text-lg mb-1">{product.title}</h4>
              <p className="text-gray-500 mb-2">{product.department}</p>
              <div className="flex justify-center items-center gap-2">
                <span className="text-gray-400 line-through">{product.oldPrice}</span>
                <span className="text-green-600 font-bold">{product.newPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          First
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedProductList;
