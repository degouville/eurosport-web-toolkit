import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import ProgramDetails from '.';
import { PlayIcon } from '../..';

const ProgramDetailsStories = storiesOf('Elements|ProgramDetails', module);

ProgramDetailsStories.add('default', () => (
  <ProgramDetails callsign={text('callsign', 'E')} textDetail={text('textDetail', '09:00 - 10:00')} />
));

ProgramDetailsStories.add('with customIcon', () => (
  <ProgramDetails textDetail={text('textDetail', '09:00 - 10:00')} callsign="" customIcon={<PlayIcon />} />
));
