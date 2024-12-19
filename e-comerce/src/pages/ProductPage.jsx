import React from "react";
import HeaderProduct from "../components/HeaderProduct";
import Footer from "../layout/Footer";
import ShopClients from "../components/ShopClients";
import ProductCard from "../components/ProductCard";
import ProductDescription from "../components/ProductDescription";


const ProductPage = () => {
    return (

        <div >
            <HeaderProduct />
            <ProductCard />
            <ProductDescription />
            <ShopClients />
            <Footer />



        </div>
    );
};

export default ProductPage;
