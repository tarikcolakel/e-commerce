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
      // Başarılı sipariş sonrası sepeti temizle
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
    const response = await axiosInstance.get('/order');
    dispatch(fetchOrdersSuccess(response.data));
  } catch (error) {
    dispatch(fetchOrdersFailure(error.message));
  }
}; 