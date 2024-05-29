import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  _getTokenFromSession,
  _setTokenToSession,
  _setRefreshTokenToSession,
  _setUserToSession,
  getDecodedAccessToken,
  showToast,
} from '../utils/index';


// Define user types
export const USERTYPES = {
  SuperAdmin: 'SuperAdmin',
  OrganizationAdmin: 'OrganizationAdmin',
  Tutor: 'Tutor',
  Student: 'Student',
};

// Create the authApiSlice
export const authApiSlice = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://prunovate.onrender.com/api/v1',
    prepareHeaders: async (headers, { getState }) => {
      const token = _getTokenFromSession();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Mutations for different authentication operations
    createOrganization: builder.mutation({
      query: (body) => ({
        url: '/Organization/create-organization',
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: '/Auth/signup',
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      onSuccess: (data, variables, api) => {
        const { navigate } = api.extra;
        // Navigate to '/verify' with necessary data
        navigate('/verify', {
          state: { email: variables.email, organizationId: variables.organizationIdentifier },
        });
      },
    }),
    confirmEmail: builder.mutation({
      query: (body) => ({
        url: '/Auth/confirm-email',
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    // to resend pin after completeProfile
    resendOtp: builder.mutation({
      query: (body) => ({
        url: 'Auth/send-activate-email',
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: '/Auth/login',
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      transformResponse: (data) => {
        const decodedToken = getDecodedAccessToken(data.data.token);
        console.log(decodedToken);
        _setUserToSession(data?.data);
        _setTokenToSession(data?.data?.token);
        const organizationId = localStorage.getItem('organizationId');

        if (decodedToken.IsProfileCompleted === 'False') {
          window.location = '/signup/completeprofile';
          return data;
        }

        // Redirect to different pages based on user role
        switch (decodedToken.role) {
          case USERTYPES.SuperAdmin:
            window.location = `/super-admin/dashboard/home`;
            break;
          case USERTYPES.OrganizationAdmin:
            window.location = `/admin/dashboard/home`;
            break;
          case USERTYPES.Tutor:
            window.location = '/tutor/dashboard/home';
            break;
          case USERTYPES.Student:
            window.location = '/student/dashboard/home';
            break;
          default:
            // Handle other cases or errors
            break;
        }

        return data;
      },
    }),
    completeProfile: builder.mutation({
      query: (body) => {
        const formData = new FormData();

        Object.entries(body).forEach(([key, value]) => {
          if (value !== null) {
            formData.append(key, value);
          }
        });
        return {
          url: '/User/update-organization-admin',
          method: 'PUT',
          body: formData,
        };
      },
      transformResponse: (data) => {
        const token = _getTokenFromSession();
        const decodedToken = getDecodedAccessToken(token);
        if (decodedToken.IsProfileCompleted === 'False') {
          showToast('You have to complete your profile to proceed! ', 'error');
          return data;
        }

        // Redirect to different pages based on user role
        if (decodedToken.IsProfileCompleted === 'True') {
          switch (decodedToken.role) {
            case USERTYPES.SuperAdmin:
              window.location = `/super-admin/dashboard/home/`;
              break;
            case USERTYPES.OrganizationAdmin:
              window.location = '/admin/dashboard/home';
              break;
            case USERTYPES.Tutor:
              window.location = '/tutor/dashboard/home';
              break;
            case USERTYPES.Student:
              window.location = '/student/dashboard/home';
              break;
            default:
              // Handle other cases or errors
              break;
          }
        } else {
          showToast('You have to complete your profile to proceed! ', 'error');
        }

        return data;
      },
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: '/Auth/forget-password',
        method: 'POST',
        body: JSON.stringify(email),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: '/Auth/reset-password',
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    // resetPassword: builder.mutation({
    //   query: ({ newPassword, confirmPassword, token }) => ({
    //     url: `/Auth/reset-password?newPassword=${newPassword}&confirmPassword=${confirmPassword}&token=${token}`,
    //     method: 'POST',
    //   }),
    // }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: '/Auth/change-password',
        method: 'POST',
        body: JSON.stringify(body),
      }),
    }),
  }),
});

// Export the individual mutation hooks
export const {
  useSignUpMutation,
  useConfirmEmailMutation,
  useResetPasswordMutation,
  useCreateOrganizationMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useCompleteProfileMutation,
  useResendOtpMutation,
  useForgetPasswordMutation,
} = authApiSlice;
