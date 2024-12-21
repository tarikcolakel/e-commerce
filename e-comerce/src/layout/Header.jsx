import React, { useState, useEffect, useRef } from "react";
import { Menu, X, User, Search, ShoppingCart, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/reducers/categoryReducer';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const menuRef = useRef(null);

  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);

  useEffect(() => {
    console.log('Categories:', categories); // Debug için
    console.log('Status:', status); // Debug için
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // Group categories by gender
  const categoriesByGender = categories.reduce((acc, category) => {
    const gender = category.gender === 'k' ? 'Kadın' : 'Erkek';
    if (!acc[gender]) {
      acc[gender] = [];
    }
    acc[gender].push(category);
    return acc;
  }, {});

  console.log('CategoriesByGender:', categoriesByGender); // Debug için

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  const handleShopIconClick = (e) => {
    e.preventDefault(); // Link'in varsayılan davranışını engelle
    setShopOpen((prevShopOpen) => !prevShopOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setShopOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="shadow-md relative" ref={menuRef}>
      <div className="flex justify-between items-center bg-white p-4">
        <div className="text-xl font-bold">Bandage</div>

        <nav className="hidden md:flex gap-8 text-lg font-medium">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <div className="relative flex items-center gap-2">
            <Link to="/shop" className="hover:text-blue-600">Shop</Link>

            <ChevronDown
              onClick={handleShopIconClick}
              className="w-4 h-4 cursor-pointer hover:text-blue-600"
            />

            {shopOpen && (
              <div className="absolute left-0 top-full mt-2 bg-white border shadow-lg p-6 w-96 z-20">
                <div className="grid grid-cols-2 gap-x-12">
                  {/* Kadın Kategorisi */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Kadın</h3>
                    <div className="flex flex-col space-y-3">
                      <Link to="/shop/kadin/bags" className="text-gray-600 hover:text-blue-600">
                        Çanta
                      </Link>
                      <Link to="/shop/kadin/shoes" className="text-gray-600 hover:text-blue-600">
                        Ayakkabı
                      </Link>
                      <Link to="/shop/kadin/dresses" className="text-gray-600 hover:text-blue-600">
                        Elbise
                      </Link>
                      <Link to="/shop/kadin/accessories" className="text-gray-600 hover:text-blue-600">
                        Aksesuar
                      </Link>
                    </div>
                  </div>

                  {/* Erkek Kategorisi */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Erkek</h3>
                    <div className="flex flex-col space-y-3">
                      <Link to="/shop/erkek/bags" className="text-gray-600 hover:text-blue-600">
                        Çanta
                      </Link>
                      <Link to="/shop/erkek/shoes" className="text-gray-600 hover:text-blue-600">
                        Ayakkabı
                      </Link>
                      <Link to="/shop/erkek/suits" className="text-gray-600 hover:text-blue-600">
                        Takım Elbise
                      </Link>
                      <Link to="/shop/erkek/accessories" className="text-gray-600 hover:text-blue-600">
                        Aksesuar
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link to="#about" className="hover:text-blue-600">
            About
          </Link>
          <Link to="#blog" className="hover:text-blue-600">
            Blog
          </Link>
          <Link to="#contact" className="hover:text-blue-600">
            Contact
          </Link>
          <Link to="/product" className="hover:text-blue-600">
            Product
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <User className="w-5 h-5 cursor-pointer" />
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            / Register
          </Link>
          <Search className="w-5 h-5 cursor-pointer" />
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
          <button
            onClick={toggleMenu}
            className="md:hidden"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          ref={menuRef}
          className="absolute top-0 left-0 w-full bg-white flex flex-col items-center gap-4 py-6 shadow-md md:hidden z-50"
        >
          <Link to="/" className="text-lg font-medium hover:text-blue-600">
            Home
          </Link>
          <Link to="/product" className="text-lg font-medium hover:text-blue-600">
            Product
          </Link>
          <Link to="#pricing" className="text-lg font-medium hover:text-blue-600">
            Pricing
          </Link>
          <Link to="#contact" className="text-lg font-medium hover:text-blue-600">
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
