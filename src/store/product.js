import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../services/axiosInstance';
import catchErrors from '../services/catchErrors';

const initialState = {
  products: [],
  isLoading: false,
  errors: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
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
  setProducts,
  clearProducts,
  setErrors,
  clearErrors,
  setLoading,
} = productSlice.actions;

export const getProducts = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axiosInstance({
      url: '/api/products',
      method: 'GET',
    });

    dispatch(setProducts(response.data.products));
    dispatch(setLoading(false));
    return true;
  } catch (err) {
    console.log(`Error while getting products: ${err}`);
    const errs = catchErrors(err);
    dispatch(setErrors(errs));
    dispatch(setLoading(false));
    return false;
  }
};

export const createProduct =
  ({ name, price, description, isActive, image, category_id }) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await axiosInstance({
        url: '/api/products',
        method: 'POST',
        data: { name, price, description, isActive, image, category_id },
      });

      await dispatch(getProducts());
      dispatch(setLoading(false));
      return true;
    } catch (err) {
      console.log(`Error while creating product: ${err}`);
      const errs = catchErrors(err);
      dispatch(setErrors(errs));
      dispatch(setLoading(false));
      return false;
    }
  };

export default productSlice.reducer;
