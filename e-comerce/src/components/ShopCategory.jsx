import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/reducers/categoryReducer';
import { useParams, useNavigate } from 'react-router-dom';

const ShopCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, status } = useSelector((state) => state.categories);
  const { gender } = useParams();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // Kategori seçildiğinde çalışacak fonksiyon
  const handleCategorySelect = (category) => {
    // Kategori kodundan cinsiyeti belirle (k: veya e: ile başlıyor)
    const categoryGender = category.code.startsWith('k:') ? 'kadin' : 'erkek';
    
    // URL'de küçük harfle ve Türkçe karaktersiz olarak oluştur
    const formattedTitle = category.title.toLowerCase()
      .replace('ı', 'i')
      .replace('ö', 'o')
      .replace('ü', 'u')
      .replace('ş', 's')
      .replace('ğ', 'g')
      .replace('ç', 'c');

    // Navigasyon - categoryGender'ı kullan
    navigate(`/shop/${categoryGender}/${formattedTitle}/${category.id}`);
  };

  // Gender'a göre kategorileri filtrele ve rating'e göre sırala
  const filteredCategories = categories
    .filter(cat => {
      // Gelen gender parametresini kontrol et
      const genderCode = gender === 'kadin' ? 'k:' : 
                        gender === 'erkek' ? 'e:' : 
                        null;
      return genderCode ? cat.code.startsWith(genderCode) : true;
    })
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5); // En yüksek 5 kategori

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-4 text-center">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full"></div>
        <p className="mt-2">Kategoriler yükleniyor...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="container mx-auto px-4 py-4 text-center text-red-500">
        Kategoriler yüklenemedi. Lütfen daha sonra tekrar deneyin.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredCategories.map((category) => (
          <div 
            key={category.id} 
            onClick={() => handleCategorySelect(category)}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group relative"
          >
            <div className="relative pt-[100%]">
              <img 
                src={category.img} 
                alt={category.title} 
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
              {/* Cinsiyet ve kategori etiketi */}
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                {category.code.startsWith('k:') ? 'Kadın' : 'Erkek'} {category.title}
              </div>
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
