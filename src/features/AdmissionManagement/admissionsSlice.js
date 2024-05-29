import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const geAdmissionsContent = createAsyncThunk('/admissions/content', async () => {
  const response = await axios.get('/api/users?page=2', {});
  return response.data;
});

export const admissionsSLice = createSlice({});

export const {} = admissionsSLice.actions;

export default admissionsSLice.reducer;
