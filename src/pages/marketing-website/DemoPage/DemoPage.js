import { useState } from 'react';
import CustomRadioButton from '../../../components/customInputs/CustomRadioButton';
import CustomInput from '../../../components/customInputs/CustomInputs';
import Hero from '../../../components/heroSection/Hero';
import { useFormik } from 'formik';
import demoImg from '../../../assets/images/demo.png';
import CustomSelect from '../../../components/customInputs/CustomSelect';
import Button from '../../../components/button';
import { ButtonState } from '../../../components/button/enum';
import CustomCalendar from '../../../components/calendar/CustomCalendar';
import { DemoFormValidation } from '../../../validations/auth.validation';
import verifiedSvg from '../../../assets/svg/verified.svg';

const DemoPage = () => {
  const checkboxOptions = [
    { position: 1, label: 'A investor/shareholder' },
    { position: 2, label: 'A business or corporate body' },
  ];

  const discoveredBy = [
    { position: 1, label: 'LinkedIn' },
    { position: 2, label: 'Instagram' },
  ];

  const [showCalendar, setShowCalendar] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      customerType: '',
      email: '',
      organisation: '',
      discoveredBy: '',
      selectedDate: '',
    },
    validationSchema: DemoFormValidation(),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      setLoading(true);

      setTimeout(() => {
        setIsSubmitted(true);
      }, 2800);

      setTimeout(() => {
        setIsSubmitted(false);
        setShowCalendar(false);
        setLoading(false);
        console.log(values);
        resetForm();
      }, 6000);
    },
  });

  const handleNextClick = () => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        setShowCalendar(true);
      }
    });
  };

  const handleCancel = () => {
    setShowCalendar(false);
  };

  const today = new Date();

  return (
    <div>
      <Hero mainText={`Get in Touch\nConnect with Us Today`} sectionSize={'h-60'} />

      <section className="flex flex-col p-4 lg:flex-row justify-center gap-2 py-8 lg:py-16">
        <div className="w-full lg:w-5/12">
          <img src={demoImg} className="w-full" alt="Demo" />
        </div>

        <aside className="w-full lg:w-1/2 flex flex-col gap-6 my-6 lg:my-20 lg:pl-16">
          <h1 className="font-inter font-bold text-lg-heading text-gray-600 text-center lg:text-left">Request a Live Demo</h1>
          <p className="font-semibold text-gray-500 p-2 text-sm lg:w-3/4 md:p-0">{`We're here to help! Contact our experts for personalised guidance and support on your educational journey.`}</p>

          {!isSubmitted ? (
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 lg:w-11/12">
              {!showCalendar ? (
                <section className="flex flex-col gap-5">
                  <CustomInput
                    name={'fullName'}
                    labelText="Full Name"
                    symbols={'*'}
                    type={'text'}
                    placeholder={'Enter your full name'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                    inputError={formik.touched.fullName && formik.errors.fullName}
                  />

                  <CustomRadioButton
                    options={checkboxOptions}
                    name={'customerType'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    checked={formik.values.customerType}
                    // inputError={formik.touched.customerType && formik.errors.customerType}
                  />

                  <CustomInput
                    name={'email'}
                    labelText="Email address"
                    symbols={'*'}
                    type={'email'}
                    placeholder={'Enter your email'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    inputError={formik.touched.email && formik.errors.email}
                  />

                  <CustomInput
                    placeholder={'Enter Organisation name'}
                    labelText="Organisation (business or corporate body)"
                    type={'text'}
                    name={'organisation'}
                    value={formik.values.organisation}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    inputError={formik.touched.organisation && formik.errors.organisation}
                  />

                  <CustomSelect
                    labelText={'How did you learn about i-LMS?'}
                    symbols={'*'}
                    options={discoveredBy}
                    optionText={'Select an option'}
                    name={'discoveredBy'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.discoveredBy}
                    errorText={formik.touched.discoveredBy && formik.errors.discoveredBy}
                  />

                  <div className="flex flex-col-reverse lg:flex-row gap-5">
                    <Button value="Cancel" variant={ButtonState.LIST} onClick={handleCancel} />
                    <Button value="Next" variant={ButtonState.SECONDARY} onClick={handleNextClick} />
                  </div>
                </section>
              ) : (
                <section className="flex flex-col items-center lg:items-start">
                  <CustomCalendar onSelect={(date) => formik.setFieldValue('selectedDate', date)} />

                  <div className="flex items-center gap-4 mt-4 lg:mt-0">
                    <Button value="Cancel" variant={ButtonState.LIST} onClick={handleCancel} />
                    <button
                      className={`px-3 py-4 rounded-lg w-32 ${
                        formik.values.selectedDate &&
                        formik.values.selectedDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0)
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-300 text-slate-400'
                      } text-md font-semibold my-1`}
                      disabled={formik.isSubmitting || !formik.isValid || !formik.dirty || !formik.values.selectedDate}
                      type="submit"
                    >
                      {isLoading ? (
                        <>
                          <span className={`loading loading-bars`} />
                        </>
                      ) : (
                        'Book a Demo'
                      )}
                    </button>
                  </div>
                </section>
              )}
            </form>
          ) : (
            <div className="my-24 flex flex-col gap-3 items-center p-6 lg:m-auto lg:my-12">
              <img className="w-16" src={verifiedSvg} />
              <p className="text-l-headline text-center text-gray-500">
                You have booked for a <br /> demo successfully!
              </p>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
};

export default DemoPage;
