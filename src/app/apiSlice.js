import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { _getTokenFromSession } from '../utils';

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_BASEURL,
    prepareHeaders: async (headers, { getState }) => {
      const token = _getTokenFromSession();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Cohorts'],
  endpoints: (builder) => ({}),
});
