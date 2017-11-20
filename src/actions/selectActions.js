import * as types from './actionTypes';
import SelectApi from '../api/selectApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadSelectCentersSuccess(selectRows) {
  console.log('action loadSelectCentersSuccess');
  return { type: types.LOAD_SELECT_CENTERS_SUCCESS, selectRows};
}


export function loadSelectCenters() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return SelectApi.getSelectCenters().then(selectRows => {dispatch(loadSelectCentersSuccess(selectRows));}).catch(error => { throw(error); });
  };
}
