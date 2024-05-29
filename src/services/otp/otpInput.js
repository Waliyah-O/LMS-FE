import { useState, useCallback, useEffect } from 'react';
import SingleOTPInput from './SingleOTPInput';

const OtpVerificationInput = (props) => {
  const { onChangeOTP, setIsInvalid, isInvalidOTP, length } = props;

  const [activeInput, setActiveInput] = useState(0);
  const [otpValues, setOTPValues] = useState(Array(length).fill(''));

  // Helper to return OTP from inputs
  const handleOtpChange = useCallback(
    (otp) => {
      const otpValue = otp.join('');
      onChangeOTP(otpValue);
    },
    [onChangeOTP]
  );

  // Change OTP value at the focusing input
  const changeCodeAtFocus = useCallback(
    (str) => {
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeInput] = str;
      setOTPValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
      setIsInvalid(false);
    },
    [activeInput, handleOtpChange, otpValues, setIsInvalid]
  );

  // Focus `inputIndex` input
  const focusInput = useCallback(
    (inputIndex) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
      setActiveInput(selectedIndex);
    },
    [length]
  );

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1);
  }, [activeInput, focusInput]);

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1);
  }, [activeInput, focusInput]);

  // Handle onFocus input
  const handleOnFocus = useCallback(
    (index) => () => {
      focusInput(index);
    },
    [focusInput]
  );

  // Handle onChange value for each input
  const handleOnChange = useCallback(
    (e) => {
      const val = e.currentTarget.value;
      const alphaNumeric = /^[0-9]+$/;
      // const alphaNumeric = /^[a-zA-Z0-9]+$/;
      if (!val || !val.match(alphaNumeric)) {
        e.preventDefault();
        setIsInvalid(true);
        return;
      }
      changeCodeAtFocus(val);
      focusNextInput();
    },
    [changeCodeAtFocus, focusNextInput, setIsInvalid]
  );

  // Handle onBlur input
  const onBlur = useCallback(() => {
    setActiveInput(-1);
  }, []);

  useEffect(() => {
    if (isInvalidOTP) {
      onBlur();
    }
  }, [isInvalidOTP, onBlur]);

  // Handle onKeyDown input
  const handleOnKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case 'Backspace':
        case 'Delete': {
          e.preventDefault();
          if (otpValues[activeInput]) {
            changeCodeAtFocus('');
          } else {
            focusPrevInput();
          }
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          focusPrevInput();
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          focusNextInput();
          break;
        }
        default:
          break;
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
  );

  const handleOnPaste = useCallback(
    (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData('text/plain')
        .trim()
        .slice(0, length - activeInput)
        .split('');

      const alphaNumeric = /^[a-zA-Z0-9]+$/;
      const isAlphaNumeric = pastedData.join('').match(alphaNumeric);
      if (pastedData && isAlphaNumeric) {
        setIsInvalid(false);
        let nextFocusIndex = 0;
        const updatedOTPValues = [...otpValues];
        updatedOTPValues.forEach((val, index) => {
          if (index >= activeInput) {
            const changedValue = pastedData.shift() || val;
            if (changedValue) {
              updatedOTPValues[index] = changedValue;
              nextFocusIndex = index;
            }
          }
        });
        setOTPValues(updatedOTPValues);
        onChangeOTP(updatedOTPValues.join(''));
        setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
        return;
      } else {
        setIsInvalid(true);
        return;
      }
    },
    [activeInput, length, onChangeOTP, otpValues, setIsInvalid]
  );

  return (
    <div className="">
      <div className={`flex gap-2 lg:gap-3 py-1 justify-evenly`}>
        {otpValues.slice(0, otpValues.length / 2).map((_, index) => {
          return (
            <SingleOTPInput
              key={`SingleInput-${index}`}
              onChange={handleOnChange}
              type={'number'}
              focus={index === activeInput}
              onFocus={handleOnFocus(index)}
              value={otpValues && otpValues[index]}
              onPaste={handleOnPaste}
              onKeyDown={handleOnKeyDown}
              autoFocus={true}
              
              className={`input input-ghost w-full max-w-xs join-item rounded-none text-2xl text-center font-bold bg-neutral-200 [height:72px] focus:outline-none text-neutral-700 lg:w-14  rounded-l rounded-r outline-red ${
                otpValues[index] && 'border-primary-500'
              } ${
                isInvalidOTP
                  ? 'border border-error-main shadow-error focus-within:shadow-error focus-within:border-error-main '
                  : 'focus-within:shadow-active border border-neutral-400'
              }`}
              onBlur={onBlur}
            />
          );
        })}
        {otpValues.slice(otpValues.length / 2, otpValues.length).map((_, index) => {
          return (
            <SingleOTPInput
              key={`SingleInput-${index + otpValues.length / 2}`}
              onChange={handleOnChange}
              type={'number'}
              focus={index + otpValues.length / 2 === activeInput}
              onFocus={handleOnFocus(index + otpValues.length / 2)}
              value={otpValues && otpValues[index + otpValues.length / 2]}
              maxLength={1}
              onPaste={handleOnPaste}
              onKeyDown={handleOnKeyDown}
              autoFocus={true}
              className={`input input-ghost w-full max-w-xs join-item rounded-none text-2xl text-center font-bold bg-neutral-200 [height:72px] focus:outline-none text-neutral-700 lg:w-14  rounded-l rounded-r outline-red ${
                otpValues[index + otpValues.length / 2] && 'border-primary-500'
              } ${
                isInvalidOTP
                  ? 'border border-error-main shadow-error focus-within:shadow-error focus-within:border-error-main '
                  : 'focus-within:shadow-active border border-neutral-400'
              }`}
              onBlur={onBlur}
            />
          );
        })}
      </div>
      {isInvalidOTP && (
        <p className={`text-start text-error-main mb-9 ${isInvalidOTP && 'mt-3 text-red-550 text-sm'}`}>
          You have entered an invalid OTP
        </p>
      )}
    </div>
  );
};

export default OtpVerificationInput;
