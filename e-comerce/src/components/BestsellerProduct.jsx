import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productActions";
import { useNavigate } from "react-router-dom";

const BestsellerProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    // En çok satan ürünleri getirmek için sort=sell_count parametresi ekleyelim
    dispatch(fetchProducts({ sort: 'sell_count', limit: 8 }));
  }, [dispatch]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-center text-xl font-bold mb-2">EN ÇOK SATAN ÜRÜNLER</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="flex flex-col items-center bg-white shadow-md p-4 rounded cursor-pointer hover:shadow-lg transition-shadow"
          >
            {/* Product Image */}
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="w-full h-64 object-cover mb-4 rounded"
            />

            {/* Product Info */}
            <div className="text-center">
              <h4 className="font-bold text-lg mb-1">{product.name}</h4>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-yellow-400">★</span>
                <span className="text-gray-600">{product.rating}</span>
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="text-gray-400 line-through">
                  {(product.price * 1.2).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                </span>
                <span className="text-green-600 font-bold">
                  {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Satış: {product.sell_count}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestsellerProduct;
