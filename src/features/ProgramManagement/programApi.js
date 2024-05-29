import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { _getTokenFromSession, getDecodedAccessToken, showToast, hasAuthority } from '../../utils';

const API_URL = 'https://prunovate.onrender.com/api/v1/Program';

// const hasAuthority = (token) => {
//   const decodedToken = getDecodedAccessToken(token);
//   if (!decodedToken) return false; // Token is invalid or expired
//   const { role } = decodedToken; // Assuming 'role' is the key for user role in the token
//   return role.includes('OrganizationAdmin') || role.includes('SuperAdmin');
// };

export const programsApi = createApi({
  reducerPath: 'programsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      // Retrieve token from session storage
      const token = _getTokenFromSession();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Program'],
  endpoints: (builder) => ({
    getPrograms: builder.query({
      // query: () => '/get-program',
      query: () => {
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('You do not have the authority to perform this action!');
        }
        return {
          url: '/get-program',
          method: 'GET',
        };
      },
      providesTags: ['Program'],
    }),
    getProgram: builder.query({}),
    getProgramCount: builder.query({
      query: () => {
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('Unauthorized to view organizations');
        }
        return { url: '/get-program?$count=true', method: 'GET' };
      },
      providesTags: ['Cohort'],
    }),
    createProgram: builder.mutation({
      query: (program) => {
        // Check authorization before executing mutation
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('You do not have the authority to perform this action!');
        }
        return {
          url: '/create-program',
          method: 'POST',
          body: program,
        };
      },
      invalidatesTags: ['Program'],
    }),
    updateProgram: builder.mutation({
      query: ({ programId, ...updates }) => {
        // Check authorization before executing mutation
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('You do not have the authority to perform this action!');
        }
        return {
          url: `/update-program/${programId}`,
          method: 'PATCH',
          body: updates,
        };
      },
      invalidatesTags: ['Program'],
    }),
    deleteProgram: builder.mutation({
      query: (organizationId, programId) => {
        // Check authorization before executing mutation
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('You do not have the authority to perform this action!');
        }
        return {
          url: `/delete-program/${organizationId}/${programId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Program'],
    }),
  }),
});

export const {
  useGetProgramsQuery,
  useGetProgramQuery,
  useGetProgramCountQuery,
  useCreateProgramMutation,
  useUpdateProgramMutation,
  useDeleteProgramMutation,
} = programsApi;
