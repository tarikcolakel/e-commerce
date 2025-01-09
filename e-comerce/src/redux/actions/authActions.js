import axiosInstance from '../../utils/axiosInstance';
import { loginSuccess, loginFail, logout } from '../reducers/authReducer';

// Token doğrulama
export const verifyToken = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    dispatch(logout());
    return;
  }

  try {
    const response = await axiosInstance.get('/verify');
    dispatch(loginSuccess(response.data));
    
    // Token'ı yenile
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      axiosInstance.defaults.headers.common['Authorization'] = response.data.token;
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    dispatch(loginFail(error.response?.data?.message || 'Token verification failed'));
  }
};

// Login işlemi
export const login = (credentials, rememberMe) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/login', credentials);
    
    if (rememberMe) {
      localStorage.setItem('token', response.data.token);
    }
    
    axiosInstance.defaults.headers.common['Authorization'] = response.data.token;
    dispatch(loginSuccess(response.data.user));
  } catch (error) {
    dispatch(loginFail(error.response?.data?.message || 'Login failed'));
  }
};

// Logout işlemi
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  delete axiosInstance.defaults.headers.common['Authorization'];
  dispatch(logout());
}; 