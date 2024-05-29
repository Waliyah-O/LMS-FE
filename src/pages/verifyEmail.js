import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VerifyEmailPageLayout from '../components/layouts/VerifyEmailPageLayout';
import OtpVerificationInput from '../services/otp/otpInput';
import { showToast } from '../utils';
import { useDispatch } from 'react-redux';
import Button from '../components/button';
import { ButtonSize, ButtonState } from '../components/button/enum';
import { useFormik } from 'formik';
import { VerifyEmailSchema } from '../validations/auth.validation';
import CustomInput from '../components/customInputs/CustomInputs';
import { useConfirmEmailMutation, useResendOtpMutation } from '../users/user-apiSlice';

const VerifyEmailPage = () => {
  const [oneTimePin, setOneTimePin] = useState('');
  const [resendTime, setResendTime] = useState(10);
  const [loading, setLoading] = useState(false);
  const [verificationError, setVerificationError] = useState(null);
  const [sendOTPError, setSendOTPError] = useState(null);
  const location = useLocation();
  const emailFromRoute = location.state && location.state.email;
  const organizationInFromRoute = location.state && location.state.organizationId;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [confirmEmailMutation, { isLoading, isError }] = useConfirmEmailMutation();
  const [resendOtpMutant, { isResend, isResendError }] = useResendOtpMutation();

  const handleVerifyEmail = async () => {
    try {
      setLoading(true);
      const response = await confirmEmailMutation({ email: formik.values.email, oneTimePin: Number(oneTimePin) }).unwrap();
      // Handle response data
      console.log(response);
      showToast(<>{response.message} <br/> <span>sign in to continue...</span></>, 'success')
      navigate('/signin')
    } catch (error) {
      // Handle error
      console.error(error);
      setVerificationError(error.message); // Assuming error.message contains the error message
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setLoading(true);
      const response = await resendOtpMutant({ email: formik.values.email }).unwrap();
      console.log(response);
      showToast('otp sent successfully', 'success');
    } catch (error) {
      showToast('error', 'error');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      oneTimePin: oneTimePin,
    },
    validationSchema: VerifyEmailSchema,
    onSubmit: handleVerifyEmail,
  });

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minutes ${remainingSeconds} seconds`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setResendTime((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <VerifyEmailPageLayout>
      <div className="flex flex-col gap-7">
        {verificationError && (
          <p className="bg-error/50 text-error-content py-2 px-4 rounded-md">An error occurred: {verificationError}</p>
        )}
        {sendOTPError && <p className="bg-error/50 text-error-content py-2 px-4 rounded-md">Error sending OTP: {sendOTPError}</p>}
        {/* <CustomInput
          inputError={formik.touched.organizationId && formik.errors.organizationId}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={organizationInFromRoute}
          type="text"
          // readOnly={true}
          labelText="Organization Id "
          // placeholder={organizationIdFromRoute}
          placeholder={formik.errors.organizationId ? 'Enter a valid organizationId ' : 'Enter organizationId '}
          name="organizationId"
        /> */}
        <CustomInput
          inputError={formik.touched.email && formik.errors.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          type="email"
          // readOnly={true}
          labelText="Email Address"
          // placeholder={emailFromRoute}
          placeholder={formik.errors.email ? 'Enter a valid email address' : 'Enter email address'}
          name="email"
        />

        <div className="flex flex-col gap-4">
          <OtpVerificationInput
            onChangeOTP={(newOtp) => {
              setOneTimePin(newOtp);
              formik.setFieldValue('otp', newOtp);
            }}
            length={6}
            setIsInvalid={() => {}} // Dummy handler for validation
            isInvalidOTP={false} // Set to false initially
            inputError={formik.touched.otp && formik.errors.otp}
          />
          <p className="font-size:14px color:#111928 font-weight:400">Check your email for the verification code</p>
          <p className="mt-4">
            Didn't get the code?{' '}
            <button
              className={`mt-2 font-semibold py-2 ${resendTime === 0 ? 'link link-hover italic' : 'opacity-50'}`}
              onClick={resendOtp}
              disabled={resendTime !== 0 || loading}
            >
              {loading? 'Resending' : 'Resend'}
              
              {resendTime === 0 || sendOTPError ? 'now' : `in ${formatTime(resendTime)}`}
            </button>
          </p>
        </div>
        <Button
          value={loading ? <span className="loading loading-bars" /> : 'Next'}
          size={ButtonSize.lg}
          variant={ButtonState.PRIMARY}
          type="button"
          className="w-full mt-2"
          onClick={formik.handleSubmit}
          disabled={!formik.isValid || !formik.dirty}
        />
      </div>
    </VerifyEmailPageLayout>
  );
};

export default VerifyEmailPage;
