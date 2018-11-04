import React, { Component } from 'react';
import client from '../../client';

class App extends Component {
  componentDidMount() {
    client.get(`/messages/${id}`).then(result => {
      this.setState({
        message: result.data,
      });
    });
  }

  render() {
    return <div className="ep-ticket" />;
  }
}

export default App;
