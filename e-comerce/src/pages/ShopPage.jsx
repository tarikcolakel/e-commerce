import React from "react";
import HeaderShop from "../components/HeaderShop";
import ShopCard from "../components/ShopCard";
import ShopFilter from "../components/ShopFilter";
import PaginatedProductList from "../components/PaginatedProductList";
import ShopClients from "../components/ShopClients";
import Footer from "../layout/Footer";


const ShopPage = () => {
  return (

    <div >
        <HeaderShop />
        <ShopCard />
        <ShopFilter />
        <PaginatedProductList />
        <ShopClients />

        <Footer />

        
      
    </div>
  );
};

export default ShopPage;
