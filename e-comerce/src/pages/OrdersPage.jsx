import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/actions/orderActions';
import { fetchAddresses } from '../redux/actions/addressActions';
import { ChevronDown as ChevronDownIcon, ChevronUp as ChevronUpIcon } from 'lucide-react';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector(state => state.order);
  const { addresses } = useSelector(state => state.address);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchAddresses());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Siparişler yükleniyor...</div>
      </div>
    );
  }

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Geçersiz Tarih';
    }
  };

  // Adres bilgilerini güvenli bir şekilde göster
  const renderAddress = (order) => {
    // Sipariş ile ilişkili adresi bul
    const address = addresses.find(addr => addr.id === order.address_id);
    
    if (!address) return <p className="text-gray-500">Adres bilgisi bulunamadı</p>;

    return (
      <div className="space-y-2 text-gray-600">
        <p className="font-medium">{address.title}</p>
        <p>{address.name} {address.surname}</p>
        <p>{address.phone}</p>
        <p className="text-sm">
          {address.neighborhood}, {address.district}/{address.city}
        </p>
        <p className="text-sm text-gray-500">
          {address.address_detail}
        </p>
      </div>
    );
  };

  // Kart bilgilerini güvenli bir şekilde göster
  const renderCardInfo = (order) => {
    if (!order.card_name || !order.card_no) {
      return <p className="text-gray-500">Ödeme bilgisi bulunamadı</p>;
    }

    return (
      <div className="space-y-2 text-gray-600">
        <p className="font-medium">{order.card_name}</p>
        <p className="font-mono">**** **** **** {order.card_no.toString().slice(-4)}</p>
        {order.card_expire_month && order.card_expire_year && (
          <p>Son Kullanma: {order.card_expire_month.toString().padStart(2, '0')}/{order.card_expire_year}</p>
        )}
      </div>
    );
  };

  // Ürünleri güvenli bir şekilde göster
  const renderProducts = (products = []) => {
    if (!products.length) {
      return <p className="text-gray-500">Ürün bilgisi bulunamadı</p>;
    }

    return products.map((product, index) => (
      <div
        key={index}
        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <div>
          <p className="font-medium">{product.detail || 'Ürün detayı yok'}</p>
          <p className="text-sm text-gray-500">Adet: {product.count || 0}</p>
        </div>
        {product.price && (
          <div className="text-blue-600 font-medium">
            {(product.price * (product.count || 1)).toLocaleString('tr-TR', { 
              style: 'currency', 
              currency: 'TRY' 
            })}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Siparişlerim</h1>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Sipariş Başlığı - Tıklanabilir Alan */}
            <div
              onClick={() => toggleOrder(order.id)}
              className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center border-b transition-colors duration-200"
            >
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">Sipariş #{order.id || 'N/A'}</span>
                  <span className="text-gray-600">{formatDate(order.order_date)}</span>
                </div>
                <div className="mt-1 text-gray-600">
                  Toplam: {(order.price || 0).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                </div>
              </div>
              <div className="ml-4">
                {expandedOrder === order.id ? (
                  <ChevronUpIcon className="w-6 h-6 text-blue-600" />
                ) : (
                  <ChevronDownIcon className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </div>

            {/* Sipariş Detayları - Açılır Panel */}
            {expandedOrder === order.id && (
              <div className="p-6 bg-gray-50">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Teslimat Adresi */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-3 text-blue-600">Teslimat Adresi</h3>
                    {renderAddress(order)}
                  </div>

                  {/* Ödeme Bilgileri */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-3 text-blue-600">Ödeme Bilgileri</h3>
                    {renderCardInfo(order)}
                  </div>

                  {/* Ürünler */}
                  <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-3 text-blue-600">Sipariş Detayı</h3>
                    <div className="space-y-3">
                      {renderProducts(order.products)}
                    </div>
                    
                    {/* Sipariş Özeti */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-semibold">Toplam Tutar</span>
                        <span className="font-bold text-blue-600">
                          {(order.price || 0).toLocaleString('tr-TR', { 
                            style: 'currency', 
                            currency: 'TRY' 
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {(!orders || orders.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            Henüz siparişiniz bulunmuyor.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage; 