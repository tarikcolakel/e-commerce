import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateItemCount, toggleItemCheck } from '../redux/reducers/cartReducer';
import { fetchAddresses, deleteAddress } from '../redux/actions/addressActions';
import { toggleAddressForm, setSelectedAddress } from '../redux/reducers/addressReducer';
import AddressForm from '../components/AddressForm';
import { fetchCards, deleteCard } from '../redux/actions/cardActions';
import { toggleCardForm, setSelectedCard } from '../redux/reducers/cardReducer';
import CardForm from '../components/CardForm';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../redux/actions/orderActions';
import AnimatedSelectedCard from '../components/AnimatedSelectedCard';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addresses, showAddressForm, selectedAddress } = useSelector(state => state.address);
  const { cards, showCardForm, selectedCard } = useSelector(state => state.card);
  const { items } = useSelector(state => state.cart);
  
  useEffect(() => {
    dispatch(fetchAddresses());
    dispatch(fetchCards());
  }, [dispatch]);

  const handleNewAddress = () => {
    dispatch(setSelectedAddress(null));
    dispatch(toggleAddressForm());
  };

  const handleNewCard = () => {
    dispatch(setSelectedCard(null));
    dispatch(toggleCardForm());
  };

  // Hesaplamalar
  const subtotal = items
    .filter(item => item.checked)
    .reduce((sum, item) => sum + (item.product.price * item.count), 0);
  
  const shippingCost = items.length === 0 ? 0 : (subtotal > 150 ? 0 : 29.99);
  const discount = subtotal > 150 ? 29.99 : 0;
  const grandTotal = subtotal + shippingCost - discount;

  const handleCheckout = async () => {
    if (!selectedAddress) {
      alert('Lütfen teslimat adresi seçin');
      return;
    }

    if (!selectedCard) {
      alert('Lütfen ödeme yöntemi seçin');
      return;
    }

    const checkedItems = items.filter(item => item.checked);
    if (checkedItems.length === 0) {
      alert('Lütfen en az bir ürün seçin');
      return;
    }

    try {
      const orderData = {
        address_id: selectedAddress.id,
        order_date: new Date().toISOString(),
        card_no: parseInt(selectedCard.card_no),
        card_name: selectedCard.name_on_card,
        card_expire_month: selectedCard.expire_month,
        card_expire_year: selectedCard.expire_year,
        price: grandTotal,
        products: checkedItems.map(item => ({
          product_id: item.product.id,
          count: item.count,
          detail: `${item.product.name} - ${item.product.size || 'Tek Beden'}`
        }))
      };

      const result = await dispatch(createOrder(orderData));
      if (result.success) {
        alert('Siparişiniz başarıyla oluşturuldu!');
        navigate('/');
      } else {
        alert(result.error || 'Sipariş oluşturulurken bir hata oluştu');
      }
    } catch (error) {
      alert('Bir hata oluştu');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Ödeme Sayfası</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol taraf - Adres ve Ürün listesi */}
        <div className="lg:col-span-2">
          {/* Adres Seçimi */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Adres Bilgileri</h2>
              <button
                onClick={handleNewAddress}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Yeni Adres Ekle
              </button>
            </div>

            {showAddressForm ? (
              <AddressForm existingAddress={selectedAddress} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map(address => (
                  <div
                    key={address.id}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      selectedAddress?.id === address.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => dispatch(setSelectedAddress(address))}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{address.title}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(setSelectedAddress(address));
                            dispatch(toggleAddressForm());
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(deleteAddress(address.id));
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">
                      {address.name} {address.surname}
                    </p>
                    <p className="text-gray-600">{address.phone}</p>
                    <p className="text-gray-600 mt-1">
                      {address.neighborhood}, {address.district}/{address.city}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Kredi Kartı Seçimi */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Ödeme Yöntemi</h2>
              <button
                onClick={handleNewCard}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Yeni Kart Ekle
              </button>
            </div>

            {showCardForm ? (
              <CardForm existingCard={selectedCard} />
            ) : (
              <>
                {selectedCard && <AnimatedSelectedCard card={selectedCard} />}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cards.map(card => (
                    <div
                      key={card.id}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        selectedCard?.id === card.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => dispatch(setSelectedCard(card))}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{card.name_on_card}</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(setSelectedCard(card));
                              dispatch(toggleCardForm());
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Düzenle
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(deleteCard(card.id));
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2">
                        **** **** **** {card.card_no.slice(-4)}
                      </p>
                      <p className="text-gray-600">
                        {card.expire_month.toString().padStart(2, '0')}/{card.expire_year}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Ürün listesi - mevcut kod */}
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

            <button 
              onClick={handleCheckout}
              disabled={!selectedAddress || !selectedCard || items.filter(item => item.checked).length === 0}
              className={`w-full mt-6 py-3 rounded-lg font-semibold transition-colors
                ${(!selectedAddress || !selectedCard || items.filter(item => item.checked).length === 0)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
            >
              {!selectedAddress 
                ? 'Lütfen Adres Seçin'
                : !selectedCard
                  ? 'Lütfen Kart Seçin'
                  : items.filter(item => item.checked).length === 0
                    ? 'Lütfen Ürün Seçin'
                    : 'Ödemeyi Tamamla'}
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