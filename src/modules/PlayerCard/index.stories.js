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
    previousMatchesText={text('previousMatchesText', 'Previous matches')}
    showLessMatchesText={text('showLessMatchesText', 'Show less matches')}
    showMoreMatchesText={text('showMoreMatchesText', 'Show more matches')}
    heightText={text('heightText', 'Height (m)')}
    weightText={text('weightText', 'Weight (Kg)')}
    ageText={text('ageText', 'Age')}
    rankingText={text('rankingText', 'Ranking')}
    liveButtonText={text('liveButtonText', 'Live')}
    matchInfoButtonText={text('matchInfoButtonText', 'Match info')}
  />
));
