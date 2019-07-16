/* global document */
import 'core-js';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store/store';
import App from './containers/App';
import { EmitProvider } from 'react-emit';
import { init } from './actions/applicationConfiguration';
import { loadTheme } from 'office-ui-fabric-react';
import { initializeIcons } from '@uifabric/icons';

loadTheme({
  palette: {
    themePrimary: '#6647ff',
    themeLighterAlt: '#f9f8ff',
    themeLighter: '#e7e2ff',
    themeLight: '#d1c8ff',
    themeTertiary: '#a391ff',
    themeSecondary: '#785dff',
    themeDarkAlt: '#5c40e6',
    themeDark: '#4e36c2',
    themeDarker: '#39288f',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#b2adc7',
    neutralSecondary: '#706a8f',
    neutralPrimaryAlt: '#3e395b',
    neutralPrimary: '#2c2745',
    neutralDark: '#221e34',
    black: '#191627',
    white: '#ffffff',
  },
});
initializeIcons();

init();

ReactDOM.render(
  <EmitProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </EmitProvider>,
  document.getElementById('root')
);
