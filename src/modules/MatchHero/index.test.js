import React from 'react';
import { shallow } from 'enzyme';
import MatchHero, { MatchHeroWithScore, StyledCTA, StyledWatchButton } from '.';
import { duringLabels, scoreDataDuring, beforeLabels } from './mockData/mockData';

describe('<MatchHero />', () => {
  let wrapper;
  const createProps = newProps => ({
    className: 'test',
    title: 'R.NADAL vs R.FEDERER',
    date: '9 June 2019',
    hour: 'Starting from 20:30',
    labels: beforeLabels,
    cTAText: 'Subscribe to watch',
    cTALink: 'https://www.eurosport.fr/regardez-eurosport-en-direct.shtml',
    marketingMessage: 'Watch Eurosport live',
    marketingLink: 'http://www.eurosportplayer.fr',
    marketingLinkText: 'Log In',
    ...newProps,
  });

  it('should render as expected', () => {
    const props = createProps();
    wrapper = shallow(<MatchHero {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should not display CTA if displayCTA is set to false', () => {
    const props = createProps({ displayCTA: false });
    wrapper = shallow(<MatchHero {...props} />);
    expect(wrapper.dive().find(StyledCTA)).toHaveLength(0);
  });

  it('should display CTA if displayCTA is set to true', () => {
    const props = createProps({ displayCTA: true });
    wrapper = shallow(<MatchHero {...props} />);
    expect(wrapper.dive().find(StyledCTA)).toHaveLength(1);
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

    const props = wrapper.find(StyledWatchButton).props();

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
    wrapper.find(StyledWatchButton).simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });
});
