import ModelWithId from './ModelWithId';

export default class Message extends ModelWithId {
  constructor(connector) {
    super(connector, 'message', ['content']);
  }
}
