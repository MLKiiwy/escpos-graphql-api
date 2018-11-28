import { defineFeature, loadFeature } from 'jest-cucumber';
import fs from 'fs-extra';
import config from 'config';
import { countEntity, countEntityWith } from '../tools/database';
import { beforeFunctionnalTest } from '../tools/functionnal';
import client from '../tools/client';

const feature = loadFeature('features/sending_message.feature');

defineFeature(feature, test => {
  let result;

  beforeEach(async () => {
    result = null;
    return beforeFunctionnalTest();
  });

  test('When receiving a message, message is save in DB', ({
    given,
    when,
    then,
  }) => {
    given(/^there is no "(\w+)" in database/, async entity => {
      expect(await countEntity(entity)).toEqual(0);
    });

    when(
      /^I send a "(\w+)" request to "(\/\w+)" with body:/,
      async (method, url, json) => {
        result = await client.request({
          method,
          url,
          data: JSON.parse(json),
        });
      }
    );

    then(/^the response status code should be (\d+)/, code => {
      expect(result.status).toEqual(parseInt(code, 10));
    });

    then(/^the response should be in JSON/, () => {
      // TODO
    });

    then(/^the response should have a field "(\w+)" of type "(\w+)"/, field => {
      expect(result.content).toHaveProperty(field);
      // TODO
    });

    then(
      /^the response should have a field "(\w+)" equal to "(\w+)"/,
      (field, value) => {
        expect(result.content).toHaveProperty(field);
        expect(result.content[field]).toEqual(value);
      }
    );

    then(
      /^should be (\d+) (\w+) in database like:/,
      async (count, entity, content) => {
        expect(await countEntityWith(entity, content[0])).toEqual(
          parseInt(count, 10)
        );
      }
    );

    then(/^should be 1 ticket generated with response id/, () => {
      const id = result.content.id;
      const filePath = `${config.get(
        'database.generatedTicketPath'
      )}/${id}.png`;
      expect(fs.ensureFile(filePath)).toBeTruthy();
    });
  });
});
