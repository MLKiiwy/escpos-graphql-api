'use strict';

const config = require('config');

module.exports = {
  client: 'sqlite3',
  connection: { filename: config.get('database.filepath') },
  useNullAsDefault: true,
};
