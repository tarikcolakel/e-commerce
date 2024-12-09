import React, { useState, useEffect, useRef } from "react";
import { Menu, X, User, Search, ShoppingCart } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Menü dışındaki tıklamaları algılamak için ref
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Menü dışına tıklanırsa menüyü kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Eğer tıklama menü veya buton dışında bir yere yapılmışsa menüyü kapat
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

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
          <a href="#home" className="hover:text-blue-600">
            Home
          </a>
          <a href="#product" className="hover:text-blue-600">
            Product
          </a>
          <a href="#pricing" className="hover:text-blue-600">
            Pricing
          </a>
          <a href="#contact" className="hover:text-blue-600">
            Contact
          </a>
        </nav>

        {/* Sağdaki simgeler (Kullanıcı, Arama, Sepet) */}
        <div className="flex gap-4">
          <User className="w-5 h-5 cursor-pointer" />
          <Search className="w-5 h-5 cursor-pointer" />
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
          {/* Menü açma butonu */}
          <button
            ref={buttonRef} // Butona ref ekliyoruz
            onClick={() => setMenuOpen(!menuOpen)} // Menü açma kapama
            className="md:hidden"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobil Menü (Açılır/Kapanır Liste) */}
      {menuOpen && (
        <nav
          ref={menuRef} // Menüyü ref ile takip ediyoruz
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
