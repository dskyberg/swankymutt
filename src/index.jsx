//
import promiseFinally from "promise.prototype.finally";

import React from 'react'
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

// Material-ui components for this component
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider } from 'material-ui/styles';
import createContext from './styles/createContext';

import { Provider } from 'mobx-react';
import commonStore from './stores/CommonStore'
import authStore from './stores/AuthStore'

import App from './containers/App'

promiseFinally.shim();


const context = createContext();

const stores = {
    authStore,
    commonStore,
}

// For easier debugging
window._____APP_STATE_____ = stores


render(
  <AppContainer>
    <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
      <MuiThemeProvider theme={context.theme} sheetsManager={context.sheetsManager}>
        <Provider {...stores}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </MuiThemeProvider>
    </JssProvider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
          <MuiThemeProvider theme={context.theme} sheetsManager={context.sheetsManager}>
            <Provider {...stores}>
              <BrowserRouter>
                <NextApp />
              </BrowserRouter>
            </Provider>
          </MuiThemeProvider>
        </JssProvider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}