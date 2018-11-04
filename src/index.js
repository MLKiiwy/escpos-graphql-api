import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import './index.scss';

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
