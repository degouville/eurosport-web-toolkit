import React from 'react';
import { shallow, mount } from 'enzyme';
import SetsScore, { StyledTeamName, StyledTeamSet, isTeam, StyledSetScoreWrapper, StyledPlayer } from './SetsScore';
import { pastMatchData, liveMatchDataSet, liveMatchDataSetWithImages } from './mockData/mockScoreBlockData';
import { dodgerBlue } from '../../colors';

describe('<SetsScore />', () => {
  it('Renders a SetsScore component', () => {
    const wrapper = shallow(<SetsScore data={liveMatchDataSet} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with font size passed as prop', () => {
    const setScoreWrapper = shallow(<SetsScore data={liveMatchDataSet} baseFontSize="16px" />);
    expect(setScoreWrapper).toHaveStyleRule('font-size', '16px');
  });

  it('displays the winning team name with a checkmark', () => {
    const setsScore = mount(<SetsScore data={pastMatchData} />);
    const firstTeam = setsScore.find(StyledTeamName).first();
    expect(firstTeam.text().startsWith('Federer')).toBe(true);
    expect(firstTeam.text()).toContain('✓');
    setsScore.unmount();
  });

  it('displays the second serving team with a dot', () => {
    const setsScore = mount(<SetsScore data={liveMatchDataSet} />);
    const secondTeam = setsScore.find(StyledTeamName).at(1);
    expect(secondTeam.text().startsWith('A. MENENDEZ-MACEIRAS')).toBe(true);
    expect(secondTeam.text()).toContain('•');
    setsScore.unmount();
  });

  it("should not display playerTwoName if it's not defined", () => {
    const setsScore = mount(<SetsScore data={pastMatchData} />);
    expect(setsScore.find(StyledPlayer)).toHaveLength(2);
    setsScore.unmount();
  });

  it('renders the set scores', () => {
    const biggerWrapper = mount(<SetsScore data={liveMatchDataSet} />);
    expect(biggerWrapper.find(StyledTeamSet)).toHaveLength(10);
    biggerWrapper.unmount();
  });

  it('renders a tie score if any', () => {
    const biggerWrapper = mount(<SetsScore data={liveMatchDataSet} />);
    const thirdSet = biggerWrapper.find(StyledTeamSet).at(2);
    expect(thirdSet.exists('sup')).toEqual(true);
    biggerWrapper.unmount();
  });

  it('renders blue background on last set if requested as prop', () => {
    const biggerWrapper = mount(<SetsScore data={liveMatchDataSet} highlightLastSet />);
    const lastSetWrapper = biggerWrapper.find(StyledSetScoreWrapper).last();
    expect(lastSetWrapper.childAt(0)).toHaveStyleRule('background-color', `${dodgerBlue}`);
    biggerWrapper.unmount();
  });

  it('displays a flag associated with a player', () => {
    const wrapper = mount(<SetsScore data={liveMatchDataSetWithImages} />);
    // Emotion creates a styled wrapper with the same src attribute
    expect(wrapper.find(`[src="${liveMatchDataSetWithImages.topTeam.playerOneImage}"]`)).toHaveLength(2);
  });

  describe('isTeam', () => {
    it('returns true if two players are sent', () => {
      expect(isTeam({ playerOneName: 'player1', playerTwoName: 'player2' })).toEqual(true);
    });
    it('returns false if less than two players', () => {
      expect(isTeam({ playerOneName: '', playerTwoName: 'player2' })).toEqual(false);
      expect(isTeam({ playerOneName: 'player1', playerTwoName: '' })).toEqual(false);
      expect(isTeam({ playerOneName: null, playerTwoName: 'player2' })).toEqual(false);
      expect(isTeam({ playerOneName: 'player1', playerTwoName: null })).toEqual(false);
    });
  });
});
