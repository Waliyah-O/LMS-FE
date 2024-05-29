

export const getCohorts = () => {
  console.log('cohort list');
};
export const getPrograms = () => {
  console.log('cohort list');
};
export const getCourses = () => {
  console.log('cohort list');
};
export const getModules = () => {
  console.log('cohort list');
};
export const handleDisableAccount = (e) => {
  e.preventDefault();
  console.log('program created');
};

export const handleCreateCohort = async ({ e, values }) => {
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

export const handleCreateProgram = (e) => {
  e.preventDefault();
  console.log('program created');
};
export const handleActivateAccount = (e) => {
  e.preventDefault();
  console.log('account activated');
};
export const activateOrganizationAccount = (e) => {
  e.preventDefault();
  console.log('organization account activated');
};
export const activateStudentProfile = (e) => {
  e.preventDefault();
  console.log(' student account activated');
};
export const activateTutorProfile = (e) => {
  e.preventDefault();
  console.log('tutor account activated');
};
export const handleScheduleClass = (e) => {
  e.preventDefault();
  console.log('class scheduled');
};
export const handleResourceUpload = (e) => {
  e.preventDefault();
  console.log('resource uploaded');
};
