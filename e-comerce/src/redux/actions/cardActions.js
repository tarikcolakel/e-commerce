import axiosInstance from '../../utils/axiosInstance';
import {
  fetchCardsStart,
  fetchCardsSuccess,
  fetchCardsFailure
} from '../reducers/cardReducer';

// Kartları getir
export const fetchCards = () => async (dispatch) => {
  dispatch(fetchCardsStart());
  try {
    const response = await axiosInstance.get('/user/card');
    dispatch(fetchCardsSuccess(response.data));
  } catch (error) {
    dispatch(fetchCardsFailure(error.message));
  }
};

// Yeni kart ekle
export const addCard = (cardData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/user/card', cardData);
    if (response.data) {
      dispatch(fetchCards());
      return { success: true };
    } else {
      throw new Error('Kart eklenemedi');
    }
  } catch (error) {
    console.error('Kart ekleme hatası:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Kart eklenirken bir hata oluştu'
    };
  }
};

// Kart güncelle
export const updateCard = (cardData) => async (dispatch) => {
  try {
    const response = await axiosInstance.put('/user/card', cardData);
    if (response.data) {
      dispatch(fetchCards());
      return { success: true };
    } else {
      throw new Error('Kart güncellenemedi');
    }
  } catch (error) {
    console.error('Kart güncelleme hatası:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Kart güncellenirken bir hata oluştu'
    };
  }
};

// Kart sil
export const deleteCard = (cardId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/user/card/${cardId}`);
    dispatch(fetchCards());
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Kart silinirken bir hata oluştu'
    };
  }
}; 