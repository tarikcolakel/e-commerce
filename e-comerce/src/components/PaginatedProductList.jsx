import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { setCurrentPage } from '../redux/reducers/productReducer';
import { fetchProducts } from '../redux/actions/productActions';

const PaginatedProductList = () => {
  const dispatch = useDispatch();
  const { 
    products = [],  // Default boş dizi
    total, 
    itemsPerPage = 25,     // Default limit
    currentPage = 1 // Default sayfa
  } = useSelector((state) => state.product);

  // Sayfa değiştiğinde
  const handlePageChange = (selectedPage) => {
    // Yeni sayfayı güncelle
    dispatch(setCurrentPage(selectedPage.selected + 1));
    
    // Ürünleri yeniden getir
    dispatch(fetchProducts());
  };

  // Toplam sayfa sayısını hesapla
  const pageCount = Math.ceil(total / itemsPerPage);

  return (
    <div>
      {/* Toplam Ürün Bilgisi */}
      <div className="text-center mb-4 text-gray-600">
        Toplam {total} üründen {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, total)} arası gösteriliyor
      </div>

      {/* Ürün listesi */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
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

      {/* Pagination */}
      {total > itemsPerPage && (
        <div className="flex justify-center mt-8">
          <ReactPaginate
            previousLabel={'Önceki'}
            nextLabel={'Sonraki'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            forcePage={currentPage - 1}
            containerClassName={'flex space-x-2'}
            pageClassName={'px-3 py-1 border rounded'}
            activeClassName={'bg-blue-500 text-white'}
            previousClassName={'px-3 py-1 border rounded'}
            nextClassName={'px-3 py-1 border rounded'}
          />
        </div>
      )}
    </div>
  );
};

export default PaginatedProductList;
