import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/reducers/categoryReducer';
import { Link } from 'react-router-dom';

const ShopCard = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading categories...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading categories</div>;
  }

  // Sort categories by rating and get top 5
  const topCategories = categories
    .filter(category => category && category.name && category.gender) // Ensure valid category objects
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-6">
      {topCategories.map((category, index) => (
        <Link
          key={index}
          to={`/shop/${category.gender.toLowerCase()}/${category.name.toLowerCase()}`}
          className="relative group overflow-hidden rounded-lg"
        >
          <img 
            src={category.img || `https://via.placeholder.com/300x200?text=${category.name}`} 
            alt={category.name} 
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300 flex flex-col justify-center items-center text-white">
            <h2 className="text-2xl font-bold">{category.name}</h2>
            <p className="mt-2">Rating: {category.rating || 'N/A'}</p>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default ShopCard;
