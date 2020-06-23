import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, text } from '@storybook/addon-knobs';
import { liveMatches } from '../AllMatches/mockData/mockMatches';
import LiveMatchesGrid from '.';

const LiveMatchesGridStories = storiesOf('Modules|LiveMatchesGrid', module);

LiveMatchesGridStories.add('LiveMatchesGrid', () => (
  <>
    <LiveMatchesGrid
      matches={object('matches', [liveMatches[0], liveMatches[1], liveMatches[2]])}
      showMoreText={text('showMoreText', 'View more matches')}
      showLessText={text('showLessText', 'View less matches')}
      liveButtonText={text('liveButtonText', 'Live')}
      matchInfoButtonText={text('matchInfoButtonText', 'Match info')}
      matchesToShow={2}
      title={[{ text: 'ROLAND GARROS' }, { text: 'MENS' }, { text: 'SEMI-FINAL' }]}
    />
    <LiveMatchesGrid
      matches={object('matchessss', [liveMatches[0]])}
      showMoreText={text('showMoreText', 'View more matches')}
      showLessText={text('showLessText', 'View less matches')}
      liveButtonText={text('liveButtonText', 'Live')}
      matchInfoButtonText={text('matchInfoButtonText', 'Match info')}
      matchesToShow={2}
      title={[{ text: 'ROLAND GARROS' }, { text: 'MENS' }, { text: 'SEMI-FINAL' }]}
    />
    <LiveMatchesGrid
      matches={object('matchess', liveMatches)}
      showMoreText={text('showMoreText', 'View more matches')}
      showLessText={text('showLessText', 'View less matches')}
      liveButtonText={text('liveButtonText', 'Live')}
      matchInfoButtonText={text('matchInfoButtonText', 'Match info')}
      matchesToShow={2}
      title={[{ text: 'ROLAND GARROS' }, { text: 'MENS' }, { text: 'SEMI-FINAL' }]}
    />
  </>
));
