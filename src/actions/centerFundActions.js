import * as types from "./actionTypes";
import CenterFundApi from "../api/centerFundAPI";
import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";

export function loadCenterFundSuccess(center) {
  console.log("action loadCenterFundSuccess");
  return { type: types.LOAD_CENTER_FUND_SUCCESS, center };
}

export function loadCenterFund(costCenter, fund) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return CenterFundApi.getCenterFund(costCenter, fund)
      .then(centerRows => {
        dispatch(loadCenterFundSuccess(centerRows));
      })
      .catch(error => {
        throw error;
      });
  };
}
