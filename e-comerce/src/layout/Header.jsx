import React, { useState, useEffect, useRef } from "react";
import { Menu, X, User, Search, ShoppingCart, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Menü açma/kapama kontrolü
  const [shopOpen, setShopOpen] = useState(false); // Shop menüsünü kontrol et
  const menuRef = useRef(null); // Menü dışındaki tıklamaları kontrol etmek için ref

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen); // Menü açma/kapama
  };

  const handleShopIconClick = () => {
    setShopOpen((prevShopOpen) => !prevShopOpen); // Shop menüsünü aç/kapat
  };

  // Menü dışında bir yere tıklanıp tıklanmadığını kontrol etmek için useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false); // Menü dışında bir yere tıklanırsa menüyü kapat
        setShopOpen(false); // Shop menüsünü de kapat
      }
    };

    // Dışarıya tıklama olayını dinle
    document.addEventListener("mousedown", handleClickOutside);

    // Temizleme işlemi
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="shadow-md relative">
      {/* Üst Kısım (Logo ve İkonlar) */}
      <div className="flex justify-between items-center bg-white p-4">
        {/* Logo */}
        <div className="text-xl font-bold">Bandage</div>

        {/* Masaüstü Menü */}
        <nav className="hidden md:flex gap-8 text-lg font-medium">
          <a href="/" className="hover:text-blue-600">
            Home
          </a>

          {/* Shop Menüsü */}
          <div className="relative flex items-center gap-2">
            {/* Shop yazısı */}
            <a  href="/shop"className="hover:text-blue-600">Shop</a>

            {/* ChevronDown ikonu */}
            <ChevronDown
              onClick={handleShopIconClick} // Sadece ikon tıklandığında menüyü aç/kapat
              className="w-4 h-4 cursor-pointer hover:text-blue-600"
            />

            {/* Shop alt menüsü */}
            {shopOpen && (
              <div className="absolute left-0 top-10 bg-white border shadow-lg p-4 w-60 z-20">
                <div className="flex space-x-12">
                  {/* Erkek Kategorisi */}
                  <div className="flex flex-col space-y-4">
                    <div className="font-medium">Erkek</div>
                    <a href="#bags" className="text-sm text-gray-600 hover:text-blue-600">
                      Bags
                    </a>
                    <a href="#belts" className="text-sm text-gray-600 hover:text-blue-600">
                      Belts
                    </a>
                    <a href="#cosmetics" className="text-sm text-gray-600 hover:text-blue-600">
                      Cosmetics
                    </a>
                    <a href="#hats" className="text-sm text-gray-600 hover:text-blue-600">
                      Hats
                    </a>
                  </div>

                  {/* Kadın Kategorisi */}
                  <div className="flex flex-col space-y-4">
                    <div className="font-medium">Kadın</div>
                    <a href="#bags" className="text-sm text-gray-600 hover:text-blue-600">
                      Bags
                    </a>
                    <a href="#belts" className="text-sm text-gray-600 hover:text-blue-600">
                      Belts
                    </a>
                    <a href="#cosmetics" className="text-sm text-gray-600 hover:text-blue-600">
                      Cosmetics
                    </a>
                    <a href="#hats" className="text-sm text-gray-600 hover:text-blue-600">
                      Hats
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a href="#about" className="hover:text-blue-600">
            About
          </a>
          <a href="#blog" className="hover:text-blue-600">
            Blog
          </a>
          <a href="#contact" className="hover:text-blue-600">
            Contact
          </a>
        </nav>

        {/* Sağdaki simgeler (Kullanıcı, Arama, Sepet) */}
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
          {/* Menü açma butonu */}
          <button
            onClick={toggleMenu} // Menü açma/kapama
            className="md:hidden"
          >
            {menuOpen ? (
              <X className="w-5 h-5" /> // Menü açıkken X ikonu
            ) : (
              <Menu className="w-5 h-5" /> // Menü kapalıyken Menü ikonu
            )}
          </button>
        </div>
      </div>

      {/* Mobil Menü (Açılır/Kapanır Liste) */}
      {menuOpen && (
        <nav
          ref={menuRef} // Menü dışı tıklamaları kontrol etmek için ref
          className="absolute top-0 left-0 w-full bg-white flex flex-col items-center gap-4 py-6 shadow-md md:hidden z-50"
        >
          <a href="#home" className="text-lg font-medium hover:text-blue-600">
            Home
          </a>
          <a href="#product" className="text-lg font-medium hover:text-blue-600">
            Product
          </a>
          <a href="#pricing" className="text-lg font-medium hover:text-blue-600">
            Pricing
          </a>
          <a href="#contact" className="text-lg font-medium hover:text-blue-600">
            Contact
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
