// All components mapping with path for internal routes

import { lazy } from 'react';

const Home = lazy(() => import('../../pages/protected/admin/Home'));
const Welcome = lazy(() => import('../../pages/protected/Welcome'));
const Bills = lazy(() => import('../../pages/protected/Bills'));
const ProfileSettings = lazy(() => import('../../pages/protected/ProfileSettings'));
const GettingStarted = lazy(() => import('../../pages/GettingStarted'));
const UserAdmin = lazy(() => import('../../pages/protected/admin/UserAdmin'));
const Profile = lazy(() => import('../../pages/protected/Profile'));
const Cohorts = lazy(() => import('../../pages/protected/cohort/Cohorts'));
const Programs = lazy(() => import('../../pages/protected/program/Program'));
const Courses = lazy(() => import('../../pages/protected/courses/Courses'));
const LiveClass = lazy(() => import('../../pages/protected/LiveClass'));
const ProgramDetails = lazy(() => import('../../pages/protected/program/ProgramDetails'));
const CohortDetails = lazy(() => import('../../pages/protected/cohort/CohortDetails'));
const CourseProfile = lazy(() => import('../../pages/protected/courses/CourseProfile'));

const AdminRoutes = [
  {
    path: 'home', // the url
    component: Home, // view rendered
  },

  {
    path: 'welcome', // the url
    component: Welcome, // view rendered
  },

  {
    path: 'user-administration',
    component: UserAdmin,
    nestedRoutes: [
      {
        path: ':id',
        component: Profile,
      },
    ],
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
    path: 'course-management',
    component: Courses,
    nestedRoutes: [
      {
        path: ':id',
        component: CourseProfile,
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
    path: 'live-classes-management',
    component: LiveClass,
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
];

export default AdminRoutes;
