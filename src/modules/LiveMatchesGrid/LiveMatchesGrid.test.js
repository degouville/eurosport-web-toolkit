import React from 'react';
import { shallow } from 'enzyme';
import LiveMatchesGrid from '.';
import { liveMatches } from '../AllMatches/mockData/mockMatches';

describe('LiveMatchesGrid', () => {
  it('renders as expected', () => {
    expect(
      shallow(
        <LiveMatchesGrid
          matches={liveMatches}
          title={[{ text: 'ROLAND GARROS' }, { text: 'MENS' }, { text: 'SEMI-FINAL' }]}
          showMoreText="View more matches"
          showLessText="View less matches"
          liveButtonText="LIVE"
          matchesToShow={2}
          matchInfoButtonText="matchInfoButtonText"
        />
      )
    ).toMatchSnapshot();
  });
});
