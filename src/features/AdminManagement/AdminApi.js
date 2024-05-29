import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { _getTokenFromSession, showToast, hasAuthority } from '../../utils';

const API_URL = 'https://prunovate.onrender.com/api/v1/Organization';

export const adminsApi = createApi({
  reducerPath: 'adminsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      // Retrieve token from session storage
      const token = _getTokenFromSession();
      if (!hasAuthority(token)) {
        showToast('please login!', 'error');
        throw new Error('Unauthorized to view organizations');
      }
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
    onError: (error) => {
      console.error('API error:', error);
      showToast('An error occurred. Please try again later.', 'error');
    },
  }),
  tagTypes: ['Organization'],
  endpoints: (builder) => ({
    getOrganizations: builder.query({
      query: () => {
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('Unauthorized to view organizations');
        }
        return { url: '/', method: 'GET' };
      },
      providesTags: ['Organization'],
    }),
    getOrganizationCount: builder.query({
      query: () => {
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('Unauthorized to view organizations');
        }
        return { url: '?$count=true', method: 'GET' };
      },
      providesTags: ['Organization'],
    }),
    getOrganization: builder.query({
      query: (organizationId) => {
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('Unauthorized to view organization');
        }
        return { url: `/${organizationId}`, method: 'GET' };
      },
      providesTags: ['Organization'],
    }),
    createOrganization: builder.mutation({
      query: (body) => {
        // Check authorization before executing mutation
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('You do not have the authority to perform this action!');
        }
        return {
          url: '/create-organization',
          method: 'POST',
          body: JSON.stringify(body),
        };
      },
      invalidatesTags: ['Organization'],
    }),
    updateOrganization: builder.mutation({
      query: ({ organizationId, ...updates }) => {
        // Check authorization before executing mutation
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('You do not have the authority to perform this action!');
        }
        return {
          url: `/update-organization/${organizationId}`,
          method: 'PATCH',
          body: updates,
        };
      },
      invalidatesTags: ['Organization'],
    }),
    suspendOrganization: builder.mutation({
      query: ({ organizationId }) => {
        // Check authorization before executing mutation
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('You do not have the authority to perform this action!');
        }
        return {
          url: `/suspend-organization/${organizationId}`,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['Organization'],
    }),
    reactivateOrganization: builder.mutation({
      query: ({ organizationId }) => {
        // Check authorization before executing mutation
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('You do not have the authority to perform this action!');
        }
        return {
          url: `/reactivate-organization/${organizationId}`,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['Organization'],
    }),
    deleteOrganization: builder.mutation({
      query: (organizationId) => {
        // Check authorization before executing mutation
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('You do not have the authority to perform this action!');
        }
        return {
          url: `/delete-organization/${organizationId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Program'],
    }),
    uploadOrganizationLogo: builder.mutation({
      query: (logo) => {
        // Check authorization before executing mutation
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('You do not have the authority to perform this action!');
        }
        return {
          url: `/upload-organizationLogo`,
          method: 'POST',
          body: logo,
        };
      },
      invalidatesTags: ['Program'],
    }),
    approveOrganization: builder.mutation({
      query: (organizationId) => {
        // Check authorization before executing mutation
        const token = _getTokenFromSession();
        if (!hasAuthority(token)) {
          showToast('please login!', 'error');
          throw new Error('You do not have the authority to perform this action!');
        }
        return {
          url: `/approve-organization`,
          method: 'POST',
          body: organizationId,
        };
      },
      invalidatesTags: ['Program'],
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useGetOrganizationQuery,
  useGetOrganizationCountQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useSuspendOrganizationMutation,
  useReactivateOrganizationMutation,
  useDeleteOrganizationMutation,
  useUploadOrganizationLogoMutation,
  useApproveOrganizationMutation,
} = adminsApi;
