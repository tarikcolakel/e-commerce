import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Search, ShoppingCart, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/reducers/categoryReducer';
import CartDropdown from '../components/CartDropdown';
import HeaderMenu from "../components/HeaderMenu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const menuRef = useRef(null);

  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const itemCount = items.reduce((total, item) => total + item.count, 0);

  useEffect(() => {
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

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  const handleShopIconClick = (e) => {
    e.preventDefault();
    setShopOpen((prevShopOpen) => !prevShopOpen);
  };

  const toggleCart = (e) => {
    e.preventDefault();
    setCartOpen(!cartOpen);
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
                      {categories
                        .filter(cat => cat.gender === 'kadin')
                        .map(category => (
                          <Link
                            key={category.id}
                            to={`/shop/kadin/${category.title}/${category.id}`}
                            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                          >
                            {category.title}
                          </Link>
                        ))}
                    </div>
                  </div>

                  {/* Erkek Kategorisi */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Erkek</h3>
                    <div className="flex flex-col space-y-3">
                      {categories
                        .filter(cat => cat.gender === 'erkek')
                        .map(category => (
                          <Link
                            key={category.id}
                            to={`/shop/erkek/${category.title}/${category.id}`}
                            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                          >
                            {category.title}
                          </Link>
                        ))}
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
          {isAuthenticated ? (
            <HeaderMenu />
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-gray-900"
              >
                Giriş Yap
              </Link>
              <Link 
                to="/signup" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Kayıt Ol
              </Link>
            </>
          )}

          <Search className="w-5 h-5 cursor-pointer" />
          
          <div className="relative">
            <button 
              onClick={toggleCart}
              className="relative text-gray-600 hover:text-gray-900"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {cartOpen && <CartDropdown onClose={() => setCartOpen(false)} />}
          </div>

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
