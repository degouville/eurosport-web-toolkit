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
    liveMatchesText={object('liveMatchesText', 'Live now')}
    upcomingMatchesText={object('upcomingMatchesText', 'Upcoming')}
    finishedMatchesText={object('finishedMatchesText', 'Finished')}
    showMoreText={text('showMoreText', 'View more matches')}
    showLessText={text('showLessText', 'View less matches')}
    liveButtonText={text('liveButtonText', 'Live')}
    matchInfoButtonText={text('matchInfoButtonText', 'Match info')}
    eventName={text('eventName', "Men's singles")}
  />
));
