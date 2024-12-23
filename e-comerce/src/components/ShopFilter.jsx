import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/reducers/categoryReducer';
import { setCategory, fetchProducts } from '../redux/actions/productActions';
import { ChevronDown, Grid2x2, ListChecks } from "lucide-react";
import { useParams } from "react-router-dom";

const ShopFilter = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);
  const { gender } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // Mevcut gender'a göre kategorileri filtrele
  const currentGenderCategories = categories.filter(cat => 
    gender ? cat.gender.toLowerCase() === gender.toLowerCase() : true
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    dispatch(setCategory(category.id));
    dispatch(fetchProducts());
    setIsFilterOpen(false);
  };

  const handleResetCategory = () => {
    setSelectedCategory(null);
    dispatch(setCategory(null)); // Tüm kategoriler için null gönder
    dispatch(fetchProducts());
    setIsFilterOpen(false);
  };

  if (status === 'loading') {
    return <div className="p-6">Kategoriler yükleniyor...</div>;
  }

  if (status === 'failed') {
    return <div className="p-6">Kategoriler yüklenirken hata oluştu</div>;
  }

  return (
    <section className="flex flex-col md:flex-row justify-between items-center p-6 bg-white shadow-md">
      {/* Mevcut Kategori Bilgisi */}
      <div className="text-lg font-medium md:order-1">
        {selectedCategory ? (
          <span>
            {gender ? `${gender.charAt(0).toUpperCase() + gender.slice(1)} / ` : ''}
            {selectedCategory.title}
          </span>
        ) : (
          <span>Tüm Kategoriler</span>
        )}
      </div>

      {/* Kategori Filtresi */}
      <div className="flex items-center gap-4 md:order-2">
        <span className="text-lg font-medium">Kategoriler:</span>
        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50"
          >
            {selectedCategory ? selectedCategory.title : 'Tüm Kategoriler'}
            <ChevronDown className="w-4 h-4" />
          </button>
          {isFilterOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white border shadow-lg rounded-md w-64 z-10 max-h-80 overflow-y-auto">
              {/* Tüm Kategoriler seçeneği */}
              <button
                onClick={handleResetCategory}
                className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                Tüm Kategoriler
              </button>
              
              {/* Gender'a göre kategoriler */}
              {currentGenderCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                >
                  {category.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Görünüm Seçenekleri */}
      <div className="flex items-center gap-4 md:order-3">
        <span className="text-lg font-medium">Görünüm:</span>
        <div className="flex gap-4">
          <Grid2x2 className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600" />
          <ListChecks className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600" />
        </div>
      </div>

      {/* Sağ Kısım: Sıralama ve Filtre Butonları */}
      <div className="flex gap-4 md:order-3">
        <div className="relative">
          <button className="flex items-center space-x-2 text-lg font-medium p-2 border rounded-md hover:bg-gray-100">
            <span>Popülerlik</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <div className="relative">
          <button 
            className="flex items-center space-x-2 text-lg font-medium p-2 border rounded-md hover:bg-gray-100"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <span>Filtre</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopFilter;
