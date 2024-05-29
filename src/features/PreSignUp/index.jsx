import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { showToast } from '../../utils';
import { CreateAdminSchema } from '../../validations';
import { permissions } from './data';
import CustomInput from '../../components/customInputs/CustomInputs';
import TitleCard from '../../components/Cards/TitleCard';
import Button from '../../components/button';
import { ButtonSize, ButtonState } from '../../components/button/enum';
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import ToggleInput from '../../components/customInputs/ToggleInput';
import { useCreateOrganizationMutation } from '../../users/user-apiSlice';
import { useNavigate } from 'react-router-dom';

const PreSignUp = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [createOrganizationMutation, { isItLoading, isError }] = useCreateOrganizationMutation();

  const formik = useFormik({
    initialValues: {
      organizationName: '',
      displayName: '',
      organizationEmail: '',
      adminFirstName: '',
      adminLastName: '',
      adminEmail: '',
      // permissionsEnabled: new Array(permissions.length).fill(false),
    },
    validationSchema: CreateAdminSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const response = await createOrganizationMutation(values);
        console.log(response)
        navigate('/super-admin/dashboard/admin-management')
        // navigate('/signup/organization', { state: { formData: values, organizationId: response.data.data.organizationId } });
        showToast(
          <p>Admin created successfully</p>,
          'success'
        );
      } catch (error) {
        console.error('error message', error);
        const errorMessage = error ? error : 'An error occurred';
        showToast(errorMessage, 'error');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleToggleChange = (event, name) => {
    const updatedPermissionsEnabled = [...formik.values.permissionsEnabled];
    const index = permissions.findIndex((permission) => permission.subject === name);
    updatedPermissionsEnabled[index] = event.target.checked;
    formik.setFieldValue('permissionsEnabled', updatedPermissionsEnabled);
  };

  return (
    <>
      <div className="p-4 bg-gray-50">
        <div className="pb-4">
          <BreadCrumb initialPathName={'super-admin'} />
        </div>
        <TitleCard hasDivider title="Create Account" topMargin="mt-2">
          <div className="w-full">
            <form className="flex flex-col" onSubmit={formik.handleSubmit}>
              <section className="flex flex-col gap-6 items-center md:flex-row justify-between md:items-start">
                <div className="w-full flex flex-col gap-3 md:w-1/3">
                  <CustomInput
                    inputError={formik.touched.organizationName && formik.errors.organizationName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.organizationName}
                    type="text"
                    labelText="Organization Name"
                    symbols={'*'}
                    placeholder={'Enter organisation name'}
                    name="organizationName"
                  />

                  <CustomInput
                    inputError={formik.touched.displayName && formik.errors.displayName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.displayName}
                    type="text"
                    labelText="Display Name"
                    symbols={'*'}
                    placeholder={'Enter display name'}
                    name="displayName"
                  />

                  <CustomInput
                    inputError={formik.touched.organizationEmail && formik.errors.organizationEmail}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.organizationEmail}
                    type="text"
                    labelText="Organization Email"
                    symbols={'*'}
                    placeholder={'Enter organization email'}
                    name="organizationEmail"
                  />
                  <CustomInput
                    inputError={formik.touched.adminFirstName && formik.errors.adminFirstName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.adminFirstName}
                    type="text"
                    labelText="Admin Firstname"
                    symbols={'*'}
                    placeholder={'Enter admin firstname'}
                    name="adminFirstName"
                  />

                  <CustomInput
                    inputError={formik.touched.adminLastName && formik.errors.adminLastName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.adminLastName}
                    type="text"
                    labelText="Admin Lastname"
                    symbols={'*'}
                    placeholder={'Enter admin lastname'}
                    name="adminLastName"
                  />

                  <CustomInput
                    inputError={formik.touched.adminEmail && formik.errors.adminEmail}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.adminEmail}
                    type="adminEmail"
                    labelText="Admin Email Address"
                    symbols={'*'}
                    placeholder={'Enter admin email address'}
                    name="adminEmail"
                  />
                </div>

                <aside className="w-full md:w-3/5">
                  <div className="flex justify-between text-labels text-gray-500 bg-gray-50 font-semibold border-b-2 p-2 py-3">
                    <h3>PERMISSIONS</h3>
                    <h3>DISABLE / ENABLE</h3>
                  </div>
                  {/* <div className="flex flex-col h-1/2">
                    <ul className="p-2">
                      {permissions.map((permission, index) => (
                        <li key={index} className="flex items-start justify-between py-2 border-b">
                          <div>
                            <h2 className="text-base font-medium text-gray-800">{permission.subject}</h2>
                            <p className="text-labels">{permission.details}</p>
                          </div>
                          <div>
                            <ToggleInput
                              name={permission.subject}
                              onBlur={formik.handleBlur}
                              onChange={handleToggleChange}
                              checked={formik.values.permissionsEnabled[index]}
                              classNameEnabled="toggle [--tglbg:#D43325] bg-white hover:bg-gray-100 border-gray-50"
                              classNameDisabled="toggle [--tglbg:#E5E7EB] bg-white hover:bg-gray-50 border-gray-50"
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div> */}
                </aside>
              </section>
              <div className="divider px-2 mt-8"></div>
              <div className="flex items-center gap-3 p-2 md:justify-end">
                <Button
                  size={ButtonSize.sm}
                  variant={ButtonState.ALT_DARKOUTLINE}
                  value="Cancel"
                  type={'Button'}
                  className={'text-md-headline font-semibold'}
                />
                <Button
                  value={
                    isLoading ? (
                      <>
                        <span className={`loading loading-bars loading-xs`} />
                      </>
                    ) : (
                      'Create Account'
                    )
                  }
                  size={ButtonSize.md}
                  variant={ButtonState.ALT_RED}
                  type={'Button'}
                  onClick={() => formik.handleSubmit()}
                  className={'w-36 text-center'}
                  disabled={!formik.isValid || !formik.dirty}
                />
              </div>
            </form>
          </div>
        </TitleCard>
      </div>
    </>
  );
};

export default PreSignUp;
