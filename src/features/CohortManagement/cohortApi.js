import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { _getTokenFromSession, getDecodedAccessToken, showToast, hasAuthority } from '../../utils';

const API_URL = 'https://prunovate.onrender.com/api/v1/Cohort';

export const cohortsApi = createApi({
  reducerPath: 'cohortsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      // Retrieve token from session storage
      const token = _getTokenFromSession();
      console.log(token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Cohort'],
  endpoints: (builder) => ({
    getCohorts: builder.query({
      query: () => {
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('You do not have the authority to perform this action!');
        }
        return {
          url: '/get-all-cohort',
          method: 'GET',
        };
      },
      providesTags: ['Cohort'],
    }),
    getCohort: builder.query({}),
    getCohortCount: builder.query({
      query: () => {
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('Unauthorized to view organizations');
        }
        return { url: '/get-all-cohort?$count=true', method: 'GET' };
      },
      providesTags: ['Cohort'],
    }),
    createCohort: builder.mutation({
      query: (cohort) => {
        // Check authorization before executing mutation
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('You do not have the authority to perform this action!');
        }
        return {
          url: '/create-cohort',
          method: 'POST',
          body: cohort,
        };
      },
      invalidatesTags: ['Cohort'],
    }),
    updateCohort: builder.mutation({
      query: ({ cohortId, ...updates }) => {
        // Check authorization before executing mutation
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('You do not have the authority to perform this action!');
        }
        return {
          url: `/update-cohort/${cohortId}`,
          method: 'PATCH',
          body: updates,
        };
      },
      invalidatesTags: ['Cohort'],
    }),
    deleteCohort: builder.mutation({
      query: (organizationId, cohortId) => {
        // Check authorization before executing mutation
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('You do not have the authority to perform this action!');
        }
        return {
          url: `/delete-cohort/${organizationId}/${cohortId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Cohort'],
    }),
  }),
});

export const {
  useGetCohortsQuery,
  useGetCohortQuery,
  useGetCohortCountQuery,
  useCreateCohortMutation,
  useUpdateCohortMutation,
  useDeleteCohortMutation,
} = cohortsApi;
