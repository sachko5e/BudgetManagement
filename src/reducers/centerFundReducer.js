import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function centerFundReducer(state = initialState.center, action) {
  switch (action.type) {
    case types.LOAD_CENTER_FUND_SUCCESS:
      console.log("reducer LOAD_CENTER_FUND_SUCCESS");
      return action.center;

    default:
      return state;
  }
}
