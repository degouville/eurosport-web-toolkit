import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, text } from '@storybook/addon-knobs';
import { liveMatches, upcomingMatches, finishedMatches } from './mockData/mockMatches';
import AllMatches from './index';

const iconsStories = storiesOf('Modules|AllMatches', module);
iconsStories.add('default', () => (
  <AllMatches
    liveMatches={object('liveMatches', liveMatches)}
    upcomingMatches={object('upcomingMatches', upcomingMatches)}
    finishedMatches={object('finishedMatches', finishedMatches)}
    liveMatchesText={text('liveMatchesText', 'Live now')}
    upcomingMatchesText={text('upcomingMatchesText', 'Upcoming')}
    finishedMatchesText={text('finishedMatchesText', 'Finished')}
    showMoreText={text('showMoreText', 'View more matches')}
    showLessText={text('showLessText', 'View less matches')}
    liveButtonText={text('liveButtonText', 'Live')}
    matchInfoButtonText={text('matchInfoButtonText', 'Match info')}
    eventName={text('eventName', "Men's singles")}
  />
));
