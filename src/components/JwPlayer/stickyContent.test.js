import React from 'react';
import { mount } from 'enzyme';
import MatchStickyContent from './stickyContent';
import { liveMatchDataSet } from '../ScoreBlock/mockData/mockScoreBlockData';

const mockLabels = [
  {
    text: 'ROLAND GARROS',
    color: 'transparent',
  },
  {
    text: 'MENS',
    color: 'transparent',
  },
  {
    text: 'SEMI-FINAL',
    color: 'transparent',
  },
];
describe('stickyContent', () => {
  it('should render as expected', () => {
    const wrapper = mount(
      <MatchStickyContent stickyTitle="Roland Garros" stickyLabels={mockLabels} stickyScore={liveMatchDataSet} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
