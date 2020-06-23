import React from 'react';
import { shallow } from 'enzyme';
import MatchHero, {
  MatchHeroWithScore,
  StyledCTA,
  StyledWatchButton,
  StyledCourtInfo,
  StyledMatchInfo,
  StyledSmallDivider,
} from '.';
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
    courtInfo: 'Main Arena Court One',
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

  it('should not display court info if there are none', () => {
    const props = createProps({ courtInfo: undefined });
    wrapper = shallow(<MatchHero {...props} />);
    expect(wrapper.dive().find(StyledCourtInfo)).toHaveLength(0);
  });
});

describe('<MatchHeroWithScore /> ', () => {
  let wrapper;
  const createProps = newProps => ({
    className: 'test',
    labels: duringLabels,
    scoreData: scoreDataDuring,
    displayWatchButton: true,
    onWatchButtonClick: () => null,
    watchButtonText: 'WATCH LIVE',
    courtInfo: 'Main Arena Court One',
    date: '27 July 2019',
    ...newProps,
  });

  it('should render as expected', () => {
    wrapper = shallow(<MatchHeroWithScore {...createProps()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should send linkProps to the PlayIconLink if provided', () => {
    const watchButtonLinkProps = { href: 'link', otherProp: 'otherValue' };
    const props = createProps({ watchButtonLinkProps });
    wrapper = shallow(<MatchHeroWithScore {...props} />);

    const playIconProps = wrapper.find(StyledWatchButton).props();

    expect(playIconProps.href).toEqual('link');
    expect(playIconProps.otherProp).toEqual('otherValue');
  });

  it('should trigger the callback passed as prop on watch button click', () => {
    const handleClick = jest.fn();
    const props = createProps({ onWatchButtonClick: handleClick });
    wrapper = shallow(<MatchHeroWithScore {...props} />);

    wrapper.find(StyledWatchButton).simulate('click');

    expect(handleClick).toHaveBeenCalled();
  });

  it('should not display match info if there are none', () => {
    const props = createProps({ courtInfo: undefined, date: undefined });
    wrapper = shallow(<MatchHeroWithScore {...props} />);
    expect(wrapper.dive().find(StyledMatchInfo)).toHaveLength(0);
  });

  it('should not display a divider', () => {
    const props = createProps({ courtInfo: undefined });
    wrapper = shallow(<MatchHeroWithScore {...props} />);
    expect(wrapper.dive().find(StyledSmallDivider)).toHaveLength(0);
  });
});
