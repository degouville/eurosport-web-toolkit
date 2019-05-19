import React from 'react';
import { shallow } from 'enzyme';
import { PlayerCard, StyledBackground } from '.';

import { BACKGROUND_IMG, previousMatches, playerInfo } from './mockData/playerCardMockData';

describe('PlayerCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <PlayerCard
        t={key => key}
        playerInfo={playerInfo}
        backgroundImageUrl={BACKGROUND_IMG}
        previousMatches={previousMatches}
      />
    );
  });

  it('should render as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the background image', () => {
    const backgroundImg = wrapper.find(StyledBackground);
    expect(backgroundImg).toHaveStyleRule('background-image', `url(${BACKGROUND_IMG})`);
  });
});
