import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import CustomInput from '../../customInputs/CustomInputs';
import TextArea from '../../customInputs/TextArea';
import { BsCalendar2Fill } from 'react-icons/bs';
import { format } from 'date-fns';
import DateInput from '../../customInputs/DateInput';
import CustomSelect from '../../customInputs/CustomSelect';
import FileUpload from '../../fileUpload';
import { showToast } from '../../../utils';
import Button from '../../button';
import { ButtonSize, ButtonState } from '../../button/enum';
import TimeInput from '../../customInputs/TimeInput';
import { useCreateCohortMutation } from '../../../features/CohortManagement/cohortApi';
import {
  creatingCohortSchema,
  creatingCourseSchema,
  creatingProgramSchema,
  disablingAccountSchema,
  schedulingClassSchema,
  uploadingResourcesSchema,
} from '../../../validations/auth.validation';
import CustomRadioButton from '../../customInputs/CustomRadioButton';
import {
  getCohorts,
  getPrograms,
  getCourses,
  getModules,
  handleDisableAccount,
  handleCreateCohort,
  handleCreateProgram,
  handleActivateAccount,
  handleScheduleClass,
  handleResourceUpload,
} from './Functions';
const DrawerForms = ({
  isDisablingAccount,
  isCreatingCohort,
  isActivatingAccount,
  isCreatingProgram,
  isUploadingResources,
  isCreatingCourse,
  isSchedulingClass,
  onSubmit,
  viewComments,
  onClick,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [startDateInputType, setStartDateInputType] = useState('text');
  const [endDateInputType, setEndDateInputType] = useState('text');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timeInputType, setTimeInputType] = useState('text');
  const [startTime, setStartTime] = useState('');

  // const {createCohort, [isLoading, isError]} = useCreateCohortMutation()

  const [createCohort, { isLoading: isError }] = useCreateCohortMutation();
  const handleCreateCohort = async ({ e, values }) => {
    e.preventDefault();
    try {
      console.log(values);
      const response = await createCohort(values).unwrap();
      console.log(response);
    } catch (error) {
      console.error('create cohort error:', error);
    }
    // console.log('cohort created');
  };

  const handleStartDateFocus = () => {
    setStartDateInputType('date');
  };

  const handleEndDateFocus = () => {
    setEndDateInputType('date');
  };

  const handleStartDateBlur = () => {
    setStartDateInputType('text');
  };

  const handleEndDateBlur = () => {
    setEndDateInputType('text');
  };

  const handleStartDateChange = (e) => {
    setStartDate(new Date(e.target.value));
  };

  const handleEndDateChange = (e) => {
    setEndDate(new Date(e.target.value));
  };

  const handleStartTimeFocus = () => {
    setTimeInputType('time');
  };

  const handleStartTimeBlur = () => {
    setTimeInputType('text');
  };

  const handleTimeChange = (e) => {
    setStartTime(new Date(`1970-01-01T${e.target.value}:00`));
  };

  const cohortOptions = [
    { position: 1, label: 'Cohort A' },
    { position: 2, label: 'Cohort B' },
  ];

  const tutorOptions = [
    { position: 1, label: 'Tutor A' },
    { position: 2, label: 'Tutor B' },
  ];

  const classFrequencyOptions = [
    { position: 1, label: 'One-off' },
    { position: 2, label: 'Recurring' },
  ];

  const classRecurrenceOptions = [
    { position: 1, label: 'Weekday Classes (Mon - Fri)' },
    { position: 2, label: 'Weekend Classes (Sat & Sun)' },
    { position: 3, label: 'Weekly Classes' },
  ];

  const formikDisablingAccount = useFormik({
    initialValues: {
      reason: '',
    },
    validationSchema: disablingAccountSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const formikUploadingResources = useFormik({
    initialValues: {
      title: '',
      details: '',
      files: [],
    },
    validationSchema: uploadingResourcesSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const formikCreateProgram = useFormik({
    initialValues: {
      title: '',
      description: '',
      cohort: '',
      startDate: '',
      endDate: '',
      files: [],
    },
    validationSchema: creatingProgramSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const formikCreateCohort = useFormik({
    initialValues: {
      cohortName: '',
      description: '',
      organizationId: '',
      status: '',
      startDate: '',
      endDate: '',
    },
    validationSchema: creatingCohortSchema,
    onSubmit: handleCreateCohort,
  });

  const formikCreateCourse = useFormik({
    initialValues: {
      title: '',
      description: '',
      tutor: '',
    },
    validationSchema: creatingCourseSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const formikScheduleClass = useFormik({
    initialValues: {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      startTime: '',
      classFrequency: '',
      classOccurence: '',
    },
    validationSchema: schedulingClassSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // const formik = useFormik({
  //   initialValues: {
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     phoneNum: '',
  //     message: '',
  //   },
  //   // validationSchema: {},
  //   onSubmit: async (values, { resetForm }) => {
  //     setLoading(true);
  //     setTimeout(() => {
  //       showToast(
  //         <>
  //           Message Sent <br />
  //         </>,
  //         'success',
  //         {
  //           position: 'top-right',
  //           autoClose: 3000,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           style: {
  //             backgroundColor: 'rgba(0, 100%, 0, 0)',
  //             color: '#148519',
  //             fontWeight: 'bold',
  //           },
  //         }
  //       );
  //       setLoading(false);
  //       console.log(values);
  //       resetForm();
  //     }, 2000);
  //   },
  // });

  /**********CONSTANTS *******/

  const statusOptions = [
    { position: 1, label: 'InReview' },
    { position: 2, label: 'InProgress' },
    { position: 3, label: 'Completed' },
  ];

  return (
    <>
      <div>
        {isDisablingAccount && (
          <>
            <form onSubmit={formikDisablingAccount.handleSubmit} className="h-[38rem] flex flex-col justify-between">
              <div className="flex flex-col gap-8">
                <h1 className="font-bold text-gray-500">Disable Account</h1>
                <TextArea
                  labelText="Reasons for Account Deactivation"
                  name="reason"
                  value={formikDisablingAccount.values.reason}
                  onChange={formikDisablingAccount.handleChange}
                  onBlur={formikDisablingAccount.handleBlur}
                  inputError={formikDisablingAccount.touched.reason && formikDisablingAccount.errors.reason}
                  className="h-72"
                />
              </div>
              <Button type={'submit'} variant={ButtonState.ALT_SECONDARY} size={ButtonSize.xs} value="Disable Account" />
            </form>
          </>
        )}

        {isActivatingAccount && (
          <>
            <div className="h-[38rem] flex flex-col justify-between">
              <div className="flex flex-col gap-8">
                <h1 className="font-bold text-gray-500">View Comments</h1>
                <TextArea
                  readOnly
                  value={
                    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae unde, quia ex nihil nemo quasi laborum sint similique, corrupti ipsam praesentium, ipsum reprehenderit? Culpa cum suscipit harum voluptate aliquam. Nisi'
                  }
                  labelText="Reasons for Account Deactivation"
                  className="h-72"
                />
              </div>
              <Button
                variant={ButtonState.ALT_SUCCESS}
                size={ButtonSize.xs}
                value={isLoading ? 'Activating...' : 'Activate Account'}
              />
            </div>
          </>
        )}

        {isCreatingProgram && (
          <>
            <form onSubmit={formikCreateProgram.handleSubmit} className="flex flex-col gap-4">
              <h1 className="font-bold text-gray-500">Create a Program</h1>
              <CustomInput
                name={'title'}
                labelText={'Program Title'}
                placeholder="Enter program title"
                value={formikCreateProgram.values.title}
                onBlur={formikCreateProgram.handleBlur}
                onChange={formikCreateProgram.handleChange}
                inputError={formikCreateProgram.touched.title && formikCreateProgram.errors.title}
              />

              <TextArea
                name={'description'}
                placeholder={'Write text here...'}
                labelText={'Program Description & Goals'}
                className={'h-40 textarea-sm'}
                value={formikCreateProgram.values.description}
                onBlur={formikCreateProgram.handleBlur}
                onChange={formikCreateProgram.handleChange}
                inputError={formikCreateProgram.touched.description && formikCreateProgram.errors.description}
              />

              <CustomSelect
                name={'cohort'}
                labelText={'Cohort'}
                optionText={'Select Cohort'}
                options={cohortOptions}
                onBlur={formikCreateProgram.handleBlur}
                onChange={formikCreateProgram.handleChange}
                value={formikCreateProgram.values.cohort}
                errorText={formikCreateProgram.touched.cohort && formikCreateProgram.errors.cohort}
              />

              <DateInput
                type={startDateInputType}
                name={'startDate'}
                placeholder={'Start Date'}
                value={formikCreateProgram.values.startDate}
                onBlur={handleStartDateBlur}
                onFocus={handleStartDateFocus}
                onInput={handleStartDateChange}
                onChange={formikCreateProgram.handleChange}
                inputError={formikCreateProgram.touched.startDate && formikCreateProgram.errors.startDate}
              />

              <DateInput
                type={endDateInputType}
                name={'endDate'}
                placeholder={'End Date'}
                value={formikCreateProgram.values.endDate}
                onBlur={handleEndDateBlur}
                onFocus={handleEndDateFocus}
                onInput={handleEndDateChange}
                onChange={formikCreateProgram.handleChange}
                inputError={formikCreateProgram.touched.endDate && formikCreateProgram.errors.endDate}
              />

              <FileUpload
                name={'files'}
                onBlur={formikCreateProgram.handleBlur}
                labelText={'Program Image'}
                setFieldValue={formikCreateProgram.setFieldValue}
                errors={formikCreateProgram.touched.files && formikCreateProgram.errors.files}
              />
              <div className="flex items-center justify-between">
                <Button
                  type={'button'}
                  variant={ButtonState.ALT_DARKOUTLINE}
                  size={ButtonSize.xs}
                  className="w-[48%]"
                  value={isLoading ? 'Cancelling...' : 'Cancel'}
                />
                <Button
                  type={'submit'}
                  variant={ButtonState.ALT_DARK}
                  size={ButtonSize.xs}
                  className="w-[48%]"
                  value={isLoading ? 'Creating...' : 'Create Program'}
                  onClick={handleCreateProgram}
                />
              </div>
            </form>
          </>
        )}

        {isCreatingCohort && (
          <>
            <form onSubmit={formikCreateCohort.handleCreateCohort} className="flex flex-col gap-6">
              <h1 className="font-bold text-gray-500">Create a Cohort</h1>
              <CustomInput
                name={'title'}
                onBlur={formikCreateCohort.handleBlur}
                onChange={formikCreateCohort.handleChange}
                value={formikCreateCohort.values.title}
                labelText={'Cohort Name'}
                placeholder="Enter cohort name"
                inputError={formikCreateCohort.touched.title && formikCreateCohort.errors.title}
              />

              <TextArea
                name={'description'}
                placeholder={'Write text here...'}
                labelText={'Description'}
                className={'h-40 textarea-sm'}
                value={formikCreateCohort.values.description}
                onBlur={formikCreateCohort.handleBlur}
                onChange={formikCreateCohort.handleChange}
                inputError={formikCreateCohort.touched.description && formikCreateCohort.errors.description}
              />

              <CustomInput
                name={'organizationId'}
                onBlur={formikCreateCohort.handleBlur}
                onChange={formikCreateCohort.handleChange}
                value={formikCreateCohort.values.organizationId}
                labelText={'Organization Id'}
                placeholder="Enter organization Id"
                inputError={formikCreateCohort.touched.organizationId && formikCreateCohort.errors.organizationId}
              />

              <CustomSelect
                optionText={'Select Status'}
                symbols={'*'}
                labelText={'Status'}
                options={statusOptions}
                value={formikCreateCohort.values.status}
                onBlur={formikCreateCohort.handleBlur}
                onChange={formikCreateCohort.handleChange}
                name={'status'}
                errorText={formikCreateCohort.touched.status && formikCreateCohort.errors.status}
              />

              <DateInput
                type={startDateInputType}
                name={'startDate'}
                placeholder={'Start Date'}
                value={formikCreateCohort.values.startDate}
                onBlur={handleStartDateBlur}
                onFocus={handleStartDateFocus}
                onChange={formikCreateCohort.handleChange}
                onInput={handleStartDateChange}
                inputError={formikCreateCohort.touched.startDate && formikCreateCohort.errors.startDate}
              />

              <DateInput
                type={endDateInputType}
                name={'endDate'}
                placeholder={'End Date'}
                value={formikCreateCohort.values.endDate}
                onBlur={handleEndDateBlur}
                onFocus={handleEndDateFocus}
                onInput={handleEndDateChange}
                onChange={formikCreateCohort.handleChange}
                inputError={formikCreateCohort.touched.endDate && formikCreateCohort.errors.endDate}
              />
              <div className="flex items-center justify-between">
                <Button
                  type={'button'}
                  variant={ButtonState.ALT_DARKOUTLINE}
                  size={ButtonSize.xs}
                  className="w-[48%]"
                  value="Cancel"
                />
                <Button
                  type={'submit'}
                  variant={ButtonState.ALT_DARK}
                  size={ButtonSize.xs}
                  className="w-[48%]"
                  value={isLoading ? 'Creating...' : 'Create Cohort'}
                  onClick={formikCreateCohort.onSubmit}
                />
              </div>
            </form>
          </>
        )}

        {isUploadingResources && (
          <>
            <form onSubmit={formikUploadingResources.handleSubmit} className="flex flex-col gap-3.5">
              <h1 className="font-bold text-gray-500">Resource Upload</h1>
              <CustomInput
                name={'title'}
                value={formikUploadingResources.values.title}
                onBlur={formikUploadingResources.handleBlur}
                onChange={formikUploadingResources.handleChange}
                inputError={formikUploadingResources.touched.title && formikUploadingResources.errors.title}
                labelText={'Resource Title'}
                placeholder="Enter resource title"
              />

              <TextArea
                name={'details'}
                value={formikUploadingResources.values.details}
                onBlur={formikUploadingResources.handleBlur}
                onChange={formikUploadingResources.handleChange}
                inputError={formikUploadingResources.touched.details && formikUploadingResources.errors.details}
                placeholder={'Write text here...'}
                labelText={'Resource Details'}
                className={'h-40 textarea-sm'}
              />

              <FileUpload
                name={'files'}
                onBlur={formikUploadingResources.handleBlur}
                labelText={'Upload Resources'}
                setFieldValue={formikUploadingResources.setFieldValue}
                errors={formikUploadingResources.touched.files && formikUploadingResources.errors.files}
              />

              <div className="flex items-center justify-between">
                <Button
                  type={'button'}
                  variant={ButtonState.ALT_DARKOUTLINE}
                  size={ButtonSize.xs}
                  className="w-[48%]"
                  value="Cancel"
                />
                <Button
                  type={'submit'}
                  variant={ButtonState.ALT_DARK}
                  size={ButtonSize.xs}
                  className="w-[48%]"
                  value={isLoading ? 'Uploading...' : 'Upload Resource'}
                />
              </div>
            </form>
          </>
        )}

        {isCreatingCourse && (
          <>
            <form onSubmit={formikCreateCourse.handleSubmit} className="flex flex-col gap-6">
              <h1 className="font-bold text-gray-500">Add Course</h1>
              <CustomInput
                name={'title'}
                onBlur={formikCreateCourse.handleBlur}
                onChange={formikCreateCourse.handleChange}
                value={formikCreateCourse.values.title}
                labelText={'Course Title'}
                placeholder="Enter course title"
                inputError={formikCreateCourse.touched.title && formikCreateCourse.errors.title}
              />

              <TextArea
                name={'description'}
                onBlur={formikCreateCourse.handleBlur}
                onChange={formikCreateCourse.handleChange}
                value={formikCreateCourse.values.description}
                placeholder={'Write text here...'}
                labelText={'Course Description & Goals'}
                className={'h-40 textarea-sm'}
                inputError={formikCreateCourse.touched.description && formikCreateCourse.errors.description}
              />

              <CustomSelect
                name={'tutor'}
                labelText={'Tutor'}
                optionText={'Select Tutor'}
                options={tutorOptions}
                onBlur={formikCreateCourse.handleBlur}
                onChange={formikCreateCourse.handleChange}
                value={formikCreateCourse.values.tutor}
                errorText={formikCreateCourse.touched.tutor && formikCreateCourse.errors.tutor}
              />

              <div className="flex items-center justify-between">
                <Button
                  type={'button'}
                  variant={ButtonState.ALT_DARKOUTLINE}
                  size={ButtonSize.xs}
                  className="w-[48%]"
                  value="Cancel"
                />
                <Button
                  type={'submit'}
                  variant={ButtonState.ALT_DARK}
                  size={ButtonSize.xs}
                  className="w-[48%]"
                  value="Add Course"
                />
              </div>
            </form>
          </>
        )}

        {isSchedulingClass && (
          <>
            <form onSubmit={formikScheduleClass.handleSubmit} className="flex flex-col gap-6">
              <h1 className="font-bold text-gray-500">Schedule a Class</h1>

              <CustomInput
                name={'title'}
                onBlur={formikScheduleClass.handleBlur}
                onChange={formikScheduleClass.handleChange}
                value={formikScheduleClass.values.title}
                labelText={'Class Title'}
                placeholder="Enter class title"
                inputError={formikScheduleClass.touched.title && formikScheduleClass.errors.title}
              />

              <CustomSelect
                name={'classFrequency'}
                labelText={'Class Frequency'}
                optionText={'Select class frequency'}
                options={classFrequencyOptions}
                onBlur={formikScheduleClass.handleBlur}
                onChange={formikScheduleClass.handleChange}
                value={formikScheduleClass.values.classFrequency}
                errorText={formikScheduleClass.touched.classFrequency && formikScheduleClass.errors.classFrequency}
              />

              {formikScheduleClass.values.classFrequency === 'Recurring' && (
                <CustomSelect
                  name={'classOccurence'}
                  labelText={'Class Schedule'}
                  optionText={'Select class schedule'}
                  options={classRecurrenceOptions}
                  onBlur={formikScheduleClass.handleBlur}
                  onChange={formikScheduleClass.handleChange}
                  value={formikScheduleClass.values.classOccurence}
                  errorText={formikScheduleClass.touched.classOccurence && formikScheduleClass.errors.classOccurence}
                />
              )}

              <TextArea
                name={'description'}
                onBlur={formikScheduleClass.handleBlur}
                onChange={formikScheduleClass.handleChange}
                value={formikScheduleClass.values.description}
                placeholder={'Write text here...'}
                labelText={'Class Details'}
                className={'h-40 textarea-sm'}
                inputError={formikScheduleClass.touched.description && formikScheduleClass.errors.description}
              />

              <DateInput
                type={startDateInputType}
                name={'startDate'}
                placeholder={'Start Date'}
                value={formikScheduleClass.values.startDate}
                onBlur={handleStartDateBlur}
                onFocus={handleStartDateFocus}
                onChange={formikScheduleClass.handleChange}
                onInput={handleStartDateChange}
                inputError={formikScheduleClass.touched.startDate && formikScheduleClass.errors.startDate}
              />

              {formikScheduleClass.values.classFrequency === 'Recurring' && (
                <DateInput
                  type={endDateInputType}
                  name={'endDate'}
                  placeholder={'End Date'}
                  value={formikScheduleClass.values.endDate}
                  onBlur={handleEndDateBlur}
                  onFocus={handleEndDateFocus}
                  onChange={formikScheduleClass.handleChange}
                  onInput={handleEndDateChange}
                  inputError={formikScheduleClass.touched.endDate && formikScheduleClass.errors.endDate}
                />
              )}

              <TimeInput
                name={'startTime'}
                placeholder="Time"
                value={formikScheduleClass.values.startTime}
                type={timeInputType}
                onBlur={handleStartTimeBlur}
                onFocus={handleStartTimeFocus}
                onInput={handleTimeChange}
                onChange={formikScheduleClass.handleChange}
                inputError={formikScheduleClass.touched.startTime && formikScheduleClass.errors.startTime}
              />

              <div className="flex items-center justify-between">
                <Button variant={ButtonState.ALT_DARKOUTLINE} size={ButtonSize.xs} className="w-[48%]" value="Cancel" />
                <Button
                  variant={ButtonState.ALT_DARK}
                  size={ButtonSize.xs}
                  className="w-[48%]"
                  value={isLoading ? 'Scheduling...' : 'Schedule Class'}
                />
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default DrawerForms;
