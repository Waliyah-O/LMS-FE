import { useState, useEffect } from 'react';
import CustomInput from '../components/customInputs/CustomInputs';
import { ReactComponent as Eyelash } from '../assets/svg/eyeslash.svg';
import { useFormik } from 'formik';
import { ButtonSize, ButtonState } from '../components/button/enum';
import Button from '../components/button';
import { _getTokenFromSession, _setUserToSession, getDecodedAccessToken, isAuth, showToast } from '../utils';
import { LoginSchemaEmail } from '../validations';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../users/user-apiSlice';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authState = useSelector((state) => state.auth);

  const organizationInFromRoute = location.state && location.state.organizationId;

  const [loginMutation, { isLoading, isError }] = useLoginMutation();

  const handleSubmit = async () => {
    try {
      const response = await loginMutation({ email: formik.values.email, password: formik.values.password }).unwrap(); // Unwrap promise

      console.log(response);
      console.log(response.data);

      showToast(`${response.message}!`, 'success');
    } catch (error) {
      console.error('Login Error:', error);
      console.log(error.status);
      if (error.status === 401) {
        showToast(
          <div className="text-labels">
            Unregistered user! <br />{' '}
            <Link to="/signup" className="hover:underline text-red-650 italic">
              Create an account
            </Link>{' '}
            to log in
          </div>,
          'error'
        );
      } else {
        showToast('Error occurred during login. Please try again.', 'error');
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchemaEmail,
    onSubmit: handleSubmit,
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // Example of checking authentication status
    const checkAuthStatus = async () => {
      const isAuthenticated = isAuth();
      console.log('Is Authenticated:', isAuthenticated);
    };

    checkAuthStatus();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
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
      <CustomInput
        name={'password'}
        labelText={'Password'}
        placeholder={'Enter password'}
        required={true}
        type={showPassword ? 'text' : 'password'}
        icon={<Eyelash onClick={togglePassword} />}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.password}
        inputError={formik.touched.password && formik.errors.password}
      />
      <Link to={'/forget-password'}>
        <span className="w-full flex justify-end [color:#1F2A37] text-sm"> Forgot Password?</span>
      </Link>
      <Button
        value={
          isLoading ? (
            <>
              <span className={`loading loading-bars`} />
            </>
          ) : (
            'Sign in'
          )
        }
        size={ButtonSize.lg}
        variant={ButtonState.PRIMARY}
        type={'Button'}
        onClick={() => handleSubmit()} // Call handleSubmit function when button is clicked
        className={'w-full mt-2'}
        disabled={!formik.isValid || !formik.dirty}
      />
    </form>
  );
};

export default SignIn;
