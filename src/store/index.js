import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import customerReducer from './customer';
import productReducer from './product';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
  },
});
