import React from 'react';
import { storiesOf } from '@storybook/react';
import MarkdownTicketView from '../MarkdownTicketView';
import completeMarkdownSample from './completeMarkdownSample.md';

storiesOf('MarkdownTicketView', module)
  .add('Simple text', () => <MarkdownTicketView content="Coucou" />)
  .add('UTF Emojis', () => (
    <MarkdownTicketView content="Emojis : 😘😍😊😉😂😁😭😩❤️👌👍♥️🐋🇫🇷👿💩💞💨😩🐘🎂🍺🍻🥂🍷🍾🎁" />
  ))
  .add('Complex Markdown', () => (
    <MarkdownTicketView content={completeMarkdownSample} />
  ));
