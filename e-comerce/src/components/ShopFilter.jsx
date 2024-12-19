import React from "react";
import { ChevronDown, Grid2x2, ListChecks } from "lucide-react";

const ShopFilter = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center p-6 bg-white shadow-md">
      {/* Ortada: Showing all 12 results */}
      <div className="text-lg font-medium md:order-1">
        Showing all 12 results
      </div>

      {/* Sol Kısım: Views ve Iconlar */}
      <div className="flex items-center gap-4 md:order-2">
        <span className="text-lg font-medium">Views:</span>
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
