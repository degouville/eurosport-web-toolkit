import React from 'react';
import { shallow } from 'enzyme';
import MatchHero, { MatchHeroWithScore } from '.';
import { duringLabels, scoreDataDuring, beforeLabels } from './mockData/mockData';
import * as colors from '../../colors';
import PlayIconLink from '../../elements/PlayIconLink';

describe('<MatchHero />', () => {
  const mockTitle = 'R.NADAL vs R.FEDERER';
  const mockDate = '9 June 2019';
  const mockHour = 'Starting from 20:30';

  it('should render as expected', () => {
    const wrapper = shallow(
      <MatchHero
        className="test"
        title={mockTitle}
        date={mockDate}
        hour={mockHour}
        labels={beforeLabels}
        cTAText="Subscribe to watch"
        cTALink="https://www.eurosport.fr/regardez-eurosport-en-direct.shtml"
        marketingMessage="Watch Eurosport live"
        marketingLink="http://www.eurosportplayer.fr"
        marketingLinkText="Log In"
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});

describe('<MatchHeroWithScore /> ', () => {
  it('should render as expected', () => {
    const wrapper = shallow(
      <MatchHeroWithScore
        className="test"
        labels={duringLabels}
        scoreData={scoreDataDuring}
        displayWatchButton
        onWatchButtonClick={() => null}
        watchButtonText="WATCH LIVE"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should send linkProps to the PlayIconLink if provided', () => {
    const wrapper = shallow(
      <MatchHeroWithScore
        labels={duringLabels}
        scoreData={scoreDataDuring}
        displayWatchButton
        onWatchButtonClick={() => null}
        watchButtonText="WATCH LIVE"
        watchButtonLinkProps={{ href: 'link', otherProp: 'otherValue' }}
      />
    );

    const props = wrapper.find(PlayIconLink).props();

    expect(props.href).toEqual('link');
    expect(props.otherProp).toEqual('otherValue');
  });

  it('should trigger the callback passed as prop on watch button click', () => {
    const handleClick = jest.fn();
    const wrapper = shallow(
      <MatchHeroWithScore
        className="test"
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
