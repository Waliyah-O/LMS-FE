import * as types from "../types";
 
const initialState = {
  loading: false,
  error: null,
  dashboard_data: { }
};
 
const DashboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_DASHBOARD.REQUEST:
      return { ...state, loading: true };
    case types.GET_DASHBOARD.SUCCESS:
      return { ...state, loading: false, dashboard_data: payload };
    case types.GET_DASHBOARD.FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
 
export default DashboardReducer;