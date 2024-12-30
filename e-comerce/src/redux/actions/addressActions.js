import axiosInstance from '../../utils/axiosInstance';
import {
  fetchAddressesStart,
  fetchAddressesSuccess,
  fetchAddressesFailure
} from '../reducers/addressReducer';

// Adresleri getir
export const fetchAddresses = () => async (dispatch) => {
  dispatch(fetchAddressesStart());
  try {
    const response = await axiosInstance.get('/user/address');
    dispatch(fetchAddressesSuccess(response.data));
  } catch (error) {
    dispatch(fetchAddressesFailure(error.message));
  }
};

// Yeni adres ekle
export const addAddress = (addressData) => async (dispatch) => {
  try {
    await axiosInstance.post('/user/address', addressData);
    dispatch(fetchAddresses());
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Adres eklenirken bir hata oluştu'
    };
  }
};

// Adres güncelle
export const updateAddress = (addressData) => async (dispatch) => {
  try {
    await axiosInstance.put('/user/address', addressData);
    dispatch(fetchAddresses());
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Adres güncellenirken bir hata oluştu'
    };
  }
};

// Adres sil
export const deleteAddress = (addressId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/user/address/${addressId}`);
    dispatch(fetchAddresses());
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Adres silinirken bir hata oluştu'
    };
  }
}; 