import * as types from '../types';

const initialState = '';
export const EmailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_EMAIL:
      return action.payload;
    default:
      return state;
  }
};

export default EmailReducer;
