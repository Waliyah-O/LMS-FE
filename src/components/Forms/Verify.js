import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOTP } from '../../redux/actions/auth.actions';
import OtpVerificationInput from '../../services/otp/otpInput';

const VerifyOTP = () => {
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const dispatch = useDispatch();

  useEffect(() => {
    if (otpValues.every((val) => val !== '')) {
      dispatch(setOTP(otpValues.join('')));
    }
    if (otpValues.every((value) => value === '')) {
      inputRefs[0].current.focus();
    }
  }, [otpValues]);

  const handleChangeOTP = (newOtp) => {
    console.log(newOtp);
  };

  const handleInputChange = (index, value) => {
    if (!isNaN(value) && value !== ' ') {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      if (value && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleBackspace = (index) => {
    if (index > 0 && inputRefs[index - 1].current) {
      const newOtpValues = [...otpValues];
      newOtpValues[index - 1] = '';
      setOtpValues(newOtpValues);
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text/plain').replace(/\D/g, ''); // Remove non-numeric characters
    const newOtpValues = Array.from(pastedText.padEnd(4, ' ').slice(0, 4));

    setOtpValues(newOtpValues);

    for (let i = 0; i < 4; i++) {
      if (i < 3) {
        inputRefs[i].current.focus();
      }
    }
  };

  const handleKeyUp = (index, event) => {
    if (event.key === 'Backspace' && !otpValues[index] && index > 0) {
      handleBackspace(index);
    }

    if (event.key >= '0' && event.key <= '9') {
      handleInputChange(index, event.key);
    }

    if (index === 3 && otpValues.every((value) => value !== '')) {
      dispatch(setOTP(otpValues.join('')));
    }
  };

  return (
    <>
      <div className="w-full flex gap-4">
        {otpValues.map((value, index) => (
          <OtpVerificationInput
            key={index}
            type={'text'}
            value={value}
            maxLength={1}
            onChange={({ target: { value } }) => handleInputChange(index, value)}
            className={`input input-ghost w-full max-w-xs join-item rounded-none text-2xl text-center font-bold bg-neutral-200 [height:72px] ${
              !value && index > 0 && otpValues[index - 1] === '' ? 'invalid' : ''
            }`}
            onKeyUp={(e) => handleKeyUp(index, e)}
            onPaste={handlePaste}
            ref={inputRefs[index]}
            disabled={!value && index > 0 && otpValues[index - 1] === ''}
          />
        ))}
      </div>
    </>
  );
};

export default VerifyOTP;
