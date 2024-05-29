import { identityService, storageService } from '../services';
import { useEffect, useState } from 'react';
// import { suspend } from "../redux/actions/suspense.action";
import suspend from '../redux/reducers/suspend.reducers';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const useGuard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    dispatch(suspend(true));
    const authData = storageService.getAuthData();
    if (!authData.accessToken) {
      navigate('/signin');
    }
    identityService
      .isAuthenticated()
      .then((authorized) => {
        if (!authorized) {
          navigate('/signin');
        }
        setAuthorized(authorized);
      })
      .finally(() => {
        dispatch(suspend(false));
      });
    // eslint-disable-next-line
  }, []);

  return authorized;
};

// import { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { checkAuthentication } from './useGuardSlice';

// export const useGuard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const authorized = useSelector((state) => state.auth.authorized); // Access authorized state from Redux store
//   const location = useLocation()

//   useEffect(() => {
//     dispatch(checkAuthentication())
//       .then((resultAction) => {
//         const authenticated = resultAction.payload;
//         if (!authenticated) {
//           navigate('/signin');
//         } else {
//           navigate('/super-admin/dashboard/home');
//           console.log(location.state);
//         }
//       })
//       .catch((error) => {
//         console.error('Authentication error:', error.message);
//         navigate('/signin');
//       });
//   }, [dispatch, navigate]);

//   return authorized;
// };

// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { checkAuthentication, selectAuthorized, selectLoading, selectError } from './useGuardSlice';

// export const useGuard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const authorized = useSelector(selectAuthorized);
//   const loading = useSelector(selectLoading);
//   const error = useSelector(selectError);

//   useEffect(() => {
//     dispatch(checkAuthentication())
//       .then((resultAction) => {
//         // Authentication check successful, no action needed
//       })
//       .catch((error) => {
//         console.error('Authentication error:', error.message);
//         navigate('/signin');
//       });
//   }, [dispatch, navigate]);

//   return { authorized, loading, error };
// };

// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSuspend } from '../redux/slices/suspendSlice';
// import { useNavigate } from 'react-router-dom';
// import { identityService, storageService } from '../services';

// export const useGuard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [authorized, setAuthorized] = useState(false);
//   const isSuspended = useSelector((state) => state.suspend);

//   useEffect(() => {
//     dispatch(setSuspend(true));
//     const authData = storageService.getAuthData();
//     if (!authData.accessToken) {
//       navigate('/signin');
//     }
//     identityService
//       .isAuthenticated()
//       .then((authorized) => {
//         if (!authorized) {
//           navigate('/signin');
//         }
//         setAuthorized(authorized);
//       })
//       .finally(() => {
//         dispatch(setSuspend(false));
//       });
//     // eslint-disable-next-line
//   }, [dispatch, navigate]);

//   return authorized;
// };
