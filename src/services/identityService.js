/* eslint-disable no-undef */
import { _removeTokenFromSession, getDecodedAccessToken } from '../utils';
import axios from './axios';
import { storageService } from './index';


const BASEURL = process.env.REACT_APP_BASE_URL;

export default class IdentityService {
  async logout() {
    storageService.clearAuthData();
    return window.location.replace(process.env.REACT_APP_LOGIN_URL);
  }

  async isAuthenticated() {
    const authData = storageService.getAuthData();
    // If authData is null or if either accessToken or userName is null, return false
    if (!authData || !authData.accessToken || !authData.userName) {
      return false;
    }
    return true;
  }

  // async isAuthenticated() {
  //   const authData = storageService.getAuthData();
  //   console.log(authData);
  //   if (authData === null) {
  //     return false;
  //   }
  //   if (!authData) {
  //     return false;
  //   }
  //   return true;
  // }

  async signUp(signUpData) {
    storageService.clearAuthData();

    // console.log(JSON.stringify(signUpData));

    try {
      const response = await axios.post(`${BASEURL}/api/v1/Auth/signup`, JSON.stringify(signUpData), { withCredentials: true });
      console.log(response);

      // const userData = getDecodedAccessToken(response.data);
      console.log(response.data);

      // storageService.saveAuthData({
      //   accessToken: response.data.accessToken,
      //   userName: response.data.userName,
      //   expires_in: userData.exp,
      // });

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async completeProfile(completeProfileData) {
    // storageService.clearAuthData();

    console.log(JSON.stringify(completeProfileData));

    try {
      const response = await axios.post(`${BASEURL}/api/v1/User/update-organization-admin`, JSON.stringify(completeProfileData), {
        withCredentials: true,
      });
      console.log(response);

      // const userData = getDecodedAccessToken(response.data);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async login(loginData) {
    storageService.clearAuthData();
    const response = await axios.post(`${BASEURL}/api/v1/Auth/login`, loginData);

    const userData = getDecodedAccessToken(response.data.data.token);
    console.log(userData.role);

    const isProfileCompleted = userData.IsProfileCompleted;
    console.log('is profile completed? ', isProfileCompleted);

    // if (isProfileCompleted) {
    //   window.location.replace(process.env.REACT_APP_DASHBOARD);
    // } else {
    //   window.location.replace(process.env.REACT_APP_COMPLETE_PROFILE);
    // }

    storageService.saveAuthData({
      accessToken: response.data.data.token,
      userName: userData.nameid,
      expires_in: userData.exp,
    });
    return response.data;
  }

  async forgotPassword(email) {
    // Implement the logic to initiate the forgot password process
    const response = await axios.post(`${BASEURL}/api/v1/Auth/forget-password`, email, { withCredentials: true });
    console.log(email);
    return response.data;
  }

  async resetPassword(resetData) {
    // Implement the logic to handle password reset
    const response = await axios.post(`${BASEURL}/api/v1/Auth/reset-password`, resetData, {
      withCredentials: true,
    });
    console.log(response);

    // Handle the response and update the auth data as needed
    const userData = getDecodedAccessToken(response.data);
    storageService.saveAuthData({
      accessToken: response.data.accessToken,
      userName: response.data.userName,
      expires_in: userData.exp,
    });

    return response.data;
  }

  async sendOTP(email) {
    try {
      // Send a request to the server to initiate the OTP sending process
      const response = await axios.post(
        `${BASEURL}/api/v1/Auth/signup`,
        { email },
        {
          withCredentials: true,
        }
      );

      // Handle the response
      console.log(response);

      // update the auth data or perform any other actions based on the response

      // storageService.set('otpSent', true);

      return response.data;
    } catch (error) {
      console.error('An error occurred while sending OTP:', error);
      throw error;
    }
  }
  async verifyOTP(otpData) {
    try {
      console.log('OTP Data: ', JSON.stringify(otpData));
      // Send a request to the server to verify the OTP
      const response = await axios.post(`${BASEURL}/api/v1/Auth/confirm-email`, JSON.stringify(otpData), {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      // console.log(JSON.stringify(otpData));

      // Handle the response
      console.log(response.data);

      //  update the authentication data or perform any other actions based on the response
      // storageService.set('otpVerified', true);

      return response.data;
    } catch (error) {
      console.error('An error occurred while verifying OTP:', error);
      throw error;
    }
  }
}
