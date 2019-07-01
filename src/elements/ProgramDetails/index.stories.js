import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';
import ProgramDetails from '.';

const ProgramDetailsStories = storiesOf('Elements|ProgramDetails', module);

ProgramDetailsStories.add('default', () => (
  <ProgramDetails
    callsign={text('callsign', 'E1')}
    textDetail={text('textDetail', '09:00 - 10:00')}
    iconHeight={number('iconHeight', 23)}
  />
));
