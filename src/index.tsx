import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from 'react-toast-notifications';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import './index.css';
import App from './App';
import { MyThemeProvider } from './ThemeContext';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.Fragment>
    <GoogleReCaptchaProvider
      useRecaptchaNet={true}
      reCaptchaKey={`${process.env.REACT_APP_RECAPTCHA_KEY}`}
    >
      <ToastProvider autoDismissTimeout={10000}>
        <MyThemeProvider>
          <App />
        </MyThemeProvider>
      </ToastProvider>
    </GoogleReCaptchaProvider>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
