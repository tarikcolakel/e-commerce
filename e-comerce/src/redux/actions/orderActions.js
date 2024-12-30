import axiosInstance from '../../utils/axiosInstance';
import { clearCart } from '../reducers/cartReducer';

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