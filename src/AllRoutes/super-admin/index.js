// All components mapping with path for internal routes

import { lazy } from 'react';
import LogoutButton from '../../features/LogoutButton';
import { _getTokenFromSession, getDecodedAccessToken } from '../../utils';

const Home = lazy(() => import('../../pages/protected/super-admin/Home'));
const Welcome = lazy(() => import('../../pages/protected/Welcome'));
const Page404 = lazy(() => import('../../pages/protected/404'));
const Blank = lazy(() => import('../../pages/protected/Blank'));
const Bills = lazy(() => import('../../pages/protected/Bills'));
const ProfileSettings = lazy(() => import('../../pages/protected/ProfileSettings'));
const GettingStarted = lazy(() => import('../../pages/GettingStarted'));
const Admin = lazy(() => import('../../pages/protected/admin-management/Admin'));
const AdminDetails = lazy(() => import('../../pages/protected/admin-management/AdminDetails'));
const Cohorts = lazy(() => import('../../pages/protected/cohort/Cohorts'));
const CohortDetails = lazy(() => import('../../features/CohortManagement/CohortDetails'));
const Programs = lazy(() => import('../../pages/protected/program/Program'));
const ProgramDetails = lazy(() => import('../../pages/protected/program/ProgramDetails'));
const PreSignUpPage = lazy(() => import('../../pages/protected/super-admin/PreSignup'));
const LiveClass = lazy(() => import('../../features/LiveClassesManagement'));
const Courses = lazy(() => import('../../features/CourseManagement'));
const CourseProfile = lazy(() => import('../../features/CourseManagement/CourseProfile'))
const Admissions = lazy(() => import('../../pages/protected/admissions/Admissions'));
const Verification = lazy(() => import('../../pages/protected/verification/Verification'));
const RolesAndPermissions = lazy(() => import('../../pages/protected/rolesandpermissions/RolesAndPermissions'));
const Assessment = lazy(() => import('../../pages/protected/assessment/Assessments'));

const token = _getTokenFromSession();
const decodedToken = token ? getDecodedAccessToken(token) : null;

const superAdminRoutes = [
  // {`super-admin/dashboard/${decodedToken.nameid}/*`}
  {
    path: `home`, // the url
    component: Home, // view rendered
  },
  {
    path: `welcome`, // the url
    component: Welcome, // view rendered
  },
  {
    path: `create-account`, // the url
    component: PreSignUpPage, // view rendered
  },
  {
    path: `admin-management`,
    component: Admin,
    nestedRoutes: [
      {
        path: ':id',
        component: AdminDetails,
      },
    ],
  },
  {
    path: `assessment-management`,
    component: Assessment,
  },
  {
    path: `cohort-management`,
    component: Cohorts,
    nestedRoutes: [
      {
        path: ':id',
        component: CohortDetails,
      },
    ],
  },
  {
    path: `program-management`,
    component: Programs,
    nestedRoutes: [
      {
        path: ':id',
        component: ProgramDetails,
      },
    ],
  },
  {
    path: `course-management`,
    component: Courses,
    nestedRoutes: [
      {
        path: ':id',
        component: CourseProfile,
      },
    ],
  },
  {
    path: `live-classes`,
    component: LiveClass,
  },
  {
    path: 'verification-management',
    component: Verification,
  },
  {
    path: 'admission-management',
    component: Admissions,
  },
  {
    path: 'roles-and-permissions',
    component: RolesAndPermissions,
  },
  {
    path: 'settings-profile',
    component: ProfileSettings,
  },
  {
    path: 'settings-billing',
    component: Bills,
  },
  {
    path: 'getting-started',
    component: GettingStarted,
  },
  {
    path: '404',
    component: Page404,
  },
  {
    path: 'blank',
    component: Blank,
  },
  {
    path: 'blank',
    component: LogoutButton,
  },
];

export default superAdminRoutes;
