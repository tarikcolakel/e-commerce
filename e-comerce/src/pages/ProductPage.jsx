import React from "react";
import HeaderProduct from "../components/HeaderProduct";
import Footer from "../layout/Footer";
import ShopClients from "../components/ShopClients";
import ProductCard from "../components/ProductCard";
import ProductDescription from "../components/ProductDescription";
import BestsellerProduct from "../components/BestsellerProduct";


const ProductPage = () => {
    return (

        <div >
            <HeaderProduct />
            <ProductCard />
            <ProductDescription />
            <BestsellerProduct />
            <ShopClients />
            <Footer />



        </div>
    );
};

export default ProductPage;
