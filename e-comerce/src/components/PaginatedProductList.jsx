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
      <div className="flex justify-center items-center min-h-[400px] w-full">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Ürünler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (fetchState === "FAILED") {
    return (
      <div className="text-center text-red-500 p-4">
        Ürünler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.
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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-xl font-bold mb-2">{title}</h2>
      <p className="text-center text-gray-600 mb-6">
        Browse through our exclusive collection.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <img 
                src={product.images[0]?.url || 'https://via.placeholder.com/300'} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              {product.stock <= 10 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Az Stok
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold mb-2 truncate">{product.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">
                  {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                </span>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-sm">{product.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Satılan: {product.sell_count}
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
