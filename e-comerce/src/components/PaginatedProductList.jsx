import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchProducts, 
  setLimit, 
  setOffset 
} from "../redux/actions/productActions";

const PaginatedProductList = () => {
  const dispatch = useDispatch();
  const { productList, total, fetchState } = useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24; // Sayfa başına ürün sayısı

  useEffect(() => {
    // Sayfa değiştiğinde offset'i güncelle
    const newOffset = (currentPage - 1) * itemsPerPage;
    dispatch(setLimit(itemsPerPage));
    dispatch(setOffset(newOffset));
    dispatch(fetchProducts());
  }, [currentPage, dispatch]);

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(total / itemsPerPage);

  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Sayfa numarası butonları için fonksiyon
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Aynı anda gösterilecek maksimum sayfa numarası
    
    // Başlangıç ve bitiş sayfalarını hesapla
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Başlangıç sayfasını tekrar ayarla
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // İlk sayfaya atlama butonu
    if (startPage > 1) {
      pageNumbers.push(
        <li key="first">
          <button 
            onClick={() => handlePageChange(1)} 
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700"
          >
            İlk
          </button>
        </li>
      );
    }

    // Önceki sayfa butonu
    if (currentPage > 1) {
      pageNumbers.push(
        <li key="prev">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700"
          >
            &lt;
          </button>
        </li>
      );
    }

    // Sayfa numaraları
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i}>
          <button
            onClick={() => handlePageChange(i)}
            className={`px-4 py-2 rounded-md ${
              currentPage === i 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {i}
          </button>
        </li>
      );
    }

    // Sonraki sayfa butonu
    if (currentPage < totalPages) {
      pageNumbers.push(
        <li key="next">
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700"
          >
            &gt;
          </button>
        </li>
      );
    }

    // Son sayfaya atlama butonu
    if (endPage < totalPages) {
      pageNumbers.push(
        <li key="last">
          <button 
            onClick={() => handlePageChange(totalPages)} 
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700"
          >
            Son
          </button>
        </li>
      );
    }

    return pageNumbers;
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
      {/* Toplam Ürün Bilgisi */}
      <div className="text-center mb-4 text-gray-600">
        Toplam {total} üründen {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, total)} arası gösteriliyor
      </div>

      {/* Ürün Listesi */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productList.map((product) => (
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
          <ul className="flex space-x-2 items-center">
            {renderPageNumbers()}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default PaginatedProductList;
