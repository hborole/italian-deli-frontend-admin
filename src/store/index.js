import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import customerReducer from './customer';

export const store = configureStore({
  reducer: { auth: authReducer, customer: customerReducer },
});
