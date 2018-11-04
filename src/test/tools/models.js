import { table, snakeCaseKeys, toOneModel } from '../../util/database';
import { db } from './database';

export const user = async content =>
  toOneModel(
    await table(db(), 'message')
      .returning(['id', 'content'])
      .insert(snakeCaseKeys({ content }))
  );
