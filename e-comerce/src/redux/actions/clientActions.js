import axios from 'axios';

export const setUser = (user) => ({ type: "SET_USER", payload: user });
export const setRoles = (roles) => ({ type: "SET_ROLES", payload: roles });
export const setTheme = (theme) => ({ type: "SET_THEME", payload: theme });
export const setLanguage = (language) => ({ type: "SET_LANGUAGE", payload: language });
export const setLoading = (loading) => ({ type: "SET_LOADING", payload: loading });
export const setError = (error) => ({ type: "SET_ERROR", payload: error });

export const loginUser = (credentials, rememberMe, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  
  try {
    const response = await axios.post('https://workintech-fe-ecommerce.onrender.com/login', {
      email: credentials.email,
      password: credentials.password,
    });

    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));

      if (rememberMe) {
        localStorage.setItem('rememberMe', true);
      } else {
        localStorage.removeItem('rememberMe');
      }

      dispatch(setUser(response.data.user));
      dispatch(setLoading(false));
      navigate(-1);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed! Please try again.';
    dispatch(setError(errorMessage));
    dispatch(setLoading(false));
    throw error;
  }
};