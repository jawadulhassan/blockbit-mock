import React from 'react';
import { withRouter } from 'react-router';
import { withTheme } from 'styled-components';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import 'firebase/auth';
import firebase from 'firebase/app';
import withFirebaseAuth from 'react-with-firebase-auth';

import { ROUTE_CONSTANTS } from 'shared/constants/Routes';

// import { useTheme } from './ThemeContext';
// import Toggler from './components/widgets/Toggler';
// import ErrorBoundary from 'components/widgets/ErrorBoundary';

import Login from 'components/views/AuthScreens/Login';
import VerifiedUser from 'components/views/AuthScreens/VerifiedUser';
import Registration from 'components/views/AuthScreens/Registration';
import ChangePassword from 'components/views/AuthScreens/ChangePassword';

import BackTesting from 'components/views/UnAuthScreens/BackTesting';

import Dashboard from 'Dashboard';
import firebaseConfig from 'firebaseConfig';

export const LocationDisplay = withRouter(({ location }) => (
  <div data-testid="location-display">{location.pathname}</div>
));

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider(),
};

const App = ({ user, signOut, signInWithGoogle, signInWithFacebook }) => {
  // const themeToggle = useTheme();
  return (
    <Router>
      <Switch>
        <Route
          exact={true}
          path={ROUTE_CONSTANTS.DASHBOARD}
          component={() => <Dashboard signOut={signOut} user={user} />}
        />
        <Route
          exact={true}
          path={ROUTE_CONSTANTS.LANDING_SCREEN}
          component={() => <Dashboard signOut={signOut} user={user} />}
        />
        <Route
          exact={true}
          path={ROUTE_CONSTANTS.CHANGE_PASSWORD}
          component={ChangePassword}
        />
        <Route
          exact={true}
          path={ROUTE_CONSTANTS.LOGIN}
          component={() => (
            <Login
              user={user}
              signOut={signOut}
              signInWithGoogle={signInWithGoogle}
              signInWithFacebook={signInWithFacebook}
            />
          )}
        />
        <Route
          exact={true}
          path={ROUTE_CONSTANTS.REGISTER_USER}
          component={() => (
            <Registration
              user={user}
              signInWithGoogle={signInWithGoogle}
              signInWithFacebook={signInWithFacebook}
            />
          )}
        />
        <Route
          exact={true}
          path={ROUTE_CONSTANTS.VERIFIED_USER}
          component={VerifiedUser}
        />
        <Route
          exact={true}
          path={ROUTE_CONSTANTS.BACKTESTING}
          component={BackTesting}
        />
      </Switch>
      {/* <LocationDisplay /> */}
      {/* <Toggler
          isOn={theme.mode === 'dark' ? true : false}
          handleToggle={() => themeToggle.toggle()}
        /> */}
    </Router>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(withTheme(App));
