import Message from './Message';

export default connector => ({
  Message: new Message(connector),
});
