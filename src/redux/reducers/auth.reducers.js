import * as types from '../types';

const initialState = {
  loading: false,
  error: null,
  otp: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOGIN.REQUEST:
    case types.SIGNUP.REQUEST:
      return { ...state, loading: true };

    case types.LOGIN.SUCCESS:
    case types.SIGNUP.SUCCESS:
      return { ...state, loading: false, ...payload };

    case types.LOGIN.FAILURE:
    case types.SIGNUP.FAILURE:
      return { ...state, loading: false, error: payload };
    case types.SET_OTP:
      return { ...state, otp: payload };
    default:
      return state;
  }
};

export default reducer;
