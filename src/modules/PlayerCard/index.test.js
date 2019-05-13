import React from 'react';
import { shallow, mount } from 'enzyme';
import { PlayerInfos } from '../..';
import PlayerCard, { StyledScoreBlock, StyledBackground } from '.';

import { BACKGROUND_IMG, previousMatches, playerInfo } from './mockData/playerCardMockData';

describe('PlayerCard', () => {
  it('should render as expected', () => {
    expect(
      shallow(
        <PlayerCard playerInfo={playerInfo} backgroundImageUrl={BACKGROUND_IMG} previousMatches={previousMatches} />
      )
    ).toMatchSnapshot();
  });

  it('should render the background image', () => {
    const wrapper = mount(
      <PlayerCard playerInfo={playerInfo} backgroundImageUrl={BACKGROUND_IMG} previousMatches={previousMatches} />
    );
    const backgroundImg = wrapper.find(StyledBackground);
    expect(backgroundImg).toHaveStyleRule('background-image', `url(${BACKGROUND_IMG})`);
  });

  it('should render PlayerInfos', () => {
    const wrapper = mount(
      <PlayerCard playerInfo={playerInfo} backgroundImageUrl={BACKGROUND_IMG} previousMatches={previousMatches} />
    );
    expect(wrapper.find(PlayerInfos)).toHaveLength(1);
  });

  it('should render all the previous matches', () => {
    const wrapper = mount(
      <PlayerCard playerInfo={playerInfo} backgroundImageUrl={BACKGROUND_IMG} previousMatches={previousMatches} />
    );
    const expectedLength = previousMatches.length;
    expect(wrapper.find(StyledScoreBlock)).toHaveLength(expectedLength);
  });
});
