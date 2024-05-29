import { createSlice } from '@reduxjs/toolkit';
import { _getTokenFromSession, getDecodedAccessToken, _setTokenToSession, _removeTokenFromSession } from '../utils';

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, { payload }) => {
      const { token } = payload;
      const decodedToken = getDecodedAccessToken(token); // Assuming valid function

      const tokenFrmSesh = _getTokenFromSession('accessToken');
      console.log(tokenFrmSesh);

      console.log(decodedToken);

      if (!decodedToken) {
        console.error('Invalid token provided');
        return state; // Maintain current state if token is invalid
      }

      const { role, ...userData } = decodedToken;
      console.log(userData);
      console.log(role);

      // Store user data in session storage (customize as needed)
      _setTokenToSession(userData);
      _setTokenToSession(token); // Store token separately (consider security best practices)

      // Set role-specific data
      state = {
        ...userData, // Spread existing user data
        role,
        isSuperAdmin: role === 'SuperAdmin' || role === 'OrganizationAdmin',
        isOrganizationAdmin: role === 'OrganizationAdmin',
        isTutor: role === 'Tutor',
        isStudent: role === 'Student',
      };
    },
    clearUser: (state) => {
      _removeTokenFromSession(); // Use correct removal function
      _removeTokenFromSession(); // Consider removing refresh token too
      sessionStorage.clear(); // Clear session storage
      localStorage.clear();
      state = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
// export default userSlice.reducer;
export const userReducer = userSlice.reducer;
