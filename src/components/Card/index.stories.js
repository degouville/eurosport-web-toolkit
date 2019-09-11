import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, text, number } from '@storybook/addon-knobs';
import styled from 'react-emotion';
import { Cards } from '../..';

const cardStories = storiesOf('Components|Card', module);

const Wrapper = styled.div`
  max-width: 500px;
`;

const base = {
  img: 'https://i.eurosport.com/taiga/MagicBox/Crop/16_9/0_20180710-125830.jpeg?w=640',
  url: '/article/id',
  category: 'Tennis',
  title: 'Klopp happy with Chelsea draw after good performance',
  description: 'Day 2',
  timestamp: '09:00 - 10:30',
};

const data = {
  vod: base,
  live: {
    ...base,
    channel: 'E2NO',
    liveLabel: 'live',
  },
  article: base,
};

const schedule = {
  ...base,
  url: null,
  channel: 'E1GB',
};

const vod = {
  ...base,
  description: null,
  timestamp: '01:33:28',
  url: 'http://eurosport.co.uk',
};

const watchbar = {
  ...base,
  title: 'Darts: BDO World Championship',
  playerChannelNameAnalytics: 'eurosport-france',
  titleAnalytics: 'masters-1000-indian-wells',
  trackingPosition: 0,
  channel: 'E1FR',
  liveLabel: 'live',
  isLive: true,
  startTime: '14h00',
  endTime: '15h00',
};

cardStories.addParameters({ info: { propTablesExclude: [Wrapper] } });

const contentCardTypes = ['vod', 'article', 'live'];
contentCardTypes.forEach(type => {
  cardStories.add(`ContentCard - ${type}`, () => {
    const card = object('card', data[type]);
    return (
      <Wrapper>
        <Cards.Content card={card} type={type} />
      </Wrapper>
    );
  });
});

cardStories
  .add('Schedule', () => (
    <Wrapper>
      <Cards.Schedule card={object('card', schedule)} />
    </Wrapper>
  ))
  .add('Vod Compact', () => (
    <Wrapper>
      <Cards.VodCompact card={object('card', vod)} />
    </Wrapper>
  ))
  .add('Watchbar', () => (
    <Wrapper>
      <Cards.Watchbar
        card={object('card', watchbar)}
        trackingPosition={number('trackingPosition', watchbar.trackingPosition)}
      />
    </Wrapper>
  ))
  .add('Card v2 Big', () => (
    <div style={{ maxWidth: 852 }}>
      <Cards.CardBig
        image={text('image', 'https://i.eurosport.com/2019/04/21/2570541-53309530-2560-1440.jpg?w=800')}
        topic={text('topic', 'Australian Open')}
        link={text('link', 'https://www.eurosport.no')}
        title={text('title', 'Re-Play of the Day: The craziest moments')}
        labelPlayButton={text('labelPlayButton', 'Replay')}
        description={text('description', 'Roland-garros')}
        darkness={number('darkness', 50)}
      >
        <Cards.SpanTimeLabel>0:32:03</Cards.SpanTimeLabel>
      </Cards.CardBig>
    </div>
  ))
  .add('Card v2 Small', () => (
    <div style={{ maxWidth: 343 }}>
      <Cards.CardSmall
        image={text('image', 'https://i.eurosport.com/2019/04/21/2570541-53309530-2560-1440.jpg?w=800')}
        topic={text('topic', 'Australian Open')}
        link={text('link', 'https://www.eurosport.no')}
        title={text('title', 'Re-Play of the Day: The craziest moments of the French Open')}
        labelPlayButton={text('labelPlayButton', 'Replay')}
        description={text('description', 'Day 19 - Serie A')}
        darkness={number('darkness', 0)}
      >
        <Cards.SpanTimeLabel>0:32:03</Cards.SpanTimeLabel>
      </Cards.CardSmall>
    </div>
  ))
  .add('Twitter - Tweet', () => (
    <Cards.Twitter tweetUrl={text('tweetUrl', 'https://twitter.com/Eurosport_FR/status/1113852605682286592')} />
  ));
