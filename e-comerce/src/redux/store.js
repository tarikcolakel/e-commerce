import { configureStore } from '@reduxjs/toolkit';

import clientReducer from "./reducers/clientReducer";
import productReducer from "./reducers/productReducer";
import shoppingCartReducer from "./reducers/shoppingCartReducer";
import categoryReducer from './reducers/categoryReducer';
import cartReducer from './reducers/cartReducer';
import authReducer from './reducers/authReducer';
import addressReducer from './reducers/addressReducer';

const store = configureStore({
  reducer: {
    client: clientReducer,
    product: productReducer,
    shoppingCart: shoppingCartReducer,
    categories: categoryReducer,
    cart: cartReducer,
    auth: authReducer,
    address: addressReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // Gerekirse ekleyebilirsiniz
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
