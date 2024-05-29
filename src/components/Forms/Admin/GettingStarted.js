import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import CustomInput from '../../customInputs/CustomInputs';
import ErrorFields from '../../error/ErrorFields';
import { SignupSchemaEmail } from '../../../validations';
import Button from '../../button';
import { ButtonSize, ButtonState } from '../../button/enum';
import { showToast } from '../../../utils';
import { useSignUpMutation } from '../../../users/user-apiSlice';

const GettingStarted = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // const preSignUpData = location.state?.formData;
  // console.log(preSignUpData);

  const [signUpMutation, { isLoading: isSigningUp, isError: signUpError }] = useSignUpMutation();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await signUpMutation({
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        email: formik.values.email,
        password: formik.values.password,
        invitationCode: formik.values.invitationCode,
        registrationType: formik.values.registrationType,
      }).unwrap();
      console.log(response);
      if (response.message) {
        showToast(response.message, 'success');
        navigate('/verify', { state: { email: formik.values.email, organizationId: formik.values.invitationCode } });
        console.log(response);
      } else {
        showToast(
          <>
            signed up successfully
            <br />
            <span className="text-sm">check your email for your organization Id</span>
          </>,
          'success'
        );
      }
    } catch (error) {
      // Handle error
      console.error(error);
      showToast(`${error.data.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      invitationCode: '',
      registrationType: '',
    },
    validationSchema: SignupSchemaEmail,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <form className="flex flex-col gap-1" onSubmit={formik.handleSubmit}>
        <CustomInput
          inputError={formik.touched.registrationType && formik.errors.registrationType}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.registrationType}
          type="text"
          // readOnly={true}
          // className={'hidden'}
          labelText="Organization Type"
          placeholder={'Enter organization type'}
          name="registrationType"
        />

        <CustomInput
          inputError={formik.touched.firstName && formik.errors.firstName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.firstName}
          type="text"
          labelText="Admin First Name"
          placeholder={'Enter first name'}
          name="firstName"
        />

        <CustomInput
          inputError={formik.touched.lastName && formik.errors.lastName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.lastName}
          type="text"
          labelText="Admin Last Name"
          placeholder={'Enter last name'}
          name="lastName"
        />

        <CustomInput
          inputError={formik.touched.invitationCode && formik.errors.invitationCode}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.invitationCode}
          type="text"
          labelText="Invitation Code"
          placeholder={'Enter invitation code'}
          name="invitationCode"
        />

        <CustomInput
          inputError={formik.touched.email && formik.errors.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          type="email"
          labelText="Admin Email Address"
          placeholder={'Enter admin email address'}
          name="email"
        />

        <CustomInput
          inputError={formik.touched.password && formik.errors.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          type="password"
          labelText="Password"
          placeholder={'Enter Password'}
          name="password"
        />

        <ErrorFields password={formik.values.password} formik={formik} />
        <Button
          value={
            isLoading ? (
              <>
                <span className={`loading loading-bars`} />
              </>
            ) : (
              'Next'
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
    </div>
  );
};

{
  /* <CustomInput
          inputError={formik.touched.organizationName && formik.errors.organizationName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.organizationName}
          type="text"
          labelText="Organization Name"
          placeholder={'Enter organization name'}
          name="organizationName"
        /> */
}

export default GettingStarted;
