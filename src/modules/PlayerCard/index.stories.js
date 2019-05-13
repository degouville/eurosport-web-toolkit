import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, text } from '@storybook/addon-knobs';
import PlayerCard from '.';

import { BACKGROUND_IMG, previousMatches, playerInfo } from './mockData/playerCardMockData';

const playerCardStory = storiesOf('Modules|PlayerCard', module);

playerCardStory.add('PlayerCard', () => (
  <PlayerCard
    playerInfo={object('playerInfo', playerInfo)}
    backgroundImageUrl={text('backgroundImageUrl', BACKGROUND_IMG)}
    previousMatches={object('previousMatches', previousMatches)}
  />
));
