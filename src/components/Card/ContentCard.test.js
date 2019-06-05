import React from 'react';
import { shallow } from 'enzyme';
import ChannelIcon from 'src/elements/ChannelIcon';
import ContentCard, { StyledPlayIcon, StyledLiveLabel } from './ContentCard';
import CardDetails from './CardDetails';

const cardData = {
  img: 'https://i.eurosport.com/2018/10/29/2450727-50913270-2560-1440.jpg?w=200',
  url: '/article/1',
  category: 'Tennis',
  title: 'Youth olympic summer games',
  description: 'Description',
  timestamp: '09:00 - 10:30',
  channel: 'E1',
  liveLabel: 'live label',
};

it('renders a Article ContentCard', () => {
  const wrapper = shallow(<ContentCard card={cardData} type="article" />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find(StyledPlayIcon).length).toEqual(0);
});

it('renders a ContentCard with play icon', () => {
  const wrapper = shallow(<ContentCard card={cardData} type="vod" />);
  expect(wrapper.find(StyledPlayIcon).length).toEqual(1);
});

it('should pass correct props to CardDetails', () => {
  const wrapper = shallow(<ContentCard card={cardData} type="live" />);
  expect(wrapper.find(CardDetails).props()).toEqual({
    card: {
      category: cardData.category,
      title: cardData.title,
      description: cardData.description,
      channel: cardData.channel,
      timestamp: cardData.timestamp,
    },
    icon: <ChannelIcon height={15} type={cardData.channel} />,
  });
});

describe('Live Content Card', () => {
  it('renders a live label', () => {
    const wrapper = shallow(<ContentCard card={cardData} type="live" />);
    expect(
      wrapper
        .find(StyledLiveLabel)
        .render()
        .text()
    ).toContain(cardData.liveLabel);
  });

  it('renders a play icon', () => {
    const wrapper = shallow(<ContentCard card={cardData} type="live" />);
    expect(wrapper.find(StyledPlayIcon).length).toEqual(1);
  });
});
