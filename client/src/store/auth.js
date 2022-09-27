import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../services/axiosInstance';
import catchErrors from '../services/catchErrors';

const initialState = {
  currentUser: null,
  isAuthenticating: true,
  isLoading: false,
  errors: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setIsAuthenticating: (state, action) => {
      state.isAuthenticating = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
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
  setCurrentUser,
  setIsAuthenticating,
  clearCurrentUser,
  setErrors,
  clearErrors,
  setLoading,
} = authSlice.actions;

export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axiosInstance({
      url: '/api/auth/currentuser',
      method: 'GET',
    });

    dispatch(setCurrentUser(response.data.currentUser));
    dispatch(setIsAuthenticating(false));
    dispatch(setLoading(false));
    return true;
  } catch (err) {
    console.log(`Error while getting current user: ${err}`);
    dispatch(setIsAuthenticating(false));
    dispatch(setLoading(false));
    return false;
  }
};

export const signUp =
  ({ firstName, lastName, email, password }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await axiosInstance({
        url: '/api/auth/signup',
        method: 'POST',
        body: {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        },
      });

      await dispatch(getCurrentUser());
      dispatch(setLoading(false));
      return true;
    } catch (err) {
      console.log(`Error while signing up: ${err}`);
      const errs = catchErrors(err);
      dispatch(setErrors(errs));
      dispatch(setLoading(false));
      return false;
    }
  };

export const signIn =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await axiosInstance({
        url: '/api/auth/signin',
        method: 'POST',
        body: {
          email,
          password,
        },
      });

      await dispatch(getCurrentUser());
      dispatch(setLoading(false));
      return true;
    } catch (err) {
      console.log(`Error while signing in: ${err}`);
      const errs = catchErrors(err);
      dispatch(setErrors(errs));
      dispatch(setLoading(false));
      return false;
    }
  };

export const signOut = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axiosInstance({
      url: '/api/auth/signout',
    });

    dispatch(setCurrentUser(response.data.currentUser));
    dispatch(setLoading(false));
    return true;
  } catch (err) {
    console.log(`Error while signing out: ${err}`);
    const errs = catchErrors(err);
    dispatch(setErrors(errs));
    dispatch(setLoading(false));
    return false;
  }
};

export default authSlice.reducer;
