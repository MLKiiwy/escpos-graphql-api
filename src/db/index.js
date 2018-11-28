import knex from 'knex';
import config from 'config';

export default knex({
  client: 'sqlite3',
  connection: {
    filename: config.get('database.filepath'),
  },
  useNullAsDefault: true,
});
