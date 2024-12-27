import React from 'react';
import { useSelector } from 'react-redux';

const CheckoutPage = () => {
  const { items } = useSelector(state => state.cart);
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.count), 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Ödeme Sayfası</h1>
      
      {/* Sepet Özeti */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Sepet Özeti</h2>
        {items.map(item => (
          <div key={item.product.id} className="flex justify-between items-center mb-4 pb-4 border-b">
            <div className="flex items-center">
              <img
                src={item.product.images[0]?.url}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-4">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">Adet: {item.count}</p>
              </div>
            </div>
            <p className="font-semibold">
              {(item.product.price * item.count).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
            </p>
          </div>
        ))}
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <span className="text-xl font-bold">Toplam:</span>
          <span className="text-xl font-bold">
            {totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
          </span>
        </div>
      </div>

      {/* Ödeme Formu */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Ödeme Bilgileri</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Kart Üzerindeki İsim</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Kart Numarası</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Son Kullanma Tarihi</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Ödemeyi Tamamla
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage; 