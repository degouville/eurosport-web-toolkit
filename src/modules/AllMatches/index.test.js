import React from 'react';
import { shallow, mount } from 'enzyme';
import { AllMatches, MatchGrid, Breadcrumbs, StyledTitle } from '.';
import { liveMatches, upcomingMatches, finishedMatches } from './mockData/mockMatches';

describe('AllMatches', () => {
  it('renders as expected', () => {
    expect(
      shallow(
        <AllMatches
          t={key => key}
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

describe('MatchGrid', () => {
  it('renders as expected', () => {
    expect(
      shallow(
        <MatchGrid
          title="Match 1"
          matches={liveMatches}
          showMoreText="View more matches"
          showLessText="View less matches"
          eventName="Men's singles"
        />
      )
    ).toMatchSnapshot();
  });
  it('should render title as default if eventName is undefined', () => {
    const wrapper = mount(
      <MatchGrid
        title="Match 1"
        matches={liveMatches}
        showMoreText="View more matches"
        showLessText="View less matches"
      />
    );
    expect(wrapper.find(StyledTitle).text()).toEqual('Match 1');
  });
});

describe('Breadcrumbs', () => {
  it('renders as expected', () => {
    const wrapper = mount(<Breadcrumbs className="Breadcrumbs" items={[{ name: 'item 1' }, { name: 'item 2' }]} />);
    expect(wrapper).toMatchSnapshot();
  });
});
