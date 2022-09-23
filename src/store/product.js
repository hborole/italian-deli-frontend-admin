import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../services/axiosInstance';
import catchErrors from '../services/catchErrors';

const initialState = {
  products: [],
  product: null,
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
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    clearProduct: (state) => {
      state.product = null;
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
  setProduct,
  clearProduct,
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

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axiosInstance({
      url: `/api/products/${id}`,
      method: 'GET',
    });

    dispatch(setProduct(response.data.product));
    dispatch(setLoading(false));
    return true;
  } catch (err) {
    console.log(`Error while getting product: ${err}`);
    const errs = catchErrors(err);
    dispatch(setErrors(errs));
    dispatch(setLoading(false));
    return false;
  }
};

export const getUploadURL =
  ({ filename, fileType }) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance({
        url: `/api/products/upload?filename=${filename}&fileType=${fileType}`,
        method: 'GET',
      });

      dispatch(setLoading(false));
      return response.data.url;
    } catch (err) {
      console.log(`Error while getting upload URL: ${err}`);
      const errs = catchErrors(err);
      dispatch(setErrors(errs));
      dispatch(setLoading(false));
      return false;
    }
  };

export const createProduct =
  ({ name, price, description, isActive, isFeatured, image, category_id }) =>
  async (dispatch) => {
    console.log(name, price, description, isActive, image, category_id);
    try {
      dispatch(setLoading(true));
      await axiosInstance({
        url: '/api/products',
        method: 'POST',
        body: {
          name,
          price,
          description,
          isActive,
          isFeatured,
          image,
          category_id,
        },
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

export const updateProduct =
  ({
    id,
    name,
    price,
    description,
    isActive,
    isFeatured,
    oldImage,
    image,
    category_id,
  }) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await axiosInstance({
        url: '/api/products',
        method: 'PUT',
        body: {
          id,
          name,
          price,
          description,
          isActive,
          isFeatured,
          oldImage,
          image,
          category_id,
        },
      });

      await dispatch(getProducts());
      dispatch(setLoading(false));
      return true;
    } catch (err) {
      console.log(`Error while updating product: ${err}`);
      const errs = catchErrors(err);
      dispatch(setErrors(errs));
      dispatch(setLoading(false));
      return false;
    }
  };

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axiosInstance({
      url: '/api/products',
      method: 'DELETE',
      body: { id },
    });

    await dispatch(getProducts());
    dispatch(setLoading(false));
    return true;
  } catch (err) {
    console.log(`Error while updating product: ${err}`);
    const errs = catchErrors(err);
    dispatch(setErrors(errs));
    dispatch(setLoading(false));
    return false;
  }
};

export default productSlice.reducer;
