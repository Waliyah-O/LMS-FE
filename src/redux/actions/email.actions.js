import * as types from '../types';

export const setEmail = (email) => ({
  type: types.SET_EMAIL,
  payload: email,
});
