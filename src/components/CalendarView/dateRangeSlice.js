import { createSlice } from '@reduxjs/toolkit';

const now = new Date();

export const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState: {
    startDate: now.toISOString(),
    endDate: now.toISOString(),
    key: 'selection',
  },
  reducers: {
    updateRange: (state, action) => {
      state.startDate = action.payload.selection.startDate;
      state.endDate = action.payload.selection.endDate;
    },
  },
});

export const { updateRange } = dateRangeSlice.actions;

export default dateRangeSlice.reducer;
