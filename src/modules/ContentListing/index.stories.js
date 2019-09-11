import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, select, text } from '@storybook/addon-knobs';
import { ContentListing, Cards } from '../..';

const contentListingStories = storiesOf('Modules|Content Grid', module);

const baseData = {
  img: 'https://i.eurosport.com/taiga/MagicBox/Crop/16_9/0_20180710-130536.jpeg?w=500',
  url: '/article/id',
  category: 'British superbike',
  title: 'World superbikes: Argentina World',
  timestamp: '09:00 - 10:30',
  channel: 'E2NO',
  liveLabel: 'live',
};

const cardWithDescription = {
  ...baseData,
  description: 'Eurosport News',
};

const cardWithLongContent = {
  ...baseData,
  title: 'United confirm Sanchez sidelined for six weeks with hamstring injury',
  description: "David Gea's two key demands",
};

contentListingStories
  .add('Content card', () => (
    <ContentListing.Grid
      title={text('title', 'Articles list')}
      subLink={object('subLink', { text: 'View Schedule', href: '#' })}
    >
      <Cards.Content card={cardWithDescription} type={select('Type', ['vod', 'article', 'live'], 'article')} />
      <Cards.Content card={object('card', baseData)} type={select('Type', ['vod', 'article', 'live'])} />
      <Cards.Content card={object('card', baseData)} type={select('Type', ['vod', 'article', 'live'], 'article')} />
      <Cards.Content card={object('card', baseData)} type={select('Type', ['vod', 'article', 'live'], 'article')} />
    </ContentListing.Grid>
  ))
  .add('Schedule card', () => (
    <ContentListing.Grid title={text('title', '16:00')}>
      <Cards.Schedule card={cardWithLongContent} />
      <Cards.Schedule card={object('card', baseData)} />
      <Cards.Schedule card={object('card', baseData)} />
      <Cards.Schedule card={object('card', baseData)} />
    </ContentListing.Grid>
  ));
