import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import ErrorBanner from './index';

const indexStories = storiesOf('Elements|ErrorBanner', module);

indexStories.add('default', () => (
  <ErrorBanner message={text('message', 'You entered an incorrect email address or password, please try again')} />
));
