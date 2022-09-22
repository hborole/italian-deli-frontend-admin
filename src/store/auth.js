import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../services/axiosInstance';

const initialState = {
  currentUser: null,
  isAuthenticating: true,
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
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser, setIsAuthenticating, clearCurrentUser } =
  authSlice.actions;

export const getCurrentUser = () => async (dispatch) => {
  try {
    const response = await axiosInstance({
      url: '/api/auth/currentuser',
      method: 'GET',
    });

    console.log(`Current user ${response.data.currentUser}`);
    dispatch(setCurrentUser(response.data.currentUser));
    dispatch(setIsAuthenticating(false));
    return true;
  } catch (err) {
    console.log(`Error while getting current user: ${err}`);
  }
};

export const signUp =
  ({ firstName, lastName, email, password }) =>
  async (dispatch) => {
    try {
      const response = await axiosInstance({
        url: '/api/auth/signup',
        method: 'POST',
        body: {
          firstName,
          lastName,
          email,
          password,
        },
      });

      dispatch(setCurrentUser(response.data.currentUser));
      return true;
    } catch (err) {
      console.log(`Error while signing up: ${err}`);
      return err.response.data;
    }
  };

export const signIn =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const response = await axiosInstance({
        url: '/api/auth/signin',
        method: 'POST',
        body: {
          email,
          password,
        },
      });

      console.log(`Sign in response: ${JSON.stringify(response, null, 2)}`);
      await dispatch(getCurrentUser());
      return true;
    } catch (err) {
      console.log(`Error while signing in: ${err}`);
      return false;
    }
  };

export const signOut = () => async (dispatch) => {
  try {
    const response = await axiosInstance({
      url: '/api/auth/signout',
      method: 'POST',
    });

    dispatch(setCurrentUser(response.data.currentUser));
  } catch (err) {
    console.log(`Error while signing out: ${err}`);
  }
};

export default authSlice.reducer;
