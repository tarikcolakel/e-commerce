import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateItemCount, toggleItemCheck, toggleCart } from '../redux/reducers/cartReducer';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector(state => state.cart);

  const totalItems = items.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.count), 0);

  return (
    <div className="relative">
      <button 
        onClick={() => dispatch(toggleCart())}
        className="flex items-center space-x-1 text-gray-700 hover:text-blue-500"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {totalItems}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Sepetim ({totalItems} Ürün)</h3>
            
            {items.map(item => (
              <div key={item.product.id} className="flex items-center space-x-4 mb-4 pb-4 border-b">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => dispatch(toggleItemCheck(item.product.id))}
                  className="w-4 h-4"
                />
                
                <img
                  src={item.product.images[0]?.url}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                
                <div className="flex-1">
                  <h4 className="font-semibold">{item.product.name}</h4>
                  <p className="text-gray-600">
                    {item.product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </p>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => dispatch(updateItemCount({ productId: item.product.id, count: Math.max(0, item.count - 1) }))}
                      className="px-2 py-1 bg-gray-100 rounded"
                    >
                      -
                    </button>
                    <span>{item.count}</span>
                    <button
                      onClick={() => dispatch(updateItemCount({ productId: item.product.id, count: item.count + 1 }))}
                      className="px-2 py-1 bg-gray-100 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => dispatch(removeFromCart(item.product.id))}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between font-semibold">
                <span>Toplam:</span>
                <span>{totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
              </div>
              <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                Sepeti Onayla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdown; 