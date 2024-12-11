
import React from "react";
import Slider from "../components/Slider";
import CategoryPick from "../components/CatagoryPick";
import ProductCategoryList from "../components/ProductCategoryList";
import HeroSlider from "../components/HeroSlider";
import C2A from "../components/C2A";
import FeaturedPosts from "../components/FeaturedPosts";
import Footer from "../layout/Footer";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <CategoryPick/>
      <ProductCategoryList/>
      <HeroSlider/>
      <C2A/>
      <FeaturedPosts/>
      <Footer/>
    </div>
  );
};

export default HomePage;
