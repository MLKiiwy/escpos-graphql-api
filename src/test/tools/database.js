import config from 'config';
import knex from 'knex';
import Promise from 'bluebird';
import { filter, isString, join, keys, head } from 'lodash';
import { table } from '../../util/database';

export const COUNT_CONDITION = {
  ONLY_ONE: 'ONLY_ONE',
  ONE_OR_MORE: 'ONE_OR_MORE',
  NO_ONE: 'NO_ONE',
};

let connection;

export const connect = () => {
  connection = knex({
    client: 'sqlite3',
    connection: config.get('database.filepath'),
    useNullAsDefault: true,
    debug: true,
  });
};

export const disconnect = async () => {
  if (connection) {
    await connection.destroy();
    connection = null;
  }
  return true;
};

export const db = () => connection;

export const clearDb = () =>
  Promise.each(config.get('database.tables'), name => connection(name).del());

export const clearDbWithCheck = async () => {
  await clearDb();
  return Promise.each(config.get('database.tables'), async name => {
    const result = await connection(name).count();
    const count = parseInt(result[0].count, 10);
    if (count !== 0) {
      throw new Error(`table ${name} is not empty`);
    }
  });
};

export const insert = (tableName, data) =>
  table(connection, tableName).insert(data);

export const countEntity = async tableName => countEntityWith(tableName);

export const countEntityWith = async (tableName, conditions = {}) =>
  table(connection, tableName)
    .count('* as count')
    .where(conditions)
    .then(result => parseInt(result[0].count, 10));

export const resourcesMatch = async (
  tableName,
  entitiesCondition,
  countCondition = COUNT_CONDITION.ONLY_ONE
) => {
  const results = await Promise.all(
    entitiesCondition.map(d =>
      countEntityWith(tableName, d).then(count => {
        switch (countCondition) {
          case COUNT_CONDITION.ONLY_ONE:
            return count !== 1
              ? `can't find only one ${tableName} with : ${JSON.stringify(d)}`
              : true;
          case COUNT_CONDITION.ONE_OR_MORE:
            return count === 0
              ? `can't find one ${tableName} with : ${JSON.stringify(d)}`
              : true;
          case COUNT_CONDITION.NO_ONE:
            return count !== 0
              ? `found one ${tableName} with : ${JSON.stringify(d)}`
              : true;
          default:
            return false;
        }
      })
    )
  );

  const errors = filter(results, isString);

  if (errors.length === 0) {
    return Promise.resolve(true);
  }
  const tableContent = await table(connection, tableName)
    .column(keys(head(entitiesCondition)))
    .select();

  return Promise.reject(
    new Error(
      `${join(errors, '\n')} Content of the table : \n ${JSON.stringify(
        tableContent
      )}`
    )
  );
};

export const resourcesDontMatch = async (tableName, entitiesCondition) =>
  resourcesMatch(tableName, entitiesCondition, COUNT_CONDITION.NO_ONE);
