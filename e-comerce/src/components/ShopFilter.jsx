import React from "react";
import { ChevronDown, Grid2x2, ListChecks } from "lucide-react";

const ShopFilter = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center p-6 bg-white shadow-md">
      {/* Görünüm Seçenekleri */}
      <div className="flex items-center gap-4 md:order-3">
        <span className="text-lg font-medium">Görünüm:</span>
        <div className="flex gap-4">
          <Grid2x2 className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600" />
          <ListChecks className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600" />
        </div>
      </div>

      {/* Sağ Kısım: Sıralama ve Filtre Butonları */}
      <div className="flex gap-4 md:order-3">
        <div className="relative">
          <button className="flex items-center space-x-2 text-lg font-medium p-2 border rounded-md hover:bg-gray-100">
            <span>Popülerlik</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <div className="relative">
          <button 
            className="flex items-center space-x-2 text-lg font-medium p-2 border rounded-md hover:bg-gray-100"
          >
            <span>Filtre</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopFilter;
