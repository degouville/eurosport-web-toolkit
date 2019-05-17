import React from 'react';
import { shallow } from 'enzyme';
import AllMatches from '.';
import { liveMatches, upcomingMatches, finishedMatches } from './mockData/mockMatches';

describe('AllMatches', () => {
  it('renders as expected', () => {
    expect(
      shallow(
        <AllMatches
          liveMatches={liveMatches}
          upcomingMatches={upcomingMatches}
          finishedMatches={finishedMatches}
          showMoreText="View more matches"
          showLessText="View less matches"
          eventName="Men's singles"
        />
      )
    ).toMatchSnapshot();
  });
});
