import { useFormik } from 'formik';
import { useState } from 'react';
import Hero from '../../../components/heroSection/Hero';
import TextArea from '../../../components/customInputs/TextArea';
import CustomInput from '../../../components/customInputs/CustomInputs';
import { ContactUsForm } from '../../../validations/auth.validation';
import SpotlightProduct from '../../../components/spotlightProduct/SpotlightProduct';
import { showToast } from '../../../utils';

const ContactPage = () => {
  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNum: '',
      message: '',
    },
    validationSchema: ContactUsForm,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);

      setTimeout(() => {
        showToast(
          <>
            Message Sent <br />
          </>,
          'success'
        );

        setLoading(false);
        console.log(values);
        resetForm();
      }, 2000);
    },
  });

  return (
    <div>
      <Hero mainText={`Get in Touch\nConnect with Us Today`} />
      <section className="flex items-center justify-center h-2/5 bg-white">
        <form
          className="p-8 bg-white w-full md:relative bottom-44 rounded-xl drop-shadow-2xl lg:w-2/3"
          onSubmit={formik.handleSubmit}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <CustomInput
              name={'firstName'}
              labelText={'First name'}
              placeholder={'Enter your first name'}
              required={true}
              type={'text'}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              inputError={formik.touched.firstName && formik.errors.firstName}
            />

            <CustomInput
              name={'lastName'}
              labelText={'Last name'}
              placeholder={'Enter your last name'}
              required={true}
              type={'text'}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              inputError={formik.touched.lastName && formik.errors.lastName}
            />

            <CustomInput
              name={'email'}
              labelText={'Email'}
              placeholder={'example@mail.com'}
              required={true}
              type={'email'}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              inputError={formik.touched.email && formik.errors.email}
            />

            <CustomInput
              name={'phoneNum'}
              labelText={'Phone number'}
              placeholder={'234 xxx xxx xxxx'}
              required={true}
              type={'number'}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phoneNum}
              inputError={formik.touched.phoneNum && formik.errors.phoneNum}
            />
          </div>

          <TextArea
            name={'message'}
            onBlur={formik.handleBlur}
            required={true}
            onChange={formik.handleChange}
            value={formik.values.message}
            labelText={'Your Message'}
            placeholder={'Enter your message'}
            className={'h-36'}
            inputError={formik.touched.message && formik.errors.message}
          />

          <button
            className={`btn bg-red-600 min-w-fit xl:btn-md w-32 capitalize mt-6 text-white`}
            disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
            type="submit"
          >
            {isLoading ? (
              <>
                <span className={`loading loading-bars`} />
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </section>

      <SpotlightProduct />
    </div>
  );
};

export default ContactPage;
