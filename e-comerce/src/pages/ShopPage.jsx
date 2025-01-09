import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchProducts, 
  setCategory, 
  setFilter, 
  setSort 
} from "../redux/actions/productActions";
import HeaderShop from "../components/HeaderShop";
import ShopFilter from "../components/ShopFilter";
import ShopCard from "../components/ShopCard";
import PaginatedProductList from "../components/PaginatedProductList";
import ShopCategory from '../components/ShopCategory';

import ShopClients from "../components/ShopClients";
import Footer from "../layout/Footer";

const ShopPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gender, categoryName, categoryId } = useParams();
  const { category, filter, sort } = useSelector(state => state.product);

  // Kategori seçildiğinde URL'i güncelle ve ürünleri getir
  useEffect(() => {
    if (categoryId) {
      // Kategori ID'sini state'e kaydet
      dispatch(setCategory(categoryId));
      
      // URL'i güncelle
      navigate(`/shop/${gender}/${categoryName}/${categoryId}`);
      
      // Ürünleri getir
      dispatch(fetchProducts());
    } else {
      // Kategori seçilmediyse tüm ürünleri getir
      dispatch(setCategory(null));
      dispatch(fetchProducts());
    }
  }, [gender, categoryId, categoryName, dispatch, navigate]);

  // Filtre değiştiğinde ürünleri yeniden getir
  const handleFilterChange = (e) => {
    const filterText = e.target.value;
    dispatch(setFilter(filterText));
    dispatch(fetchProducts());
  };

  // Sıralama değiştiğinde ürünleri yeniden getir
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    dispatch(setSort(sortValue));
    dispatch(fetchProducts());
  };

  // Sıralama seçenekleri
  const sortOptions = [
    { value: "price:asc", label: "Fiyat Artan" },
    { value: "price:desc", label: "Fiyat Azalan" },
    { value: "rating:asc", label: "Puan Artan" },
    { value: "rating:desc", label: "Puan Azalan" }
  ];

  // Seçilen kategorinin başlığını al
  const categories = useSelector((state) => state.categories.categories);
  const selectedCategory = categories.find(cat => 
    cat.id === Number(categoryId) && 
    cat.code.startsWith(gender === 'kadin' ? 'k:' : 'e:')
  );

  useEffect(() => {
    if (categoryId) {
      dispatch(setCategory(categoryId));
      
      // Kategori değiştiğinde URL'i güncelle
      if (selectedCategory) {
        const formattedTitle = selectedCategory.title.toLowerCase()
          .replace('ı', 'i')
          .replace('ö', 'o')
          .replace('ü', 'u')
          .replace('ş', 's')
          .replace('ğ', 'g')
          .replace('ç', 'c');
        
        navigate(`/shop/${gender}/${formattedTitle}/${categoryId}`);
      }

      dispatch(fetchProducts());
    }
  }, [categoryId, gender, selectedCategory, dispatch, navigate]);

  // Sayfa başlığını oluştur
  const pageTitle = selectedCategory 
    ? `${selectedCategory.code.startsWith('k:') ? 'Kadın' : 'Erkek'} ${selectedCategory.title} Ürünleri`
    : `${selectedCategory ? selectedCategory.code.startsWith('k:') ? 'Kadın' : 'Erkek' : gender === 'kadin' ? 'Kadın' : 'Erkek'} Ürünleri`;

  return (
    <div>
      <HeaderShop />
      <ShopCategory/>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{pageTitle}</h1>
          <div className="flex space-x-4">
            <input 
              type="text" 
              placeholder="Ürün ara..." 
              value={filter}
              onChange={handleFilterChange}
              className="border px-3 py-2 rounded-md w-64"
            />
            <select 
              value={sort}
              onChange={handleSortChange}
              className="border px-3 py-2 rounded-md"
            >
              <option value="">Sıralama Seç</option>
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <PaginatedProductList />
      </div>
      <ShopClients />
      <Footer />
    </div>
  );
};

export default ShopPage;
