import { showErrorMessage } from "./auth.actions";
import * as types from "../types";

//Dashboard Redux

export const getDashboardAsync = (data, successCallback, errorCallback) => {
  return async (dispatch) => {
    dispatch({type: types.GET_DASHBOARD.REQUEST});
    try {
      // const responseData = await dashboardService.fetchDashboard(data);
      const responseData = {};
      dispatch({type: types.GET_DASHBOARD.SUCCESS, payload: responseData});
      successCallback?.();
    } catch (err) {
      dispatch({type: types.GET_DASHBOARD.FAILURE, payload: err});
      errorCallback?.();
      showErrorMessage(err);
    }
  }
}