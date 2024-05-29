/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { ReactComponent as Checkmark } from '../../assets/svg/greyCheck.svg';
import { ReactComponent as Error } from '../../assets/svg/redError.svg';
import { ReactComponent as GreenCheck } from '../../assets/svg/greenCheck.svg';
import { hasCaps, hasDigit, hasLowerCase, hasSpecialCharacter } from '../../utils/constants';

const ErrorTexts = ({ text, isError, formik }) => (
  <div className={'flex items-center gap-2 px-1'}>
    {formik.values.password === '' ? (
      <Checkmark />
    ) : isError ? (
      <Error />
    ) : (
      <GreenCheck />
    )}
    <span
      className={`text-labels ${
        formik.values.password === ''
          ? 'text-gray-300'
          : isError
          ? 'text-red-500'
          : 'text-green-500'
      }`}
    >
      {text}
    </span>
  </div>
);

const ErrorFields = ({ password, formik, className }) => {
  const [errors, setErrors] = useState({
    minLength: true,
    uppercase: true,
    lowercase: true,
    specialCharacter: true,
    number: true,
  });

  useEffect(() => {
    setErrors({
      minLength: password.length >= 10,
      uppercase: hasCaps(password),
      lowercase: hasLowerCase(password),
      specialCharacter: hasSpecialCharacter(password),
      number: hasDigit(password),
    });
  }, [password]);

  return (
    <div className={className}>
      <ErrorTexts
        text="At least 10 characters"
        isError={!errors.minLength}
        formik={formik}
      />
      <ErrorTexts
        text="At least one uppercase letter"
        isError={!errors.uppercase}
        formik={formik}
      />
      <ErrorTexts
        text="At least one lowercase character"
        isError={!errors.lowercase}
        formik={formik}
      />
      <ErrorTexts
        text="At least one number"
        isError={!errors.number}
        formik={formik}
      />
      <ErrorTexts
        text="Inclusion of at least one special character, e.g., ! @ # ?"
        isError={!errors.specialCharacter}
        formik={formik}
      />
    </div>
  );
};

export default ErrorFields;
