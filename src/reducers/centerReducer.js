import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function centerReducer(state = initialState.center, action) {
  switch (action.type) {
    case types.LOAD_CENTER_SUCCESS:
      console.log('reducer LOAD_CENTER_SUCCESS')
      return action.center;

    case types.UPDATE_CENTER:
      console.log('reducer UPDATE_CENTER' + action.center)
      return action.center;

    default:
      return state;
  }
}
