
import React from "react";
import Slider from "../components/Slider";
import CategoryPick from "../components/CatagoryPick";
import ProductCategoryList from "../components/ProductCategoryList";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <CategoryPick/>
      <ProductCategoryList/>
    </div>
  );
};

export default HomePage;
