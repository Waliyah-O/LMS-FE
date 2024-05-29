import * as types from '../types';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  age: '',
  gender: '',
  phoneNumber: '',
  address: '',
  completedSteps: {
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHOOSE_FIRST_NAME:
      return { ...state, firstName: action.payload };
    case types.CHOOSE_LAST_NAME:
      return { ...state, lastName: action.payload };
    case types.CHOOSE_EMAIL:
      return { ...state, email: action.payload };
    case types.CHOOSE_PASSWORD:
      return { ...state, password: action.payload };
    case types.CHOOSE_AGE:
      return { ...state, age: action.payload };
    case types.CHOOSE_GENDER:
      return { ...state, gender: action.payload };
    case types.CHOOSE_PHONE_NUMBER:
      return { ...state, phoneNumber: action.payload };
    case types.CHOOSE_ADDRESS:
      return { ...state, address: action.payload };
    case types.COMPLETE_STEP:
      return { ...state, completedSteps: { ...state.completedSteps, [action.payload]: true } };
    case types.RESET_STEPS:
      return {
        ...state,
        completedSteps: {
          step1: false,
          step2: false,
          step3: false,
          step4: false,
        },
      };
    default:
      return state;
  }
};

export default reducer