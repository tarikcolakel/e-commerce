import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productActions";

const PaginatedProductList = ({ gender, category }) => {
  const dispatch = useDispatch();
  const { productList, total, fetchState } = useSelector((state) => state.product);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = React.useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (fetchState === "FETCHING") {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (fetchState === "FAILED") {
    return (
      <div className="text-center text-red-500 p-4">
        An error occurred while loading products. Please try again later.
      </div>
    );
  }

  // Ürünleri filtrele
  const filteredProducts = productList.filter(product => {
    if (!gender && !category) return true; // Ana shop sayfasında tüm ürünleri göster
    
    const productGender = product.gender === 'k' ? 'kadin' : 'erkek';
    const matchesGender = !gender || productGender === gender.toLowerCase();
    const matchesCategory = !category || product.category?.name.toLowerCase() === category.toLowerCase();
    
    return matchesGender && matchesCategory;
  });

  const totalFilteredProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalFilteredProducts / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Kategori başlığını oluştur
  let title = "All Products";
  if (gender && category) {
    const genderText = gender.toLowerCase() === 'kadin' ? "Women's" : "Men's";
    title = `${genderText} ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  }

  return (
    <div className="p-4">
      <h2 className="text-center text-xl font-bold mb-2">{title}</h2>
      <p className="text-center text-gray-600 mb-6">
        Browse through our exclusive collection.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg"
          >
            <img
              src={product.images?.[0] || "https://via.placeholder.com/150"}
              alt={product.title}
              className="w-48 h-60 object-cover mb-4 rounded-md"
            />
            <div className="text-center">
              <h4 className="font-bold text-lg mb-1">{product.title}</h4>
              <p className="text-gray-500 mb-2">{product.category?.name}</p>
              <div className="flex justify-center items-center gap-2">
                {product.originalPrice && (
                  <span className="text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-blue-600 font-bold">${product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

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
          Last
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Showing {currentProducts.length} of {totalFilteredProducts} products
        </p>
      </div>
    </div>
  );
};

export default PaginatedProductList;
