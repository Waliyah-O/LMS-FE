import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../app/apiSlice';

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    primaryContent: '',
    secondaryContent: '',
    defaultContent: '',
  },
  reducers: {
    setPrimaryContent: (state, action) => {
      state.primaryContent = action.payload;
    },
    setSecondaryContent: (state, action) => {
      state.secondaryContent = action.payload;
    },
    setDefaultContent: (state, action) => {
      state.defaultContent = action.payload;
    },
  },
});

export const { setPrimaryContent, setSecondaryContent, setDefaultContent } = drawerSlice.actions;

export default drawerSlice.reducer;
