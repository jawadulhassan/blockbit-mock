import React from 'react';
import { withRouter } from 'react-router';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { ROUTE_CONSTANTS } from 'shared/constants/Routes';

import BackTesting from 'components/views/UnAuthScreens/BackTesting';

import Dashboard from 'Dashboard';

export const LocationDisplay = withRouter(({ location }) => (
  <div data-testid="location-display">{location.pathname}</div>
));

const App = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact={true}
          path={ROUTE_CONSTANTS.DASHBOARD}
          component={() => <Dashboard />}
        />
        <Route
          exact={true}
          path={ROUTE_CONSTANTS.LANDING_SCREEN}
          component={() => <Dashboard />}
        />
        <Route
          exact={true}
          path={ROUTE_CONSTANTS.BACKTESTING}
          component={BackTesting}
        />
      </Switch>
    </Router>
  );
};

export default App;
