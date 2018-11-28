import React, { PureComponent } from 'react';
import MarkdownTicketView from '../../components/MarkdownTicketView/MarkdownTicketView';
import client from '../../client/index.js';

class TicketContainer extends PureComponent {
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
    return message && <MarkdownTicketView content={message.content} />;
  }
}

export default TicketContainer;
