import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/reducers/categoryReducer';
import { ChevronDown, Grid2x2, ListChecks } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ShopFilter = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);
  const { gender, category } = useParams();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // Filter categories by current gender
  const currentGenderCategories = categories.filter(cat => cat.gender === gender);

  if (status === 'loading') {
    return <div className="p-6">Loading categories...</div>;
  }

  if (status === 'failed') {
    return <div className="p-6">Error loading categories</div>;
  }

  return (
    <section className="flex flex-col md:flex-row justify-between items-center p-6 bg-white shadow-md">
      {/* Current Category Info */}
      <div className="text-lg font-medium md:order-1">
        {category ? (
          <span>Showing results for {gender} / {category}</span>
        ) : (
          <span>All Categories</span>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-4 md:order-2">
        <span className="text-lg font-medium">Categories:</span>
        <div className="relative group">
          <button className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50">
            {category || 'All Categories'}
            <ChevronDown className="w-4 h-4" />
          </button>
          <div className="absolute hidden group-hover:block right-0 top-full mt-2 bg-white border shadow-lg rounded-md w-48 z-10">
            {currentGenderCategories.map((cat, index) => (
              <Link
                key={index}
                to={`/shop/${gender}/${cat.name.toLowerCase()}`}
                className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* View Options */}
      <div className="flex items-center gap-4 md:order-3">
        <span className="text-lg font-medium">View:</span>
        <div className="flex gap-4">
          <Grid2x2 className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600" />
          <ListChecks className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600" />
        </div>
      </div>

      {/* Sağ Kısım: Popularity ve Filter Butonları */}
      <div className="flex gap-4 md:order-3">
        <button className="flex items-center space-x-2 text-lg font-medium p-2 border rounded-md hover:bg-gray-100">
          <span>Popularity</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        <button className="flex items-center space-x-2 text-lg font-medium p-2 border rounded-md hover:bg-gray-100">
          <span>Filter</span>
        </button>
      </div>
    </section>
  );
};

export default ShopFilter;
