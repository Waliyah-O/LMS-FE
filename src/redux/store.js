import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import rootReducer from './reducers';
import { useSelector } from 'react-redux';

// Import API slice(s)
import {programsApi} from '../features/ProgramManagement/programApi'
import { authApiSlice } from '../users/user-apiSlice';
import { cohortsApi } from '../features/CohortManagement/cohortApi';
import { adminsApi } from '../features/AdminManagement/AdminApi';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(programsApi.middleware)
      .concat(authApiSlice.middleware)
      .concat(cohortsApi.middleware)
      .concat(adminsApi.middleware),
  //   Add RTK-Query middleware
});

setupListeners(store.dispatch);
export const RootState = store.getState;
export const AppDispatch = store.dispatch;
export const useAppSelector = useSelector;

// export default store;
