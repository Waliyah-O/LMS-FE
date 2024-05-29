import { Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuth, showToast } from '../utils';

const PrivateRoutes = ({ roles }) => {
  const user = useSelector((state) => state.user);

  // Check if user is logged in and has the required role(s)
  if (!isAuth() || (roles && roles.length > 0 && !roles.some((role) => user[role]))) {
 
      showToast('You must sign in first!', 'error')
    // Redirect to login if not authorized
    return <Navigate to="/signin" replace />;
  }

  // If authorized, render the protected component
  return <Outlet />;
};

export default PrivateRoutes;
