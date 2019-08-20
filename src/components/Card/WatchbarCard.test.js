import React from 'react';
import { shallow } from 'enzyme';
import WatchbarCard, { StyledLiveLabel, StyledImage } from './WatchbarCard';

const cardData = {
  img: 'https://i.eurosport.com/taiga/MagicBox/Crop/16_9/0_20180710-125830.jpeg?w=640',
  url: '/article/id',
  playerChannelNameAnalytics: 'eurosport-france',
  titleAnalytics: 'masters-1000-indian-wells',
  trackingPosition: 0,
  isLive: false,
  title: 'Darts: BDO World Championship',
  timestamp: '09:00 - 10:30',
  channel: 'E1FR',
  liveLabel: 'live',
};

describe('Watchbar card', () => {
  it('renders a WatchbarCard', () => {
    const wrapper = shallow(<WatchbarCard card={cardData} trackingPosition={cardData.trackingPosition} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a WatchbarCard with a live label', () => {
    const wrapper = shallow(
      <WatchbarCard card={{ ...cardData, isLive: true }} trackingPosition={cardData.trackingPosition} />
    );
    expect(wrapper.find(StyledLiveLabel).length).toEqual(1);
  });

  it('should render image', () => {
    // GIVEN
    const wrapper = shallow(
      <WatchbarCard card={{ ...cardData, isLive: true }} trackingPosition={cardData.trackingPosition} />
    );

    // EXPECT
    expect(wrapper.dive().find(StyledImage).length).toEqual(1);
  });

  it('should render placeholder if no image provided', () => {
    // GIVEN
    const wrapper = shallow(
      <WatchbarCard card={{ ...cardData, isLive: true, img: null }} trackingPosition={cardData.trackingPosition} />
    );

    // WHEN
    const images = wrapper.dive().find(StyledImage);
    const { src: imageSrc } = images.first().props();

    // EXPECT
    expect(images.length).toEqual(1);
    expect(imageSrc).toContain('/eurosport-web-toolkit/');
  });
});
