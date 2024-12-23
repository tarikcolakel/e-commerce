import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productActions";

const PaginatedProductList = () => {
  const dispatch = useDispatch();
  const { productList, total, fetchState } = useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Sayfalama için ürünleri böl
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = productList.slice(indexOfFirstItem, indexOfLastItem);

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(productList.length / itemsPerPage);

  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  return (
    <div>
      {/* Ürün Listesi */}
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

      {/* Sayfalama */}
      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Toplam ürün sayısı bilgisi */}
      <div className="text-center mt-6 text-gray-600">
        Toplam {total} ürün içinden {currentProducts.length} ürün gösteriliyor
      </div>
    </div>
  );
};

export default PaginatedProductList;
