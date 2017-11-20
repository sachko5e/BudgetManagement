import "babel-polyfill";
import React from "react";
import { Provider } from "react-redux";
import { Route, IndexRoute } from "react-router";
import configureStore from "../store/configureStore";
import { loadCenter } from "../actions/centerActions";
import { loadSelectCenters } from "../actions/selectActions";
import { loadCenterFund } from "../actions/centerFundActions";
import initialState from "../reducers/initialState";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import Table from "../components/Table";
import CenterFundDetails from "../components/CenterFundDetails";
import CostingAllocations from "../components/CostingAllocations";
import Help from "../components/Help";
import About from "../components/About";

const store = configureStore();
store.dispatch(loadCenter(initialState.initialCostCenter));
store.dispatch(loadSelectCenters());
store.dispatch(loadCenterFund(50003, 12845));

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Table} />
      <Route
        path="CenterFundDetails/:center/:fund"
        component={CenterFundDetails}
      />
      <Route
        path="CostingAllocations/:center/:fund"
        component={CostingAllocations}
      />
      <Route path="Help/" component={Help} />
      <Route path="About/" component={About} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
