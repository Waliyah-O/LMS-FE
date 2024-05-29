import { combineReducers } from 'redux';
import { programsApi } from '../../features/ProgramManagement/programApi';
import auth from './auth.reducers';
import dashboard from './dashboard.reducer';
import email from './email.reducer';
import headerSlice from '../../features/common/headerSlice';
import rightDrawerSlice from '../../features/common/rightDrawerSlice';
import modalSlice from '../../features/common/modalSlice';
import { adminsApi } from '../../features/AdminManagement/AdminApi';
import dateRangeSlice from '../../components/CalendarView/dateRangeSlice';
import useGuardSlice from '../../hooks/useGuardSlice';
import suspendSlice from '../slices/suspendSlice';
import { userReducer } from '../../users/userSlice';
import { authApiSlice } from '../../users/user-apiSlice';
import { cohortsApi } from '../../features/CohortManagement/cohortApi';
import drawerSlice from '../../components/DrawerSlice';

const rootReducer = combineReducers({
  // Include your programsApi reducer
  [programsApi.reducerPath]: programsApi.reducer,
  [cohortsApi.reducerPath]: cohortsApi.reducer,
  [adminsApi.reducerPath]: adminsApi.reducer,
  auth: authApiSlice.reducer,
  dashboard,
  user: userReducer,
  email,
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  dateRange: dateRangeSlice,
  useGuard: useGuardSlice,
  suspend: suspendSlice,
  drawer: drawerSlice,
});

export default rootReducer;
