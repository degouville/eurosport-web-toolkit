import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
import { RoundTable } from './RoundTable';
import { matches, doubleMatches, rounds } from './mockData/fakeData';

const RoundTableStory = storiesOf('Modules|RoundTable', module);
RoundTableStory.add('RoundTable', () => <RoundTable {...object('data', { matches, rounds })} />);
RoundTableStory.add('DoubleRoundTable', () => <RoundTable {...object('data', { matches: doubleMatches, rounds })} />);
