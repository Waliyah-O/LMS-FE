import * as types from '../types';

export const chooseFirstName = (payload) => ({
  type: types.CHOOSE_FIRST_NAME,
  payload,
});

export const chooseLastName = (payload) => ({
  type: types.CHOOSE_LAST_NAME,
  payload,
});

export const chooseEmail = (payload) => ({
  type: types.CHOOSE_EMAIL,
  payload,
});

export const choosePassword = (payload) => ({
  type: types.CHOOSE_PASSWORD,
  payload,
});

export const chooseAge = (payload) => ({
  type: types.CHOOSE_AGE,
  payload,
});

export const chooseGender = (payload) => ({
  type: types.CHOOSE_GENDER,
  payload,
});

export const choosePhoneNumber = (payload) => ({
  type: types.CHOOSE_PHONE_NUMBER,
  payload,
});

export const chooseAddress = (payload) => ({
  type: types.CHOOSE_ADDRESS,
  payload,
});

export const completeStep = (payload) => ({
  type: types.COMPLETE_STEP,
  payload,
});

export const resetSteps = () => ({
  type: types.RESET_STEPS,
});