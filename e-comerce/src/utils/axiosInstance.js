import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com'
});

// Token'ı localStorage'dan al ve varsa header'a ekle
const token = localStorage.getItem('token');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = token;
}

export default axiosInstance; 