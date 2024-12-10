
import React from "react";
import Slider from "../components/Slider";
import CategoryPick from "../components/CatagoryPick";
import ProductCategoryList from "../components/ProductCategoryList";
import HeroSlider from "../components/HeroSlider";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <CategoryPick/>
      <ProductCategoryList/>
      <HeroSlider/>
    </div>
  );
};

export default HomePage;
