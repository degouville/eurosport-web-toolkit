import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, text } from '@storybook/addon-knobs';
import styled, { css } from 'react-emotion';
import { Column, Row } from '../../elements/Grid';
import PlayerCard from '.';
import * as breakpoints from '../../breakpoints';

import { BACKGROUND_IMG, previousMatches, playerInfo } from './mockData/playerCardMockData';

const playerCardStory = storiesOf('Modules|PlayerCard', module);

const StyledPlayerCard = styled(PlayerCard)`
  margin-bottom: 30px;

  ${breakpoints.large(css`
    display: flex;
    flex-direction: column;
    flex: 1;
  `)};
`;

const StyledColumn = styled(Column)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

playerCardStory
  .add('PlayerCard', () => (
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
  ))
  .add('PlayerCard Grid', () => (
    <Row>
      <StyledColumn small="full" medium="full" large="6" wide="6">
        <StyledPlayerCard
          playerInfo={object('playerInfo', { ...playerInfo, firstName: 'Novak', lastName: 'Djokovic', ranking: '144' })}
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
      </StyledColumn>
      <StyledColumn small="full" medium="full" large="6" wide="6">
        <StyledPlayerCard
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
      </StyledColumn>
    </Row>
  ));
