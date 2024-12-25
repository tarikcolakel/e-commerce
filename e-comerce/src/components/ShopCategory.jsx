import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/reducers/categoryReducer';
import { useParams } from 'react-router-dom';

const ShopCategory = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);
  const { gender } = useParams();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // Gender'a göre kategorileri filtrele ve rating'e göre sırala
  const filteredCategories = categories
    .filter(cat => gender ? cat.gender.toLowerCase() === gender.toLowerCase() : true)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  if (status === 'loading') {
    return <div className="container mx-auto px-4 py-4">Kategoriler yükleniyor...</div>;
  }

  if (status === 'failed') {
    return <div className="container mx-auto px-4 py-4">Kategoriler yüklenemedi</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredCategories.map((category) => (
          <div 
            key={category.id} 
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative pt-[100%]">
              <img 
                src={category.img} 
                alt={category.title} 
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-3 text-center">
              <h3 className="text-sm font-semibold text-gray-800">{category.title}</h3>
              <div className="flex items-center justify-center mt-1">
                <span className="text-xs text-gray-600">Rating: {category.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
