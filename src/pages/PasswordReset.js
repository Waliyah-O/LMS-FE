import AuthLayout from '../components/layouts/AuthLayout';
import { useFormik } from 'formik';
import { _getTokenFromSession, showToast } from '../../src/utils';
import { PasswordResetSchema } from '../validations';
import CustomInput from '../components/customInputs/CustomInputs';
import ErrorFields from '../components/error/ErrorFields';
import Button from '../../src/components/button';
import { ButtonSize, ButtonState } from '../../src/components/button/enum';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../users/user-apiSlice';

const PasswordReset = () => {
  const email = useSelector((state) => state.email);
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromRoute = location.state && location.state.email;

  const [resetPasswordMutation, { isLoading, isError }] = useResetPasswordMutation();

  const handleSubmit = async (values) => {
    try {
      // setIsLoading(true);
      const response = await resetPasswordMutation(values);
      console.log(response);
      showToast(
        <>
          {response.data.message} <br /> <p>please check your email</p>
        </>,
        'success'
      );
      navigate('/signin');
     
    } catch (response) {
      console.error(' Error:', response);
      isError ? ( showToast(<>{response.data.message} <br/> <p>please try again</p></>, 'success')) : null
      // setIsLoading(false);
      showToast('Error occurred. Please try again.', 'error');
    } finally {
      // setIsLoading(false); // Ensure loading state is reset even on errors
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      token: '',
      newPassword: '',
    },
    validationSchema: PasswordResetSchema,
    onSubmit: handleSubmit,
  });

  // function handleSubmit(values) {
  //   showToast(
  //     <>
  //       <p>Password Reset Successful</p>
  //       <span className="text-labels font-normal"> Check your email to reset your password</span>
  //     </>,
  //     'success'
  //   );
  //   console.log(values);
  // }
  return (
    <AuthLayout>
      <form className="h-screen flex flex-col gap-2 mt-5" onSubmit={formik.handleSubmit}>
        <CustomInput
          inputError={formik.touched.email && formik.errors.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          type="email"
          // readOnly={true}
          labelText="Email Address"
          placeholder={'Enter email address'}
          name="email"
        />
        {
          <>
            
          </>
        }
        <CustomInput
          inputError={formik.touched.token && formik.errors.token}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.token}
          type="token"
          labelText="token"
          placeholder={'Enter token'}
          name="token"
        />

        <CustomInput
          inputError={formik.errors.newPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          type="password"
          labelText="Confirm Password"
          placeholder={'Confirm Password'}
          name="newPassword"
        />

        <ErrorFields password={formik.values.newPassword} formik={formik} />

        <Button
          value={
            isLoading ? (
              <>
                <span className={`loading loading-bars`} />
              </>
            ) : (
              'Change Password'
            )
          }
          size={ButtonSize.lg}
          variant={ButtonState.PRIMARY}
          type={'Button'}
          onClick={() => formik.handleSubmit()}
          className={'w-full mt-2'}
          disabled={!formik.isValid || !formik.dirty}
        />
      </form>
    </AuthLayout>
  );
};

export default PasswordReset;
