import Promise from 'bluebird';
import nock from 'nock';
import { clearDb, connect, disconnect } from '../tools/database';

export const beforeFunctionnalTest = async () => {
  connect();
  nock.disableNetConnect();
  nock.enableNetConnect('0.0.0.0');
  nock.enableNetConnect('127.0.0.1');
  return Promise.all(clearDb());
};

export const afterFunctionnalTest = async () => {
  nock.cleanAll();
  nock.enableNetConnect();
  return Promise.all(disconnect());
};
