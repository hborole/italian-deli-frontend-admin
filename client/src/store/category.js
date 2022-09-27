import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../services/axiosInstance';
import catchErrors from '../services/catchErrors';

const initialState = {
  categories: [],
  category: null,
  isLoading: false,
  errors: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    clearCategories: (state) => {
      state.categories = [];
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    clearCategory: (state) => {
      state.category = null;
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
  setCategories,
  clearCategories,
  setCategory,
  clearCategory,
  setErrors,
  clearErrors,
  setLoading,
} = categorySlice.actions;

export const getCategories = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axiosInstance({
      url: '/api/categories',
      method: 'GET',
    });

    dispatch(setCategories(response.data.categories));
    dispatch(setLoading(false));
    return true;
  } catch (err) {
    console.log(`Error while getting categories: ${err}`);
    const errs = catchErrors(err);
    dispatch(setErrors(errs));
    dispatch(setLoading(false));
    return false;
  }
};

export const getCategory = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axiosInstance({
      url: `/api/categories/${id}`,
      method: 'GET',
    });

    dispatch(setCategory(response.data.category));
    dispatch(setLoading(false));
    return true;
  } catch (err) {
    console.log(`Error while getting category: ${err}`);
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
        url: `/api/categories/upload?filename=${filename}&fileType=${fileType}`,
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

export const createCategory =
  ({ name, isActive, image }) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await axiosInstance({
        url: '/api/categories',
        method: 'POST',
        body: { name, isActive, image },
      });

      await dispatch(getCategories());
      dispatch(setLoading(false));
      return true;
    } catch (err) {
      console.log(`Error while creating category: ${err}`);
      const errs = catchErrors(err);
      dispatch(setErrors(errs));
      dispatch(setLoading(false));
      return false;
    }
  };

export const updateCategory =
  ({ id, name, isActive, oldImage, image }) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await axiosInstance({
        url: '/api/categories',
        method: 'PUT',
        body: { id, name, isActive, oldImage, image },
      });

      await dispatch(getCategories());
      dispatch(setLoading(false));
      return true;
    } catch (err) {
      console.log(`Error while updating category: ${err}`);
      const errs = catchErrors(err);
      dispatch(setErrors(errs));
      dispatch(setLoading(false));
      return false;
    }
  };

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axiosInstance({
      url: '/api/categories',
      method: 'DELETE',
      body: { id },
    });

    await dispatch(getCategories());
    dispatch(setLoading(false));
    return true;
  } catch (err) {
    console.log(`Error while updating category: ${err}`);
    const errs = catchErrors(err);
    dispatch(setErrors(errs));
    dispatch(setLoading(false));
    return false;
  }
};

export default categorySlice.reducer;
