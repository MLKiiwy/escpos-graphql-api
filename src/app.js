import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import TicketContainer from './containers/TicketContainer/TicketContainer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import './index.scss';

ReactDOM.render(
  <ErrorBoundary>
    <Router>
      <Route path="/:id" component={TicketContainer} />
    </Router>
  </ErrorBoundary>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
