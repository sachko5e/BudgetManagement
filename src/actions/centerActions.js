import * as types from './actionTypes';
import centerApi from '../api/centerApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadCenterSuccess(center) {
  console.log('action loadCenterSuccess');
  return { type: types.LOAD_CENTER_SUCCESS, center};
}

export function updateCenter(center) {
  console.log('action updateCenter');
  return {type: types.UPDATE_CENTER, center};
}

export function loadCenter(costCenter) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return centerApi.getCenter(costCenter).then(centerRows => {dispatch(loadCenterSuccess(centerRows));}).catch(error => { throw(error); });
  };
}
