// All components mapping with path for internal routes

import { lazy } from 'react';

const Home = lazy(() => import('../../pages/protected/super-admin/Home'));
const Welcome = lazy(() => import('../../pages/protected/Welcome'));
const Page404 = lazy(() => import('../../pages/protected/404'));
const Blank = lazy(() => import('../../pages/protected/Blank'));
const Bills = lazy(() => import('../../pages/protected/Bills'));
const ProfileSettings = lazy(() => import('../../pages/protected/ProfileSettings'));
const GettingStarted = lazy(() => import('../../pages/GettingStarted'));
const Cohorts = lazy(() => import('../../pages/protected/cohort/Cohorts'));
const Programs = lazy(() => import('../../pages/protected/program/Program'));
const PreSignUpPage = lazy(() => import('../../pages/protected/super-admin/PreSignup'));
const ProgramDetails = lazy(() => import('../../pages/protected/program/ProgramDetails'));
const CohortDetails = lazy(() => import('../../pages/protected/cohort/CohortDetails'));

const TutorRoutes = [
  {
    path: 'home', // the url
    component: Home, // view rendered
  },
  {
    path: 'welcome', // the url
    component: Welcome, // view rendered
  },
  {
    path: 'pre-signup', // the url
    component: PreSignUpPage, // view rendered
  },
  {
    path: 'assessment-management',
    component: Cohorts,
  },
  {
    path: 'cohort-management',
    component: Cohorts,
    nestedRoutes: [
      {
        path: ':id',
        component: CohortDetails,
      },
    ],
  },
  {
    path: 'program-management',
    component: Programs,
    nestedRoutes: [
      {
        path: ':id',
        component: ProgramDetails,
      },
    ],
  },
  {
    path: 'course-management',
    component: Cohorts,
  },
  {
    path: 'live-classes',
    component: Cohorts,
  },
  {
    path: 'verification-management',
    component: Cohorts,
  },
  {
    path: 'admission-management',
    component: Cohorts,
  },
  {
    path: 'roles-and-permissions',
    component: Cohorts,
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
];

export default TutorRoutes;
