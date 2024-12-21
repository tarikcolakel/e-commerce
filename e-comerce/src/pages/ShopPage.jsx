import React from "react";
import { useParams } from "react-router-dom";
import HeaderShop from "../components/HeaderShop";
import ShopCard from "../components/ShopCard";
import ShopFilter from "../components/ShopFilter";
import PaginatedProductList from "../components/PaginatedProductList";
import ShopClients from "../components/ShopClients";
import Footer from "../layout/Footer";

const ShopPage = () => {
  const { gender, category } = useParams();

  // URL parametrelerini konsola yazdır (debug için)
  console.log('Gender:', gender);
  console.log('Category:', category);

  return (
    <div>
      <HeaderShop />
      <ShopCard />
      <ShopFilter />
      <PaginatedProductList gender={gender} category={category} />
      <ShopClients />
      <Footer />
    </div>
  );
};

export default ShopPage;
