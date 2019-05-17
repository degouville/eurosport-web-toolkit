import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, text } from '@storybook/addon-knobs';
import { liveMatches, upcomingMatches, finishedMatches } from './mockData/mockMatches';
import AllMatches from '.';

const iconsStories = storiesOf('Modules|AllMatches', module);

iconsStories.add('default', () => (
  <AllMatches
    liveMatches={object('liveMatches', liveMatches)}
    upcomingMatches={object('upcomingMatches', upcomingMatches)}
    finishedMatches={object('finishedMatches', finishedMatches)}
    showMoreText={text('showMoreText', 'View more matches')}
    showLessText={text('showLessText', 'View less matches')}
    eventName={text('eventName', "Men's singles")}
  />
));
