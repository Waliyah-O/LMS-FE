import * as Yup from 'yup';

export const SignupSchemaEmail = () => {
  return Yup.object({
    // organizationName: Yup.string().required('This field is required'),
    firstName: Yup.string().required('This field is required'),
    lastName: Yup.string().required('This field is required'),
    invitationCode: Yup.string().required('This field is required'),
    registrationType: Yup.string().required('This field is required'),
    email: Yup.string().required('This field is required').email('Invalid email address'),
    password: Yup.string()
      .required('This field is required')
      .min(10, 'Password must be 10 characters long')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[^\w]/, 'Password requires a special character'),
  });
};

export const LoginSchemaEmail = () => {
  return Yup.object({
    email: Yup.string().required('This field is required'),
    password: Yup.string().required('This field is required'),
  });
};

// export const VerifyEmailSchemaEmail = () => {
//   return Yup.object({
//     email: Yup.string().required('This field is required'),
//     password: Yup.string().required('This field is required'),
//   });
// };

// export const VerifyEmailSchema = () => {
//   Yup.object().shape({
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     otp: Yup.string()
//       .matches(/^\d{6}$/, 'OTP must be a 6-digit number')
//       .required('OTP is required'),
//   });
// };

export const VerifyEmailSchema = () => {
  return Yup.object({
    email: Yup.string().required('This field is required'),
    otp: Yup.string().required('OTP is required').length(6, 'OTP must be exactly 6 characters'),
  });
};

export const ForgotPasswordSchema = () => {
  return Yup.object().shape({
    email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  });
};

export const CompleteProfileSchema = () => {
  return Yup.object().shape({
    MiddleName: Yup.string().required('This field is required'),
    DateOfBirth: Yup.string().required('This field is required'),
    PhoneNumber: Yup.string().required('This field is required'),
    Gender: Yup.string().required('This field is required'),
    AddressLine: Yup.string().required('This field is required'),
    City: Yup.string().required('This field is required'),
    Country: Yup.string().required('This field is required'),
    // IsOrganizationAddress: Yup.boolean().required('This field is required'),
    OrganizationId: Yup.string().required('This field is required'),
    // OrganizationLogo: Yup.mixed().required('This file is required'),
  });
};

export const PasswordResetSchema = () => {
  return Yup.object().shape({
    email: Yup.string().required('This field is required').email('Invalid email address'),
    token: Yup.string().required('This field is required'),
    newPassword: Yup.string()
      .required('This field is required')
      .min(10, 'Password must be 10 characters long')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[^\w]/, 'Password requires a special character'),
    // confirmPassword: Yup.string()
    //   .required('This field is required')
    //   .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });
};

export const ContactUsForm = () => {
  return Yup.object({
    firstName: Yup.string().required('Enter your first name'),
    lastName: Yup.string().required('Enter your last name'),
    email: Yup.string().required('Enter your email'),
    phoneNum: Yup.string().required('Enter your phone number'),
    message: Yup.string().required('Enter your message'),
  });
};

export const DemoFormValidation = () => {
  return Yup.object({
    fullName: Yup.string().required('This field is required'),
    // customerType: Yup.string()
    //   .oneOf(['A investor/shareholder', 'A business or corporate body'], 'Pick one')
    //   .required('Please select one'),
    email: Yup.string().required('This field is required').email('Invalid email address'),
    organisation: Yup.string().required('This field cannot be empty'),
    discoveredBy: Yup.string().oneOf(['LinkedIn', 'Instagram'], 'Please select one').required('This field is required'),
  });
};

export const CreateAdminSchema = Yup.object().shape({
  organizationName: Yup.string().required('This field is required'),
  displayName: Yup.string().required('This field is required'),
  organizationEmail: Yup.string().required('This field is required'),
  adminFirstName: Yup.string().required('This field is required'),
  adminLastName: Yup.string().required('This field is required'),
  adminEmail: Yup.string().required('This field is required').email('Invalid email address'),
  // permissionsEnabled: Yup.array()
  //   .of(Yup.boolean())
  //   .min(1, 'At least one permission must be enabled')
  //   .test('atLeastOneTrue', 'At least one permission must be enabled', (value) =>
  //     value.some((permission) => permission === true)
  //   ),
});

export const disablingAccountSchema = () => {
  return Yup.object({
    reason: Yup.string().required('Reasons for Account Deactivation is required'),
  });
};

export const uploadingResourcesSchema = () => {
  return Yup.object({
    title: Yup.string().required('Title is required'),
    details: Yup.string().required('This is required'),
    files: Yup.array().min(1, 'At least one file must be uploaded'),
  });
};

export const creatingProgramSchema = () => {
  return Yup.object({
    title: Yup.string().required('Program title is required'),
    description: Yup.string().required('Program description is required'),
    cohort: Yup.string().required('Cohort selection is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().required('End date is required'),
    files: Yup.array().min(1, 'An image must be uploaded'),
  });
};

export const creatingCohortSchema = () => {
  return Yup.object({
    cohortName: Yup.string().required('Cohort title is required'),
    description: Yup.string().required('Cohort description is required'),
    organizationId: Yup.string().required('Organization Id is required'),
    status: Yup.string().required('status is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().required('End date is required'),
  });
};

export const creatingCourseSchema = () => {
  return Yup.object({
    title: Yup.string().required('Program title is required'),
    description: Yup.string().required('Program description is required'),
    tutor: Yup.string().required('Tutor selection is required'),
  });
};

export const schedulingClassSchema = () => {
  return Yup.object({
    title: Yup.string().required('Program title is required'),
    description: Yup.string().required('Program description is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().required('End date is required'),
    startTime: Yup.string().required('Start time is required'),
    classFrequency: Yup.string().required('Select a frequency for classes'),
    classOccurence: Yup.string().required('Select a frequency for classes'),
  });
};
