import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../redux/actions/productActions";
import HeaderProduct from "../components/HeaderProduct";
import Footer from "../layout/Footer";
import ShopClients from "../components/ShopClients";
import ProductCard from "../components/ProductCard";
import ProductDescription from "../components/ProductDescription";
import BestsellerProduct from "../components/BestsellerProduct";

const ProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetail(productId));
    }
  }, [dispatch, productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <HeaderProduct />
      {currentProduct && (
        <>
          <ProductCard product={currentProduct} />
          <ProductDescription description={currentProduct.description} />
          <BestsellerProduct />
        </>
      )}
      <ShopClients />
      <Footer />
    </div>
  );
};

export default ProductPage;
