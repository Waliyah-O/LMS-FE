import SignIn from '../pages/signIn';
// import SignUp from '../pages/signUp';
import CompleteProfile from '../components/Forms/Admin/CompleteProfile';
import { Routes, Route } from 'react-router-dom';
import ForgotPassword from '../pages/ForgotPassword';
import PasswordReset from '../pages/PasswordReset';
import LandingPage from '../pages/marketing-website/LandingPage/LandingPage';
import WhyPage from '../pages/marketing-website/WhyPage/WhyPage';
import Navigation from '../components/layouts/Navigation';
import OrganizationBenefits from '../pages/marketing-website/OrganizationBenefits/OrganizationBenefits';
import AuthLayout from '../components/layouts/AuthLayout';
import GettingStarted from '../components/Forms/Admin/GettingStarted';
import TutorSignUp from '../pages/TutorSignUp';
import StudentSignUp from '../pages/StudentSignUp';
import FAQpage from '../pages/marketing-website/FAQs/FAQpage';
import ContactPage from '../pages/marketing-website/ContactUs/ContactPage.js';
import VerifyEmailPage from '../pages/verifyEmail.js';
import DemoPage from '../pages/marketing-website/DemoPage/DemoPage.js';
import SignUp from '../pages/signUp.js';
import Dashboard from '../pages/index';
import { themeChange } from 'theme-change';
import { useEffect } from 'react';
import superAdminRoutes from './super-admin/index.js';
import AdminRoutes from './admin/index.js';
import TutorRoutes from './tutor/index.js';
import StudentRoutes from './student/index.js';
import SuperAdminLayout from '../containers/super-admin/SuperAdminLayout.js';
import AdminLayout from '../containers/AdminLayout.js';
import TutorLayout from '../containers/TutorLayout.js';
import StudentLayout from '../containers/StudentLayout.js';
import PrivateRoutes from './PrivateRoutes.js';
import NotFoundPage from '../pages/PageNotFound.js';
import { _getTokenFromSession, getDecodedAccessToken, isAuth } from '../utils/index.js';
import { useSelector } from 'react-redux';
function AllRoutes() {
  useEffect(() => {
    themeChange(false);
  }, []);
  // const decodedToken = getDecodedAccessToken(_getTokenFromSession());
  // console.log('AllRoutes component', decodedToken);
  // const isAuthenticated = isAuth();
  // console.log(isAuthenticated);
  // // localStorage.setItem('nameId', )
  // console.log(' organizationId from AllRoutes:', localStorage.getItem('organizationId'));
  // const user = useSelector((state) => state.user);
  // console.log('AllRoutes user', user);
  const decodedToken = getDecodedAccessToken(_getTokenFromSession());
  const isAuthenticated = isAuth();
  const user = useSelector((state) => state.user);
  const roles = decodedToken && decodedToken.role ? decodedToken.role : null;
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<LandingPage />} />
        <Route path="why" element={<WhyPage />} />
        <Route path="benefits" element={<OrganizationBenefits />} />
        <Route path="faq" element={<FAQpage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="demo" element={<DemoPage />} />
      </Route>
      <Route path="signup" element={<AuthLayout />}>
        <Route index element={<SignUp />} />
        <Route path="organization" element={<GettingStarted />} />
        <Route path="completeprofile" element={<CompleteProfile />} />
        <Route path="tutor" element={<TutorSignUp />} />
        <Route path="student" element={<StudentSignUp />} />
      </Route>
      <Route path="verify" element={<VerifyEmailPage />} />
      <Route path="signin" element={<AuthLayout />}>
        <Route index element={<SignIn />} />
        <Route path="organization" element={<SignIn />} />
        <Route path="tutor" element={<SignIn />} />
        <Route path="student" element={<SignIn />} />
      </Route>
      {/* <Protected> */}
      <Route element={<PrivateRoutes />}>
        <Route path="super-admin/dashboard/*" element={<SuperAdminLayout />}>
          {superAdminRoutes.map((route, key) => (
            <Route key={key} path={route.path} element={<route.component />} />
          ))}
          {superAdminRoutes
            .filter((route) => route.nestedRoutes)
            .map((route, index) =>
              route.nestedRoutes.map((nestedRoute, nestedIndex) => (
                <Route key={index + nestedIndex} path={`${route.path}/${nestedRoute.path}`} element={<nestedRoute.component />} />
              ))
            )}
        </Route>

        <Route path="admin/dashboard/*" element={<AdminLayout />}>
          {AdminRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />} />
          ))}
          {AdminRoutes.filter((route) => route.nestedRoutes).map((route, index) =>
            route.nestedRoutes.map((nestedRoute, nestedIndex) => (
              <Route key={index + nestedIndex} path={`${route.path}/${nestedRoute.path}`} element={<nestedRoute.component />} />
            ))
          )}
        </Route>

        <Route path="tutor/dashboard/*" element={<TutorLayout />}>
          {TutorRoutes.map((route, key) => (
            <Route key={key} path={route.path} element={<route.component />} />
          ))}
          {TutorRoutes.filter((route) => route.nestedRoutes).map((route, index) =>
            route.nestedRoutes.map((nestedRoute, nestedIndex) => (
              <Route key={index + nestedIndex} path={`${route.path}/${nestedRoute.path}`} element={<nestedRoute.component />} />
            ))
          )}
        </Route>

        <Route path="student/dashboard/*" element={<StudentLayout />}>
          {StudentRoutes.map((route, key) => (
            <Route key={key} path={route.path} element={<route.component />} />
          ))}
          {StudentRoutes.filter((route) => route.nestedRoutes).map((route, index) =>
            route.nestedRoutes.map((nestedRoute, nestedIndex) => (
              <Route key={index + nestedIndex} path={`${route.path}/${nestedRoute.path}`} element={<nestedRoute.component />} />
            ))
          )}
        </Route>
      </Route>

      <Route path="/forget-password" element={<ForgotPassword />} />
      <Route path="/reset-password/*" element={<PasswordReset />} />
      {/* </Protected> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
export default AllRoutes;
