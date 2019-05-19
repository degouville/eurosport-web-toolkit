import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, text } from '@storybook/addon-knobs';
import styled from 'react-emotion';
import { PlayerInfos } from '../..';

const playerinfos = storiesOf('Components|PlayerInfos', module);

const Wrapper = styled.div`
  max-width: 500px;
`;

const player = {
  firstName: 'Rafael',
  lastName: 'Nadal',
  age: '32',
  height: '1.85',
  weight: '85',
  country: 'Spain',
  flagUrl: 'https://i.eurosport.com/_iss_/geo/country/flag/medium/2203.png',
  ranking: '2',
  competition: 'ATP',
  pictureUrl: 'https://i.eurosport.com/_iss_/person/pp_clubteam/large/435121.jpg',
};

playerinfos.add('playerinfos', () => (
  <Wrapper>
    <PlayerInfos
      player={object('player', player)}
      heightText={text('heightText', 'Height (m)')}
      weightText={text('weightText', 'Weight (Kg)')}
      ageText={text('ageText', 'Age')}
      rankingText={text('rankingText', 'Ranking')}
    />
  </Wrapper>
));
