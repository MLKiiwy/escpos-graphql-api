import { configure } from '@storybook/react';
import '../src/index.scss';

const storiesContext = require.context(
  '../src',
  true,
  /\.*\/stories\/index\.js$/
);

function loadStories() {
  storiesContext.keys().forEach((filename) => storiesContext(filename));
}

configure(loadStories, module);
