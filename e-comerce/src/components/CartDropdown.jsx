import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateItemCount, toggleItemCheck } from '../redux/reducers/cartReducer';

const CartDropdown = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(state => state.cart);

  // Sadece seçili ürünlerin toplam tutarını hesapla
  const subtotal = items
    .filter(item => item.checked)
    .reduce((sum, item) => sum + (item.product.price * item.count), 0);
  
  const shippingCost = items.length === 0 ? 0 : (subtotal > 150 ? 0 : 29.99); // Sepet boşsa veya 150 TL üzeri ise kargo bedava
  const discount = subtotal > 150 ? 29.99 : 0; // Kargo bedava ise indirim uygula
  const grandTotal = subtotal + shippingCost - discount;

  const handleCheckout = () => {
    onClose(); // Sepet menüsünü kapat
    navigate('/checkout'); // Checkout sayfasına yönlendir
  };

  return (
    <div className="absolute right-0 mt-2 w-[800px] bg-white rounded-lg shadow-xl z-50">
      <div className="p-4 flex">
        {/* Sol taraf - Ürün listesi */}
        <div className="flex-1 pr-4 border-r">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Sepetim ({items.length} Ürün)</h3>
            {items.length > 0 && (
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-4">Sepetiniz boş</p>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {items.map(item => (
                <div key={item.product.id} className="flex items-center space-x-4 mb-4 pb-4 border-b">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => dispatch(toggleItemCheck(item.product.id))}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  
                  <img
                    src={item.product.images[0]?.url}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{item.product.name}</h4>
                    <p className="text-gray-600 text-sm">
                      {item.product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                    </p>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => {
                          if (item.count === 1) {
                            dispatch(removeFromCart(item.product.id));
                          } else {
                            dispatch(updateItemCount({ 
                              productId: item.product.id, 
                              count: item.count - 1 
                            }));
                          }
                        }}
                        className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.count}</span>
                      <button
                        onClick={() => dispatch(updateItemCount({ 
                          productId: item.product.id, 
                          count: item.count + 1 
                        }))}
                        className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
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
            </div>
          )}
        </div>

        {/* Sağ taraf - Sipariş özeti */}
        <div className="w-72 pl-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Sipariş Özeti</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Ürünlerin Toplamı</span>
                <span className="font-medium">
                  {subtotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                </span>
              </div>

              {items.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Kargo Toplam</span>
                  <span className="font-medium">
                    {shippingCost.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </span>
                </div>
              )}

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>150 TL Üzeri Kargo Bedava</span>
                  <span>-{discount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
                </div>
              )}

              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Toplam</span>
                  <span className="text-blue-600">
                    {grandTotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </span>
                </div>
              </div>

              {/* İndirim kodu alanı */}
              <div className="pt-3">
                <button 
                  className="w-full text-center text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => {/* İndirim kodu fonksiyonu */}}
                >
                  İndirim Kodu Gir
                </button>
              </div>
            </div>

            {/* Sipariş oluştur butonu */}
            <button 
              onClick={handleCheckout}
              className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              Sepeti Onayla
            </button>
          </div>

          {/* Kargo bilgisi */}
          {items.length > 0 && subtotal < 150 && (
            <div className="mt-4 text-sm text-gray-600 text-center">
              <span className="text-blue-600 font-medium">
                {(150 - subtotal).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
              </span> değerinde ürün daha ekleyin, kargo bedava olsun!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDropdown; 