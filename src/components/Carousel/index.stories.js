import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, boolean } from '@storybook/addon-knobs';
import styled from 'react-emotion';
import { rgba } from 'polished';
import Play from 'src/assets/circleplay.component.svg';
import { Carousel } from '../..';
import WatchbarCard from '../Card/WatchbarCard';
import { coreLightMinus1, coreNeutral1 } from '../../colors';

const indexStories = storiesOf('Components|Carousel', module);

const base = {
  img: 'https://i.eurosport.com/taiga/MagicBox/Crop/16_9/0_20180710-125830.jpeg?w=640',
  url: '/article/id',
  category: 'Tennis',
  title: 'Klopp happy with Chelsea draw after good performance',
  description: 'Day 2',
  timestamp: '09:00 - 10:30',
};

const watchbar = {
  ...base,
  title: 'Darts: BDO World Championship',
  channel: 'E1FR',
  liveLabel: 'live',
  isLive: true,
  startTime: '09:00',
  endTime: '10:00',
};

const StyledPlayIco = styled(Play)`
  width: 16px;
  height: 16px;
  display: block;
  margin-bottom: 8px;
`;

const StyledTitle = styled.div`
  border-bottom: 1px solid ${rgba(coreLightMinus1, 0.3)};
  text-transform: uppercase;
  padding-bottom: 6px;
  font-size: 12px;
  line-height: 14px;
  color: ${coreNeutral1};
  width: 100px;
  user-select: none;
`;

indexStories.add('Carousel', () => (
  <Carousel alignCenter={boolean('alignCenter', false)} withArrow={boolean('withArrow', true)}>
    <StyledTitle>
      <StyledPlayIco />
      En direct sur Eurosport Player
    </StyledTitle>
    <WatchbarCard card={object('card', watchbar)} />
    <WatchbarCard card={object('card', watchbar)} />
    <WatchbarCard card={object('card', watchbar)} />
    <WatchbarCard card={object('card', watchbar)} />
  </Carousel>
));
