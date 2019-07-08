import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
import { Labels } from '../..';
import { beforeEventLabels, liveEventLabels, afterEventLabels, simpleLabels } from './mockData/labels';

const indexStories = storiesOf('Elements|Labels', module);

indexStories
  .add('Before Event', () => <Labels labels={object('labels', beforeEventLabels)} />)
  .add('Live Event', () => <Labels labels={object('labels', liveEventLabels)} />)
  .add('After Event', () => <Labels labels={object('labels', afterEventLabels)} />)
  .add('Simple mode', () => <Labels labels={object('labels', simpleLabels)} isSimpleMode />);
