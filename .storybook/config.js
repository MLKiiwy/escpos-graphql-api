import { configure } from '@storybook/react';

const storiesContext = require.context(
  '../src',
  true,
  /\.*\/stories\/index\.js$/
);

function loadStories() {
  storiesContext.keys().forEach((filename) => storiesContext(filename));
}

configure(loadStories, module);
