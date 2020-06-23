import React from 'react';
import styled from 'react-emotion';
import { storiesOf } from '@storybook/react';
import { object, boolean, select, text } from '@storybook/addon-knobs';
import { ScoreBlocks } from '../..';
import {
  pastMatchData,
  liveMatchData,
  liveMatchDataSet,
  pastMatchOnePlayerNoScoresDataSet,
  liveMatchDataSetWithImages,
  scheduledMatchDataSet,
} from './mockData/mockScoreBlockData';

const MATCH_URL =
  'https://www.eurosport.fr/tennis/barcelone-1/2019/live-rafael-nadal-leonardo-mayer_mtc1105580/live.shtml';

const Wrapper = styled.div`
  max-width: 633px;
`;

const setScoreStories = storiesOf('Components|Set Score', module);

setScoreStories.add('Default', () => (
  <Wrapper css={{ maxWidth: '1067px' }}>
    <ScoreBlocks.SetsScore
      data={object('score data', liveMatchDataSet)}
      highlightLastSet={boolean('highlightLastSet', false)}
    />
  </Wrapper>
));
setScoreStories.add('With flags', () => (
  <Wrapper css={{ maxWidth: '1067px' }}>
    <ScoreBlocks.SetsScore
      data={object('score data', liveMatchDataSetWithImages)}
      highlightLastSet={boolean('highlightLastSet', false)}
    />
  </Wrapper>
));

const scoreBlockStories = storiesOf('Components|Score Block', module);

scoreBlockStories.add(`ScoreBlock - info`, () => (
  <Wrapper>
    <ScoreBlocks.ScoreBlock
      matchUrl={MATCH_URL}
      data={object('score data', pastMatchData)}
      isLive={boolean('isLive', false)}
      isWatchable={boolean('isWatchable', false)}
      displayLeftCircle={select('displayLeftCircle', ['won', 'lost', false], false)}
      liveButtonText={text('liveButtonText', 'Live')}
      matchInfoButtonText={text('matchInfoButtonText', 'Match info')}
      hasButton={boolean('hasButton', true)}
    />
  </Wrapper>
));

scoreBlockStories.add(`ScoreBlock - with flags`, () => (
  <Wrapper>
    <ScoreBlocks.ScoreBlock
      matchUrl={MATCH_URL}
      data={object('score data', liveMatchDataSetWithImages)}
      isLive={boolean('isLive', false)}
      isWatchable={boolean('isWatchable', false)}
      displayLeftCircle={select('displayLeftCircle', ['won', 'lost', false], false)}
      liveButtonText={text('liveButtonText', 'Live')}
      matchInfoButtonText={text('matchInfoButtonText', 'Match info')}
      hasButton={boolean('hasButton', false)}
    />
  </Wrapper>
));

const { players: data, schedule } = scheduledMatchDataSet;
scoreBlockStories.add(`ScoreBlock - scheduled`, () => (
  <Wrapper>
    <ScoreBlocks.ScoreBlock
      matchUrl={MATCH_URL}
      data={object('players data', data)}
      schedule={object('schedule', schedule)}
      isLive={boolean('isLive', false)}
      isWatchable={boolean('isWatchable', false)}
      displayLeftCircle={select('displayLeftCircle', ['won', 'lost', false], false)}
      liveButtonText={text('liveButtonText', 'Live')}
      matchInfoButtonText={text('matchInfoButtonText', 'Match info')}
      hasButton={boolean('hasButton', false)}
    />
  </Wrapper>
));

scoreBlockStories.add(`ScoreBlock - live`, () => (
  <Wrapper>
    <ScoreBlocks.ScoreBlock
      matchUrl={MATCH_URL}
      data={object('score data', liveMatchData)}
      schedule={object('schedule', schedule)}
      isLive={boolean('isLive', true)}
      isWatchable={boolean('isWatchable', true)}
      displayLeftCircle={select('displayLeftCircle', ['won', 'lost', false], false)}
      liveButtonText={text('liveButtonText', 'Live')}
      matchInfoButtonText={text('matchInfoButtonText', 'Match info')}
      hasButton={boolean('hasButton', true)}
    />
  </Wrapper>
));

scoreBlockStories.add(`ScoreBlock - no scores`, () => (
  <Wrapper>
    <ScoreBlocks.ScoreBlock
      matchUrl={MATCH_URL}
      data={object('score data', pastMatchOnePlayerNoScoresDataSet)}
      schedule={object('schedule', schedule)}
      isLive={boolean('isLive', false)}
      isWatchable={boolean('isWatchable', false)}
      displayLeftCircle={select('displayLeftCircle', ['won', 'lost', false], false)}
      liveButtonText={text('liveButtonText', 'Live')}
      matchInfoButtonText={text('matchInfoButtonText', 'Match info')}
      hasButton={boolean('hasButton', true)}
    />
  </Wrapper>
));
