import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
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
import ShopClients from "../components/ShopClients";
import Footer from "../layout/Footer";

const ShopPage = () => {
  const dispatch = useDispatch();
  const { gender, categoryName, categoryId } = useParams();

  // Sayfa yüklendiğinde veya kategori değiştiğinde ürünleri fetch et
  useEffect(() => {
    // Kategori ID'sini doğrudan kullan
    if (categoryId) {
      dispatch(setCategory(categoryId));
      dispatch(fetchProducts());
    } else if (gender) {
      // Gender'a göre genel filtreleme
      dispatch(setCategory(null));
      dispatch(fetchProducts());
    }
  }, [gender, categoryId, dispatch]);

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
    dispatch(fetchProducts());
  };

  const handleSortChange = (e) => {
    dispatch(setSort(e.target.value));
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
      <ShopFilter />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{pageTitle}</h1>
          <div className="flex space-x-4">
            <input 
              type="text" 
              placeholder="Ürün ara..." 
              onChange={handleFilterChange}
              className="border px-3 py-2 rounded-md w-64"
            />
            <select 
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
