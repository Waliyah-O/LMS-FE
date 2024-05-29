// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { identityService, storageService } from '../services';

// // Define an async thunk for checking authentication status
// export const checkAuthentication = createAsyncThunk('auth/checkAuthentication', async (_, { rejectWithValue }) => {
//   try {
//     // Get authentication data from storage
//     const authData = storageService.getAuthData();

//     // Check if access token exists
//     if (!authData.accessToken) {
//       throw new Error('Access token not found');
//     }

//     // Check if user is authenticated
//     const authenticated = await identityService.isAuthenticated();

//     // Return the authentication status
//     return authenticated;
//   } catch (error) {
//     // If an error occurs, reject with the error message
//     return rejectWithValue(error.message);
//   }
// });

// // Define initial state
// const initialState = {
//   authorized: false,
//   loading: false,
//   error: null,
// };

// // Define a slice for authentication
// const authSlice = createSlice({
//   name: 'useGuard',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(checkAuthentication.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(checkAuthentication.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;
//         state.authorized = action.payload;
//       })
//       .addCase(checkAuthentication.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// // Export the reducer
// export default authSlice.reducer;

import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { identityService, storageService } from '../services';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Define an async thunk for checking authentication status
export const checkAuthentication = createAsyncThunk('useGuard/checkAuthentication', async (_, { rejectWithValue }) => {
  try {
    // Get authentication data from storage
    const authData = storageService.getAuthData();

    // Check if access token exists
    if (!authData.accessToken) {
      throw new Error('Access token not found');
    }

    // Check if user is authenticated
    const authenticated = await identityService.isAuthenticated();

    // If not authenticated, navigate to signin
    if (!authenticated) {
      throw new Error('User not authenticated');
    }

    // Return the authentication status
    return authenticated;
  } catch (error) {
    // If an error occurs, reject with the error message
    return rejectWithValue(error.message);
  }
});

// Define initial state
const initialState = {
  authorized: false,
  loading: false,
  error: null,
};

// Define a slice for authentication
const authSlice = createSlice({
  name: 'useGuard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthentication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.authorized = action.payload;
      })
      .addCase(checkAuthentication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer and actions
export const selectAuthorized = (state) => state.auth.authorized;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
