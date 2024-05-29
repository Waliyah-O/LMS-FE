import { configureStore } from '@reduxjs/toolkit';
import headerSlice from '../features/common/headerSlice';
import modalSlice from '../features/common/modalSlice';
import rightDrawerSlice from '../features/common/rightDrawerSlice';
import leadsSlice from '../features/leads/leadSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { useSelector } from 'react-redux';
import { programsApi } from '../features/ProgramManagement/programApi';
import { cohortsApi } from '../features/CohortManagement/cohortApi';
import { adminsApi } from '../features/AdminManagement/AdminApi';
import { authApiSlice } from '../users/user-apiSlice';
import dateRangeSlice from '../components/CalendarView/dateRangeSlice';
import suspendSlice from '../../redux/slices/suspendSlice';
import { drawerSlice } from '../components/DrawerSlice';

const rootReducer = combineReducers({
  auth: authApiSlice.reducer,
  [programsApi.reducerPath]: programsApi.reducer,
  [cohortsApi.reducerPath]: cohortsApi.reducer,
  [adminsApi.reducerPath]: adminsApi.reducer,
  dateRange: dateRangeSlice,
  suspend: suspendSlice,
  drawer: drawerSlice,
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// const combinedReducer = {
//   header: headerSlice,
//   rightDrawer: rightDrawerSlice,
//   modal: modalSlice,
//   lead: leadsSlice,
// };
// export default configureStore({
//   reducer: combinedReducer,
// });

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
export const useAppSelector = useSelector;
