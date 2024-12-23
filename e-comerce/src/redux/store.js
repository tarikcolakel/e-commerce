import { configureStore } from '@reduxjs/toolkit';

import clientReducer from "./reducers/clientReducer";
import productReducer from "./reducers/productReducer";
import shoppingCartReducer from "./reducers/shoppingCartReducer";
import categoryReducer from './reducers/categoryReducer';

const store = configureStore({
  reducer: {
    client: clientReducer,
    product: productReducer,
    shoppingCart: shoppingCartReducer,
    categories: categoryReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // Gerekirse ekleyebilirsiniz
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
