import React from 'react';
import { mount } from 'enzyme';
import WatchBar from '.';

const cardData = {
  img: 'https://i.eurosport.com/taiga/MagicBox/Crop/16_9/0_20180710-125830.jpeg?w=640',
  url: '/article/id',
  isLive: false,
  title: 'Darts: BDO World Championship',
  timestamp: '09:00 - 10:30',
  channel: 'E1FR',
  liveLabel: 'live',
  playerChannelNameAnalytics: 'analytics',
  titleAnalytics: 'title',
};

const cards = [cardData, cardData, cardData, cardData];

it('renders a WatchBar', () => {
  const wrapper = mount(<WatchBar cards={cards} />);
  expect(wrapper).toMatchSnapshot();
});

it('renders a WatchBar with a title', () => {
  const wrapper = mount(<WatchBar cards={cards} title="Live on Eurosport" />);
  expect(wrapper).toMatchSnapshot();
});

it('do not renders Watchbar without cards', () => {
  const emptyCards = [];
  const wrapper = mount(<WatchBar cards={emptyCards} title="Live on Eurosport" />);
  expect(wrapper).toMatchSnapshot();
});
