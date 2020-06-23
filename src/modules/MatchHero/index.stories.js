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
    courtInfo={text('courtInfo', 'Main Arena Court One')}
    labels={object('labels', beforeLabels)}
    cTAText={text('cTAText', 'Subscribe to watch')}
    cTALink={text('CTALink', 'https://www.eurosport.fr/regardez-eurosport-en-direct.shtml')}
    marketingMessage={text('marketingMessage', 'Already a subscriber ?')}
    marketingLink={text('marketingLink', 'http://www.eurosportplayer.fr')}
    marketingLinkText={text('marketingLinkText', 'Log In')}
    displayCTA={boolean('displayCTA', false)}
  />
));
matchHeroStories.add('During Event', () => (
  <MatchHeroWithScore
    labels={object('labels', duringLabels)}
    scoreData={object('scoreData', scoreDataDuring)}
    displayWatchButton={boolean('displayWatchButton', true)}
    watchButtonText={text('watchButtonText', 'Already a subscriber?')}
    watchButtonLinkProps={object('watchButtonLinkProps', {})}
    // eslint-disable-next-line no-console
    onWatchButtonClick={() => console.log('Watch button was clicked')}
    highlightLastSet={boolean('highlightLastSet', false)}
    date={text('date', '')}
    courtInfo={text('courtInfo', '')}
  />
));
matchHeroStories.add('After Event', () => (
  <MatchHeroWithScore
    labels={object('labels', afterLabels)}
    scoreData={object('scoreData', scoreDataAfter)}
    displayWatchButton={boolean('displayWatchButton', true)}
    watchButtonText={text('watchButtonText', 'WATCH REPLAY')}
    watchButtonLinkProps={object('watchButtonLinkProps', {
      href: 'https://www.eurosportplayer.com/on-demand',
      target: 'blank',
    })}
    // eslint-disable-next-line no-console
    onWatchButtonClick={() => console.log('Watch button was clicked')}
    date={text('date', '28 July 2019')}
    courtInfo={text('courtInfo', 'Main Arena Court One')}
  />
));
