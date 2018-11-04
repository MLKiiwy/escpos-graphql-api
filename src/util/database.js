import fp from 'lodash/fp';
import { snakeCase, head, isEmpty } from 'lodash';

export const snakeCaseKeys = fp.mapKeys(fp.snakeCase);
export const camelizeKeys = fp.mapKeys(fp.camelCase);

/**
 * @param {Knex}   knexClient db client
 * @param {string} tableName table name
 *
 * @return {QueryBuilderFactory} query builder
 */
export const table = (knexClient, tableName) =>
  knexClient(snakeCase(tableName));

/**
 * @param {array} rows query result rows
 *
 * @return {object|null} model object or null if no result
 */
export const toOneModel = rows => {
  const row = head(rows);

  return row ? camelizeKeys(row) : null;
};

/**
 * @param {array} rows query result rows
 *
 * @return {array|null} array of objects or null if no result
 */
export const toModelCollection = rows =>
  !isEmpty(rows) ? rows.map(camelizeKeys) : null;
