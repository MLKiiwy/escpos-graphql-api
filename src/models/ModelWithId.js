import { concat } from 'lodash';
import uuid from 'uuid/v1';
import {
  table,
  snakeCaseKeys,
  toOneModel,
  toModelCollection,
} from '../util/database';

export default class ModelWithId {
  constructor(connector, tableName, fields = []) {
    this.connector = connector;
    this.tableName = tableName;
    this.fields = concat(['id'], fields);
  }

  table() {
    return table(this.connector, this.tableName);
  }

  async getByObjectMatch(obj, returning = null) {
    return toOneModel(
      await this.table()
        .column(returning || this.fields)
        .where(snakeCaseKeys(obj))
        .select()
    );
  }

  async getAllByObjectMatch(obj, returning = null) {
    return toModelCollection(
      await this.table()
        .column(returning || this.fields)
        .where(snakeCaseKeys(obj))
        .select()
    );
  }

  async getById(id, returning = null) {
    return toOneModel(
      await this.table()
        .column(returning || this.fields)
        .where({ id })
        .select()
    );
  }

  async create(data, returning = null) {
    await this.table().insert({ id: uuid(), ...snakeCaseKeys(data) });

    return toOneModel(
      await this.table()
        .column(returning || this.fields)
        .orderBy('id', 'desc')
        .limit(1)
        .select()
    );
  }

  async update(id, data) {
    return this.table()
      .where({ id })
      .update(snakeCaseKeys(data));
  }
}
