import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Ticket from './containers/Ticket/Ticket';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import './index.scss';

ReactDOM.render(
  <ErrorBoundary>
    <Router>
      <Route path="/:id" component={Ticket} />
    </Router>
  </ErrorBoundary>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
