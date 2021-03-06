import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
import { WatchBar } from '../..';

const indexStories = storiesOf('Modules|WatchBar', module);

const base = {
  img: 'https://i.eurosport.com/taiga/MagicBox/Crop/16_9/0_20180710-125830.jpeg?w=640',
  url: '/article/id',
  category: 'Tennis',
  title: 'Klopp happy with Chelsea draw after good performance',
  description: 'Day 2',
  timestamp: '09:00 - 10:30',
};

const watchbarCard = {
  ...base,
  title: 'Backhoppning: Varldscupen Vikersund',
  playerChannelNameAnalytics: 'eurosport-france',
  titleAnalytics: 'masters-1000-indian-wells',
  trackingPosition: 0,
  channel: 'E1FR',
  liveLabel: 'live',
  isLive: true,
  startTime: '09:00',
  endTime: '10:00',
};

const cards = [];
for (let i = 0; i < 10; i += 1) {
  cards.push(watchbarCard);
}

indexStories.add('WatchBar', () => <WatchBar cards={object('Cards', cards)} title="Next on Eurosport" />);
