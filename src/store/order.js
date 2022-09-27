import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../services/axiosInstance';
import catchErrors from '../services/catchErrors';

const initialState = {
  orders: [],
  isLoading: false,
  errors: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    clearOrders: (state) => {
      state.orders = [];
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = [];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrders, clearOrders, setErrors, clearErrors, setLoading } =
  orderSlice.actions;

export const getOrders = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axiosInstance({
      url: '/api/orders',
      method: 'GET',
    });

    console.log(JSON.stringify(response.data, null, 2));
    dispatch(setOrders(response.data.orders));
    dispatch(setLoading(false));
    return true;
  } catch (err) {
    console.log(`Error while getting orders: ${err}`);
    const errs = catchErrors(err);
    dispatch(setErrors(errs));
    dispatch(setLoading(false));
    return false;
  }
};
export default orderSlice.reducer;
