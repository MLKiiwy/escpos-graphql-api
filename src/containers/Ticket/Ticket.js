import React, { Component } from 'react';
import client from '../../client/index.js';

class Ticket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    client.get(`/api/messages/${match.params.id}`).then(result => {
      this.setState({
        message: result.data,
      });
    });
  }

  render() {
    const { message } = this.state;
    return <div className="ep-ticket">{message && message.content}</div>;
  }
}

export default Ticket;
