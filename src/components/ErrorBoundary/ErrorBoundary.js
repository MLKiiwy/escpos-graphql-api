import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    // When there's no error, render children untouched
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="sb-container--sidepanel-collapsed">
        <div className="aa-workspaces-container">
          <h1 className="sb-title--l sb-margin-bottom-l">
            Something went wrong.
          </h1>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
