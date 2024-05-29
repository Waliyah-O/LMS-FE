import { identityService } from '../../services';
import { showToast } from '../../utils';
import * as types from '../types';

export const loginAsync = (loginData, successCallback, errorCallback) => {
  return async (dispatch) => {
    dispatch({ type: types.LOGIN.REQUEST });
    try {
      const responseData = await identityService.login(loginData);
      showToast('Sign in Successful', 'success');
      dispatch({ type: types.LOGIN.SUCCESS, payload: { ...responseData } });
      successCallback?.(responseData);
    } catch (err) {
      dispatch({ type: types.LOGIN.FAILURE, payload: err });
      errorCallback?.();
    }
  };
};
export const signUpAsync = (signUpData, successCallback, errorCallback) => {
  return async (dispatch) => {
    dispatch({ type: types.SIGNUP.REQUEST });
    try {
      const responseData = await identityService.signUp(signUpData);
      console.log(responseData);
      showToast('Signup Successful', 'success');
      dispatch({ type: types.SIGNUP.SUCCESS, payload: { ...responseData } });
      dispatch(setOTP(responseData.otp));
      successCallback?.();
    } catch (err) {
      dispatch({ type: types.SIGNUP.FAILURE, payload: err });
      errorCallback?.();
    }
  };
};
export const completeProfileAsync = (completeProfileData, successCallback, errorCallback) => {
  return async (dispatch) => {
    dispatch({ type: types.COMPLETE_PROFILE.REQUEST });
    try {
      const responseData = await identityService.completeProfile(completeProfileData);
      console.log(responseData);
      showToast('COMPLETE PROFILE Successful', 'success');
      dispatch({ type: types.COMPLETE_PROFILE.SUCCESS, payload: { ...responseData } });
      dispatch(setOTP(responseData.otp));
      successCallback?.();
    } catch (err) {
      dispatch({ type: types.COMPLETE_PROFILE.FAILURE, payload: err });
      errorCallback?.();
    }
  };
};

export const verifyOTPAsync = (otpData, successCallback, errorCallback) => {
  return async (dispatch) => {
    dispatch({ type: types.VERIFY_OTP.REQUEST });
    try {
      const responseData = await identityService.verifyOTP(otpData);
      console.log(responseData);
      showToast('OTP Verified Successfully', 'success');
      dispatch({ type: types.VERIFY_OTP.SUCCESS, payload: { ...responseData } });
      successCallback?.();
    } catch (err) {
      dispatch({ type: types.VERIFY_OTP.FAILURE, payload: err });
      errorCallback?.();
    }
  };
};

export const sendOTPAsync = (otpData, successCallback, errorCallback) => {
  return async (dispatch) => {
    dispatch({ type: types.SEND_OTP.REQUEST });
    try {
      await identityService.sendOTP(otpData);
      showToast('OTP Sent Successfully', 'success');
      dispatch({ type: types.SEND_OTP.SUCCESS });
      successCallback?.();
    } catch (err) {
      dispatch({ type: types.SEND_OTP.FAILURE, payload: err });
      errorCallback?.();
    }
  };
};

export const forgotPasswordInitAsync = (email, successCallback, errorCallback) => {
  return async (dispatch) => {
    dispatch({ type: types.FORGOT_PASSWORD_INIT.REQUEST });
    try {
      await identityService.forgotPassword(email);
      showToast('OTP Sent Successfully', 'success');
      dispatch({ type: types.FORGOT_PASSWORD_INIT.SUCCESS });
      successCallback?.();
    } catch (err) {
      dispatch({ type: types.FORGOT_PASSWORD_INIT.FAILURE, payload: err });
      errorCallback?.();
    }
  };
};

function parseErrorMessage(data) {
  if (typeof data?.Message === 'string' && data?.Message !== '') {
    return data.Message;
  } else if (data?.Message instanceof Array && data.Message.length > 0) {
    return data?.Message[0];
  } else if (typeof data?.error === 'string' && data?.error !== '') {
    return data.error;
  } else if (data?.error instanceof Array) {
    return data?.error[0] || 'An error occurred, contact the webmasters';
  } else {
    return 'An error occurred, contact the webmasters';
  }
}

export const setOTP = (otp) => {
  return {
    type: types.SET_OTP,
    payload: otp,
  };
};
