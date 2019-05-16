import React from 'react';
import { shallow } from 'enzyme';
import MatchHero, { MatchHeroWithScore } from '.';
import { duringLabels, scoreDataDuring, beforeLabels } from './mockData/mockData';
import * as colors from '../../colors';

describe('<MatchHero />', () => {
  const mockTitle = 'R.NADAL vs R.FEDERER';
  const mockDate = '9 June 2019';
  const mockHour = 'Starting from 20:30';

  it('should render as expected', () => {
    const wrapper = shallow(
      <MatchHero
        title={mockTitle}
        date={mockDate}
        hour={mockHour}
        labels={beforeLabels}
        cTAText="Subscribe to watch"
        cTALink="https://www.eurosport.fr/regardez-eurosport-en-direct.shtml"
        marketingMessage="Watch Eurosport live"
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});

describe('<MatchHeroWithScore /> ', () => {
  it('should render as expected', () => {
    const wrapper = shallow(
      <MatchHeroWithScore
        labels={duringLabels}
        scoreData={scoreDataDuring}
        displayWatchButton
        onWatchButtonClick={() => null}
        watchButtonText="WATCH LIVE"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger the callback passed as prop on watch button click', () => {
    const handleClick = jest.fn();
    const wrapper = shallow(
      <MatchHeroWithScore
        labels={duringLabels}
        scoreData={scoreDataDuring}
        displayWatchButton
        onWatchButtonClick={handleClick}
      />
    );
    const playButton = wrapper.find({ bgColorText: colors.venetianRed });
    playButton.simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });
});
