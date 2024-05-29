// In your Redux reducer file

// import { SUSPEND_TRUE, SUSPEND_FALSE } from '../actions/suspend.actions.js';
import * as types from '../types'

// Define initial state
const initialState = {
  isSuspended: false,
};

// Define the reducer function
const suspendReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SUSPEND_TRUE:
      return {
        ...state,
        isSuspended: true,
      };
    case types.SUSPEND_FALSE:
      return {
        ...state,
        isSuspended: false,
      };
    default:
      return state;
  }
};

export default suspendReducer;
