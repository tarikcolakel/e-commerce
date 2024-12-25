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

  // Sayfa yüklendiğinde veya kategori değiştiğinde ürünleri fetch et
  useEffect(() => {
    // Kategori ID'sini doğrudan kullan
    if (categoryId) {
      dispatch(setCategory(categoryId));
      dispatch(fetchProducts());
      
      // Update URL to include category details
      navigate(`/shop/${gender}/${categoryName}/${categoryId}`);
    } else  {
      // Gender'a göre genel filtreleme
      dispatch(setCategory(null));
      dispatch(fetchProducts());
    }
  }, [gender, categoryId, dispatch, navigate]);

  const handleFilterChange = (e) => {
    const filterText = e.target.value;
    dispatch(setFilter(filterText));
    dispatch(fetchProducts());
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    dispatch(setSort(sortValue));
    dispatch(fetchProducts());
  };

  const sortOptions = [
    { value: "price:asc", label: "Fiyat Artan" },
    { value: "price:desc", label: "Fiyat Azalan" },
    { value: "rating:asc", label: "Puan Artan" },
    { value: "rating:desc", label: "Puan Azalan" }
  ];

  // Sayfa başlığını oluştur
  const pageTitle = gender 
    ? (gender === 'kadin' ? 'Kadın' : 'Erkek') + 
      (categoryName ? ` ${categoryName}` : ' Ürünleri')
    : 'Tüm Ürünler';

  return (
    <div>
      <HeaderShop />
      <ShopCategory/>
      <ShopFilter />
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
