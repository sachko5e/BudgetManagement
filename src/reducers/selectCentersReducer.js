import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function selectCentersReducer(state = initialState.selectRows, action) {

  switch (action.type) {
    case types.LOAD_SELECT_CENTERS_SUCCESS:
      console.log('reducer LOAD_SELECT_CENTERS_SUCCESS')
      return action.selectRows;

    default:
      return state;
  }
}
