import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../services/axiosInstance';
import catchErrors from '../services/catchErrors';

const initialState = {
  customers: [],
  isLoading: false,
  errors: [],
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    clearCustomers: (state) => {
      state.customers = [];
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
export const {
  setCustomers,
  clearCustomers,
  setErrors,
  clearErrors,
  setLoading,
} = customerSlice.actions;

export const getCustomers = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axiosInstance({
      url: '/api/customers',
      method: 'GET',
    });

    dispatch(setCustomers(response.data.customers));
    dispatch(setLoading(false));
    return true;
  } catch (err) {
    console.log(`Error while getting customers: ${err}`);
    const errs = catchErrors(err);
    dispatch(setErrors(errs));
    dispatch(setLoading(false));
    return false;
  }
};
export default customerSlice.reducer;
