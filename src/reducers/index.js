import { combineReducers } from "redux";
import center from "./centerReducer";
import selectRows from "./selectCentersReducer";
import centerFund from "./centerFundReducer";
import ajaxCallsInProgress from "./ajaxStatusReducer";

const rootReducer = combineReducers({
  center,
  selectRows,
  centerFund,
  ajaxCallsInProgress
});

export default rootReducer;
