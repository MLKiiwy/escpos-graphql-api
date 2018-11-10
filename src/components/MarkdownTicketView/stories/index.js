import React from 'react';
import { storiesOf } from '@storybook/react';
import MarkdownTicketView from '../MarkdownTicketView';

import '../MarkdownTicketView.scss';

storiesOf('MarkdownTicketView', module).add('Default', () => (
  <MarkdownTicketView content="Coucou" />
));
