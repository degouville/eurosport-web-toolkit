import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { Toggle } from '../..';

const toggleStories = storiesOf('Elements|Toggle', module);

toggleStories.add('Toggle', () => (
  <Toggle
    // eslint-disable-next-line no-console
    toggleCallback={() => console.log('You clicked on the toggle')}
    isSetToLeft={boolean('isSetToLeft', true)}
    leftLabel={text('leftLabel', 'Latest')}
    rightLabel={text('rightLabel', 'Highlights')}
  />
));
