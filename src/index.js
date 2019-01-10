import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store/store';
import App from './containers/App';
import { EmitProvider } from 'react-emit';
import { init } from './actions/applicationConfiguration';

init();

ReactDOM.render(
  <EmitProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </EmitProvider>,
  document.getElementById('root')
);
