import axiosInstance from '../../utils/axiosInstance';
import { clearCart } from '../reducers/cartReducer';
import {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure
} from '../reducers/orderReducer';

export const createOrder = (orderData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/order', orderData);
    if (response.data) {
      dispatch(clearCart());
      return { success: true };
    }
    throw new Error('Sipariş oluşturulamadı');
  } catch (error) {
    console.error('Sipariş oluşturma hatası:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Sipariş oluşturulurken bir hata oluştu'
    };
  }
};

// Siparişleri getir
export const fetchOrders = () => async (dispatch) => {
  dispatch(fetchOrdersStart());
  try {
    // Siparişleri al
    const ordersResponse = await axiosInstance.get('/order');
    
    // Her sipariş için adres detaylarını al
    const ordersWithAddresses = await Promise.all(
      ordersResponse.data.map(async (order) => {
        try {
          const addressResponse = await axiosInstance.get(`/user/address/${order.address_id}`);
          return {
            ...order,
            address: addressResponse.data
          };
        } catch (error) {
          console.error(`Adres detayı alınamadı (ID: ${order.address_id}):`, error);
          return order;
        }
      })
    );

    dispatch(fetchOrdersSuccess(ordersWithAddresses));
  } catch (error) {
    dispatch(fetchOrdersFailure(error.message));
  }
}; 