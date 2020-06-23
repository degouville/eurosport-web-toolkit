import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, object } from '@storybook/addon-knobs';
import PlayerStatistics from '.';
import { names, comparisonPoints } from './mock/data';

const playerStatisticsStory = storiesOf('Modules|PlayerStatistics', module);
const render = () => (
  <PlayerStatistics
    names={object('Names', names)}
    comparisonPoints={object('Comparison Points', comparisonPoints)}
    isSponsored={boolean('isSponsored', true)}
  />
);
playerStatisticsStory.add('default', render);
