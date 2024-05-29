import { createSlice } from '@reduxjs/toolkit';

const suspendSlice = createSlice({
  name: 'suspend',
  initialState: false,
  reducers: {
    setSuspend: (state, action) => action.payload,
  },
});

export const { setSuspend } = suspendSlice.actions;

export default suspendSlice.reducer;
