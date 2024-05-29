import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import CustomInput from '../../customInputs/CustomInputs';
import CustomSelect from '../../customInputs/CustomSelect';
import DateInput from '../../customInputs/DateInput';
import Button from '../../button';
import { ButtonSize, ButtonState } from '../../button/enum';
import { _getTokenFromSession, getDecodedAccessToken, isAuth, showToast } from '../../../utils';
import { CompleteProfileSchema } from '../../../validations';
import states from './nigeriaStates.json';
import { useDispatch } from 'react-redux';
import { useCompleteProfileMutation } from '../../../users/user-apiSlice';
import FileUpload from '../../fileUpload';

const CompleteProfile = ({ location }) => {
  const [startDateInputType, setStartDateInputType] = useState('text');
  const [startDate, setStartDate] = useState(null);
  const decodedToken = getDecodedAccessToken(_getTokenFromSession());
  console.log(decodedToken);
  console.log('is Authenticated?', isAuth());

  const [completeProfileMutation, { isLoading, isError }] = useCompleteProfileMutation();

  const countryOptions = [{ position: 1, label: 'Nigeria' }];

  const stateOptions = states.map((state, index) => ({
    value: state,
    label: state,
    position: index + 1,
  }));

  const genderOptions = [
    { position: 1, label: 'Female' },
    { position: 2, label: 'Male' },
  ];

  // const date = new Date();
  // const year = date.toLocaleString('default', { year: 'numeric' });
  // const month = date.toLocaleString('default', { month: '2-digit' });
  // const day = date.toLocaleString('default', { day: '2-digit' });
  // const concatDate = year + '-' + month + '-' + day;
  // console.log(concatDate);

  const handleSubmit = async (values) => {
    try {
      // const payload = { ...values, DateOfBirth: formik.values.DateOfBirth };
      // console.log(payload);
      // const binaryData = await convertImageToBinary(values.OrganizationLogo[0]); // OrganizationLogo is an array containing the uploaded image

      // // Append binary data to the payload
      // payload.OrganizationLogo = binaryData;
      const response = await completeProfileMutation(values);
      console.log(response);
      showToast('Admin profile updated', 'success');
      localStorage.setItem('organizationId', values.OrganizationId);
      sessionStorage.setItem('organizationId', values.OrganizationId);
      // navigate('/dashboard'); // Redirect to dashboard after successful profile completion
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      MiddleName: '',
      DateOfBirth: '',
      PhoneNumber: '',
      Gender: '',
      Region: '',
      AddressLine: '',
      City: '',
      Country: '',
      IsOrganizationAddress: true,
      OrganizationLogo: [],
      OrganizationId: '',
    },
    validationSchema: CompleteProfileSchema,
    onSubmit: handleSubmit,
  });

  const convertImageToBinary = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('No file provided.'));
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const binaryString = reader.result;
        const binaryArray = binaryString.split(',')[1]; // Get the binary data part

        resolve(binaryArray);
      };

      reader.onerror = () => {
        reject(new Error('Failed to read the file.'));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleStartDateFocus = () => {
    setStartDateInputType('date');
  };

  const handleStartDateBlur = () => {
    setStartDateInputType('text');
  };

  const handleStartDateChange = (e) => {
    const date = new Date(e.target.value);
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', { month: '2-digit' });
    const day = date.toLocaleString('default', { day: '2-digit' });
    const concatDate = year + '-' + month + '-' + day;
    setStartDate(concatDate);
    formik.setFieldValue('DateOfBirth', concatDate);
  };

  return (
    <form className="h-screen flex flex-col gap-2" onSubmit={formik.handleSubmit}>
      <CustomInput
        name={'MiddleName'}
        symbols={'*'}
        type={'text'}
        labelText={'Admin Middle Name'}
        placeholder={'Enter middle name'}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.MiddleName}
        inputError={formik.touched.MiddleName && formik.errors.MiddleName}
      />
      <DateInput
        labelText={'Date of Birth'}
        type={startDateInputType}
        name={'DateOfBirth'}
        placeholder={'Date of Birth'}
        value={formik.values.DateOfBirth}
        onBlur={handleStartDateBlur}
        onFocus={handleStartDateFocus}
        onInput={handleStartDateChange}
        inputError={formik.touched.DateOfBirth && formik.errors.DateOfBirth}
      />
      <CustomInput
        name={'PhoneNumber'}
        symbols={'*'}
        type={'text'}
        labelText={'Admin Phone Number'}
        placeholder={'Enter admin phone number'}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.PhoneNumber}
        inputError={formik.touched.PhoneNumber && formik.errors.PhoneNumber}
      />
      <CustomSelect
        optionText={'Select Gender'}
        symbols={'*'}
        options={genderOptions}
        labelText={'Admin Gender'}
        value={formik.values.Gender}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        name={'Gender'}
        errorText={formik.touched.Gender && formik.errors.Gender}
      />
      <CustomInput
        name={'Region'}
        symbols={'*'}
        type={'text'}
        labelText={'Region'}
        placeholder={'Enter Region'}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.Region}
        inputError={formik.touched.Region && formik.errors.Region}
      />
      <CustomInput
        name={'AddressLine'}
        symbols={'*'}
        type={'text'}
        labelText={'Organization address'}
        placeholder={'Enter organization Address'}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.AddressLine}
        inputError={formik.touched.AddressLine && formik.errors.AddressLine}
      />
      <CustomSelect
        optionText={'Select State'}
        symbols={'*'}
        labelText={'State of Residence'}
        options={stateOptions}
        value={formik.values.City}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        name={'City'}
        errorText={formik.touched.City && formik.errors.City}
      />
      <CustomSelect
        optionText={'Select Country'}
        symbols={'*'}
        options={countryOptions}
        labelText={'Country of Residence'}
        value={formik.values.Country}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        name={'Country'}
        errorText={formik.touched.Country && formik.errors.Country}
      />
      <CustomInput
        name={'IsOrganizationAddress'}
        symbols={'*'}
        type={'text'}
        labelText={'Is the above address the organization address?'}
        readOnly
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.IsOrganizationAddress}
        inputError={formik.touched.IsOrganizationAddress && formik.errors.OrganizationId}
      />
      <CustomInput
        name={'OrganizationId'}
        symbols={'*'}
        type={'text'}
        labelText={'Organization Id'}
        placeholder={'Enter organization Id'}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.OrganizationId}
        inputError={formik.touched.OrganizationId && formik.errors.OrganizationId}
      />
      {/* File upload for OrganizationLogo */}

      <FileUpload
        name={'OrganizationLogo'}
        onBlur={formik.handleBlur}
        labelText={'Upload organization Logo'}
        setFieldValue={formik.setFieldValue}
        errors={formik.touched.OrganizationLogo && formik.errors.OrganizationLogo}
        multiple={false}
      />
      {/* <FileUpload
        labelText="Upload Organization Logo"
        id="organizationLogo"
        name="OrganizationLogo"
        value={formik.values.OrganizationLogo}
        onBlur={formik.handleBlur}
        onChange={(e) => {
          formik.setFieldValue('OrganizationLogo', e.currentTarget.files[0]);
        }}
        inputError={formik.touched.OrganizationLogo && formik.errors.OrganizationLogo}
      /> */}
      {/* Submit button */}
      <Button
        value={isLoading ? <span className="loading loading-bars" /> : 'Complete Profile'}
        size={ButtonSize.lg}
        variant={ButtonState.PRIMARY}
        type={'submit'}
        className={'w-full mt-2'}
        disabled={!formik.isValid || !formik.dirty}
      />
    </form>
  );
};

export default CompleteProfile;
