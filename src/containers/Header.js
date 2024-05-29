import { themeChange } from 'theme-change';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BellIcon from '../assets/svg/notification.svg';
import searchIcon from '../assets/svg/search.svg';
import avatarImg from '../assets/images/Avatar.png';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import { openRightDrawer } from '../features/common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../utils/globalConstantUtil';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/customInputs/SearchBar'
import { identityService, storageService } from '../services';
import { _getTokenFromSession, getDecodedAccessToken, isAuth, showToast } from '../utils';
import { clearUser } from '../users/userSlice';
import { useGetOrganizationCountQuery, useGetOrganizationQuery } from '../features/AdminManagement/AdminApi';

function Header() {
  const dispatch = useDispatch();
  const { pageTitle } = useSelector((state) => state.header);
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme'));
  const [searchText, setSearchText] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  // const [getOrganization] = useGetOrganizationQuery()

  const decodedToken = getDecodedAccessToken(_getTokenFromSession());
  console.log(decodedToken);
  const isAuthenticated = isAuth();
  console.log('is authenticated?', isAuthenticated);

  const { data: adminCount } = useGetOrganizationCountQuery();

  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setCurrentTheme('dark');
      } else {
        setCurrentTheme('light');
      }
    }

    // Check authentication status when component mounts
    const authenticated = isAuth(); // Assuming isAuth returns a boolean
    setIsLoggedIn(authenticated);
  }, []);

  // Opening right sidebar for notification
  const openNotification = () => {
    dispatch(
      openRightDrawer({
        header: 'Notifications',
        bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
      })
    );
  };

  const handleLogin = () => {
    setIsLoggingIn(true);

    setTimeout(() => {
      navigate('/signin');
    }, 2000);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    setIsLoggingOut(true);
    setIsLoggedIn(false);
    setIsLoggingIn(false);
    window.location.href = '/signin';
    showToast('Logging you out', 'success');
    console.log('log out successful');
  };

  const handleSearch = (value) => {
    console.log('searchTerm:', value);
  };

  return (
    <>
      <div className="navbar flex justify-between w-full bg-gray-800 shadow-md z-10 sticky top-0">
        {/* Menu toogle for mobile view or small screen */}
        <div className="">
          <label htmlFor="my-drawer-2" className="btn bg-transparent drawer-button lg:hidden">
            <Bars3Icon className="h-5 inline-block w-5 text-white" />
          </label>
          {/* <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1> */}
        </div>

        <div className="relative ml-6 lg:order-first md:ml-4">
          <SearchBar
            // searchText={searchText}
            onSearch={handleSearch}
            customStyles={'input-sm bg-gray-600 placeholder-slate-400 text-gray-300 pl-8 w-44 lg:w-72'}
          />
          <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
            <img src={searchIcon} alt="Search" />
          </div>
        </div>

        <div className="order-last">
          {/* Notification icon */}
          <button className="btn btn-ghost ml-4  btn-circle" onClick={() => openNotification()}>
            <div className="indicator">
              <img src={BellIcon} />
              {/* {noOfNotifications > 0 ? (
                <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span>
              ) : null} */}
            </div>
          </button>

          <div className="hidden md:flex flex-col items-end pl-4">
            <p className="text-white font-semibold">{decodedToken.email}</p>
            <p className="text-slate-400 text-small">
              {decodedToken.role === 'OrganizationAdmin'
                ? 'Organization Admin'
                : decodedToken.role === 'SuperAdmin'
                ? 'Super Admin'
                : decodedToken.role}
            </p>
          </div>

          {/* Profile icon, opening menu on click */}
          <div className="dropdown dropdown-end  ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-md">
                <img src={avatarImg} alt="profile" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li className="justify-between">
                <Link to={'/super-admin/dashboard/settings-profile'}>
                  Profile Settings
                  <span className="badge">New</span>
                </Link>
              </li>
              <li className="">
                <Link to={'/super-admin/dashboard/settings-billing'}>Bill History</Link>
              </li>
              <div className="divider mt-0 mb-0"></div>
              {/* <li>
                <Link onClick={isLoggedIn ? handleLogout : handleLogin} disabled={isLoggingOut || isLoggingIn}>
                  {isLoggingOut ? 'Logging out...' : isLoggingIn ? 'Logging in...' : isLoggedIn ? 'Logout' : 'Log in'}
                </Link>
              </li> */}
              <li>
                <Link onClick={isLoggedIn ? handleLogout : handleLogin} disabled={isLoggingOut || isLoggingIn}>
                  {isLoggingOut ? 'Logging out...' : isLoggedIn ? 'Logout' : 'Log in'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
