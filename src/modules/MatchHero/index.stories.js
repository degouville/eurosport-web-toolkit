import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, text, boolean } from '@storybook/addon-knobs';
import { MatchHero } from '../..';
import { beforeLabels, duringLabels, afterLabels, scoreDataDuring, scoreDataAfter } from './mockData/mockData';
import { MatchHeroWithScore } from '.';

const matchHeroStories = storiesOf('Modules|MatchHero', module);
matchHeroStories.add('Before Event', () => (
  <MatchHero
    title={text('title', 'R.NADAL vs R.FEDERER')}
    date={text('date', '9 June 2019')}
    hour={text('hour', 'Starting from 20:30')}
    labels={object('labels', beforeLabels)}
    cTAText={text('cTAText', 'Subscribe to watch')}
    cTALink={text('CTALink', 'https://www.eurosport.fr/regardez-eurosport-en-direct.shtml')}
    marketingMessage={text('marketingMessage', 'Watch Eurosport live')}
  />
));
matchHeroStories.add('During Event', () => (
  <MatchHeroWithScore
    labels={object('labels', duringLabels)}
    scoreData={object('scoreData', scoreDataDuring)}
    displayWatchButton={boolean('displayWatchButton', true)}
    watchButtonText={text('watchButtonText', 'WATCH LIVE')}
    // eslint-disable-next-line no-console
    onWatchButtonClick={() => console.log('Watch button was clicked')}
  />
));
matchHeroStories.add('After Event', () => (
  <MatchHeroWithScore
    labels={object('labels', afterLabels)}
    scoreData={object('scoreData', scoreDataAfter)}
    displayWatchButton={boolean('displayWatchButton', true)}
    watchButtonText={text('watchButtonText', 'WATCH REPLAY')}
    // eslint-disable-next-line no-console
    onWatchButtonClick={() => console.log('Watch button was clicked')}
  />
));
