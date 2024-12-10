
import React from "react";
import Slider from "../components/Slider";
import CategoryPick from "../components/CatagoryPick";
import ProductCategoryList from "../components/ProductCategoryList";
import HeroSlider from "../components/HeroSlider";
import C2A from "../components/C2A";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <CategoryPick/>
      <ProductCategoryList/>
      <HeroSlider/>
      <C2A/>
    </div>
  );
};

export default HomePage;
