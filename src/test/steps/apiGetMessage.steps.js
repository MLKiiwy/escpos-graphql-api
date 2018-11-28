import { defineFeature, loadFeature } from 'jest-cucumber';
import { insert } from '../tools/database';
import { beforeFunctionnalTest } from '../tools/functionnal';
import client from '../tools/client';

const feature = loadFeature('features/api_get_message.feature');

defineFeature(feature, test => {
  let result;

  beforeEach(async () => {
    result = null;
    return beforeFunctionnalTest();
  });

  test('I can read a message on the api', ({ given, when, then }) => {
    given(
      /^there is (\d+) "(\w+)" in database like:/,
      async (count, entity, lines) => {
        await insert(entity, lines);
      }
    );

    when(
      /^I send a "(\w+)" request to "([a-zA-Z0-9/-]+)"/,
      async (method, url) => {
        result = await client.request({
          method,
          url,
        });
      }
    );

    then(/^the response status code should be (\d+)/, code => {
      expect(result.status).toEqual(parseInt(code, 10));
    });

    then(/^the response body should be like:/, async content => {
      expect(result.data).toMatchObject(JSON.parse(content));
    });
  });
});
