import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeaderShop = () => {
  return (
    <header className="bg-gray-100 p-4 shadow-md flex flex-col md:flex-row items-center justify-between">
      {/* Sol Taraftaki Shop Yazısı (Mobilde üstte) */}
      <div className="text-2xl font-bold mb-2 md:mb-0">Shop</div>

      {/* Sağ Tarafta Home > Shop (Mobilde alta kayacak) */}
      <div className="flex items-center gap-2 text-blue-600">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-600">Shop</span>
      </div>
    </header>
  );
};

export default HeaderShop;
