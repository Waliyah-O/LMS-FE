import { generateActions } from '../../utils';

export const LOGIN = generateActions('LOGIN');
export const SIGNUP = generateActions('SIGNUP');
export const COMPLETE_PROFILE = generateActions('COMPLETE_PROFILE');

export const SET_OTP = 'SET_OTP';

export const SEND_OTP = generateActions('SEND_OTP');
export const VERIFY_OTP = generateActions('VERIFY_OTP');

export const FORGOT_PASSWORD_INIT = generateActions('FORGOT_PASSWORD_INIT');
