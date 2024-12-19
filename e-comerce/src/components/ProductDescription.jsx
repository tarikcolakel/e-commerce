import React from "react";

const ProductDescription = () => {
  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex justify-center border-b mb-6">
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-800">
          Description
        </button>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 border-b-2 border-gray-800 font-semibold">
          Additional Information
        </button>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-800">
          Reviews (0)
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section (Image) */}
        <div className="bg-gray-100 p-4 rounded shadow-lg">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Product"
            className="rounded-lg"
          />
        </div>

        {/* Middle Section (Text Content) */}
        <div className="lg:col-span-1">
          <h3 className="text-xl font-bold mb-4">the quick fox jumps over</h3>
          <p className="text-gray-600 mb-4">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent door ENIM RELIT Mollie. Excitation venial
            consequent sent nostrum met.
          </p>
          <p className="text-gray-600 mb-4">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent door ENIM RELIT Mollie. Excitation venial
            consequent sent nostrum met.
          </p>
          <p className="text-gray-600">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent door ENIM RELIT Mollie. Excitation venial
            consequent sent nostrum met.
          </p>
        </div>

        {/* Right Section (Links) */}
        <div>
          <h3 className="text-xl font-bold mb-4">the quick fox jumps over</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="mr-2">›</span> the quick fox jumps over the lazy
              dog
            </li>
            <li className="flex items-center">
              <span className="mr-2">›</span> the quick fox jumps over the lazy
              dog
            </li>
            <li className="flex items-center">
              <span className="mr-2">›</span> the quick fox jumps over the lazy
              dog
            </li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-4">the quick fox jumps over</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="mr-2">›</span> the quick fox jumps over the lazy
              dog
            </li>
            <li className="flex items-center">
              <span className="mr-2">›</span> the quick fox jumps over the lazy
              dog
            </li>
            <li className="flex items-center">
              <span className="mr-2">›</span> the quick fox jumps over the lazy
              dog
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
