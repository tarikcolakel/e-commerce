import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateItemCount, toggleItemCheck } from '../redux/reducers/cartReducer';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  
  // Hesaplamalar
  const subtotal = items
    .filter(item => item.checked)
    .reduce((sum, item) => sum + (item.product.price * item.count), 0);
  
  const shippingCost = items.length === 0 ? 0 : (subtotal > 150 ? 0 : 29.99);
  const discount = subtotal > 150 ? 29.99 : 0;
  const grandTotal = subtotal + shippingCost - discount;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Ödeme Sayfası</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol taraf - Ürün listesi */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Sepetim ({items.length} Ürün)</h2>
            
            {items.map(item => (
              <div key={item.product.id} className="flex items-center gap-4 py-4 border-b last:border-b-0">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => dispatch(toggleItemCheck(item.product.id))}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>

                <img
                  src={item.product.images[0]?.url}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600 mt-1">
                    Birim Fiyat: {item.product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border rounded">
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
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border-x">{item.count}</span>
                      <button
                        onClick={() => dispatch(updateItemCount({ 
                          productId: item.product.id, 
                          count: item.count + 1 
                        }))}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                      className="text-red-500 hover:text-red-700"
                    >
                      Sil
                    </button>
                  </div>

                  <p className="text-blue-600 font-semibold mt-2">
                    Toplam: {(item.product.price * item.count).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ taraf - Ödeme özeti */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Sipariş Özeti</h2>
            
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

              <div className="pt-3 border-t">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Toplam</span>
                  <span className="text-blue-600">
                    {grandTotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold">
              Ödemeyi Tamamla
            </button>

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
    </div>
  );
};

export default CheckoutPage; 