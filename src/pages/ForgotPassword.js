import { useFormik } from 'formik';
import AuthLayout from '../components/layouts/AuthLayout';
import CustomInput from '../components/customInputs/CustomInputs';
import Button from '../components/button';
import { ButtonSize, ButtonState } from '../components/button/enum';
import { ForgotPasswordSchema } from '../validations';
// import { showToast } from '../../src/utils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../utils';
import { useState } from 'react';
import { forgotPasswordInitAsync } from '../redux/actions/auth.actions';
import { useForgetPasswordMutation } from '../users/user-apiSlice';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [forgetPassword, { isItLoading, isItError }] = useForgetPasswordMutation();

  const handleSubmit = async (email) => {
    try {
      setIsLoading(true);
      const response = await forgetPassword(email);
      console.log(response);
      showToast(
        <>
          {response.data.message} <br /> <p>please check your email</p>
        </>,
        'success'
      );
      navigate('/reset-password');
      isItError
        ? showToast(
            <>
              {response.data.message} <br /> <p>please try again</p>
            </>,
            'error'
          )
        : null;
    } catch (error) {
      console.error(' Error:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false); // Ensure loading state is reset even on errors
    }
  };

  // const handleSubmit = async (values) => {
  //   setIsLoading(true);
  //   try {
  //     await dispatch(
  //       forgotPasswordInitAsync(
  //         values,
  //         () => {
  //           // redirect to another page
  //           console.log('email send successfully!');
  //           showToast(`Link sent to ${formik.values.email}`, 'success');
  //           navigate(`/reset-password/`, { state: { email: formik.values.email } });
  //         },
  //         () => {
  //           //  display an error message to the user
  //           showToast('failed to send link to email, try again!', 'error');
  //           console.error('forgot password failed!');
  //         }
  //       )
  //     );
  //   } catch (error) {
  //     // Handle any unexpected errors
  //     console.error('An unexpected error occurred:', error);
  //   } finally {
  //     setIsLoading(false);
  //     console.log(values);
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: handleSubmit,
  });
  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit} className="mt-5">
        <CustomInput
          name={'email'}
          labelText={'Email Address'}
          placeholder={'Enter email address'}
          required={true}
          type={'email'}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          inputError={formik.touched.email && formik.errors.email}
        />

        <Button
          value={
            isLoading ? (
              <>
                <span className={`loading loading-bars`} />
              </>
            ) : (
              'Reset Password'
            )
          }
          size={ButtonSize.lg}
          variant={ButtonState.PRIMARY}
          type={'Button'}
          onClick={() => formik.handleSubmit()}
          className={'w-full mt-8'}
          disabled={!formik.isValid || !formik.dirty}
        />
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
