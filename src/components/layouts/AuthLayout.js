/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ErrorUI } from '../error/ErrorUi';
import { ReactComponent as ArrowNarrowLeft } from '../../assets/svg/arrow_narrow_left.svg';
import authImg from '../../assets/images/authImg.png';
import Navbar from '../navbar/Navbar';

const AuthLayout = ({ children }) => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('');
  const navigate = useNavigate();

  const getRouteTitle = () => {
    const path = location.pathname.toLowerCase();

    if (path.includes('organization')) {
      return 'Organization';
    } else if (path.includes('tutor')) {
      return 'Tutor';
    } else if (path.includes('student')) {
      return 'Student';
    } else if (path === '/signin') {
      return 'Sign-in Page';
    } else if (path === '/signup') {
      return 'Sign-up Page';
    }

    // Default title if none of the keywords are present
    return 'I-Academy';
  };

  useEffect(() => {
    setPageTitle(getRouteTitle());
  }, [location.pathname]);

  const headerTitle =
    (location.pathname.includes('forget-password') && 'Forgot Password') ||
    (location.pathname.includes('reset-password') && 'Reset Password') ||
    (location.pathname.includes('completeprofile') && 'Complete Registration');

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Navbar />
      <div className="w-full flex justify-evenly gap-24 bg-white md:p-5 lg:p-16">
        <ErrorBoundary FallbackComponent={ErrorUI}>
          <div className="relative [background-color:rgba(83,85,90,0.35)] [width:524px] [height:460px] rounded-3xl hidden lg:block">
            <h3 className="font-extrabold text-white font-sora [font-size:32px] absolute top-20 right-6 ">{pageTitle}</h3>
            <img className="[width:369px] [height:507px] absolute bottom-0 left-0" src={authImg} />
          </div>

          <div className="w-full lg:w-1/2 p-4 sm:p-2">
            <div className="flex flex-col items-start gap-4">
              {location.pathname === '/signup' ? (
                <Link className="flex gap-2 items-center" to="/">
                  <ArrowNarrowLeft />
                  <span className="text-black font-medium text-sm">Go Home</span>
                </Link>
              ) : (
                <Link className="flex gap-2 items-center" onClick={handleGoBack}>
                  <ArrowNarrowLeft />
                  <span className="text-black font-medium text-sm">Go Back</span>
                </Link>
              )}

              {location.pathname !== '/signup/completeprofile' &&
              location.pathname !== '/forget-password' &&
              location.pathname !== '/reset-password' ? (
                <div>
                  <nav className="flex gap-4">
                    <NavLink
                      to="/signup"
                      onClick={() => {}}
                      className={({ isActive }) =>
                        isActive ? 'text-red-650 border-b-2 border-red-650 py-2 text-sm' : 'text-sm py-2'
                      }
                    >
                      New? Create an Account
                    </NavLink>

                    <NavLink
                      to="/signin"
                      onClick={() => {}}
                      className={({ isActive }) =>
                        isActive ? 'text-red-650 border-b-2 border-red-650 py-2 text-sm' : 'text-sm py-2'
                      }
                    >
                      Have an account? Sign in
                    </NavLink>
                  </nav>

                  <div className="flex flex-col gap-4 items-start">
                    <h1 className="text-2xl font-semibold text-gray-900 pt-2">
                      {location.pathname.includes('signup') ? 'Create Account as...' : 'Sign in...'}
                    </h1>

                    {location.pathname.includes('/signin') ? (
                      <div>
                        <h1 className="text-lg-heading font-semibold text-gray-600 ">{headerTitle}</h1>
                      </div>
                    ) : (
                      <nav className="flex gap-4">
                        <NavLink
                          to="organization"
                          onClick={() => {}}
                          className={({ isActive }) =>
                            isActive ? 'py-2 px-4 bg-red-650 text-white rounded-lg' : 'py-2 px-4 bg-gray-300 rounded-lg'
                          }
                        >
                          Organization
                        </NavLink>

                        <NavLink
                          to="tutor"
                          onClick={() => {}}
                          className={({ isActive }) =>
                            isActive ? 'py-2 px-4 bg-red-650 text-white rounded-lg' : 'py-2 px-4 bg-gray-300 rounded-lg'
                          }
                        >
                          Tutor
                        </NavLink>

                        <NavLink
                          to="student"
                          onClick={() => {}}
                          className={({ isActive }) =>
                            isActive ? 'py-2 px-4 bg-red-650 text-white rounded-lg' : 'py-2 px-4 bg-gray-300 rounded-lg'
                          }
                        >
                          Student
                        </NavLink>
                      </nav>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-lg-heading font-semibold text-gray-600 my-4 mb-6">{headerTitle}</h1>
                </div>
              )}
            </div>
            <div>{children}</div>
            <Outlet />
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default AuthLayout;
