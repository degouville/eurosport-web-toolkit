import React from 'react';
import { mount, shallow } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import RoundTable from './RoundTable';
import RoundTableMobile from './RoundTableMobile';
import { matches, rounds, doubleMatches } from './mock/data';

const convertToTab = ({ number, disabled, highligthed, name: label }) => {
  const href = `${number}`;
  return { label, href, disabled, highligthed };
};
const tabs = rounds.map(convertToTab);

describe('RoundTableMobile module', () => {
  it('matches snapshot', () => {
    // Given
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <RoundTableMobile matches={matches} tabs={tabs} />
      </ThemeProvider>
    );

    // When
    const roundTable = wrapper.find(RoundTableMobile);

    // Expect
    expect(roundTable).toMatchSnapshot();
    wrapper.unmount();
  });
});

describe('RoundTable', () => {
  const singleMatch = {
    id: 123451,
    matchUrl: 'https://eurosport.com',
    hasWon: true,
    round: { number: 1 },
    data: {
      topTeam: {
        playerOneName: 'Nadal',
        sets: [
          { set: 1, score: 6, won: true, tie: null },
          { set: 2, score: 6, won: true, tie: null },
          { set: 3, score: 6, won: false, tie: 2 },
          { set: 4, score: 6, won: true, tie: null },
          { set: 5, score: 3, won: false, tie: null },
        ],
        hasWon: true,
        isServing: false,
        playerOneImage: 'https://i.eurosport.com/_iss_/geo/country/flag/small/2202.png',
        playerTwoImage: 'https://i.eurosport.com/_iss_/geo/country/flag/small/2231.png',
      },
      bottomTeam: {
        playerOneName: 'Federer',
        sets: [
          { set: 1, score: 3, won: false, tie: null },
          { set: 2, score: 3, won: true, tie: null },
          { set: 3, score: 7, won: true, tie: 7 },
          { set: 4, score: 3, won: false, tie: null },
          { set: 5, score: 6, won: true, tie: null },
        ],
        hasWon: false,
        isServing: false,
        playerOneImage: 'https://i.eurosport.com/_iss_/geo/country/flag/small/2202.png',
        playerTwoImage: 'https://i.eurosport.com/_iss_/geo/country/flag/small/2231.png',
      },
    },
  };

  const doubleMatch = {
    id: 123451,
    matchUrl: 'https://eurosport.com',
    hasWon: true,
    round: { number: 1 },
    data: {
      topTeam: {
        playerOneName: 'GABRIELA DABROWSKI',
        playerTwoName: 'EDOARD ROGER-VASELLIN',
        sets: [
          { set: 1, score: 6, won: true, tie: null },
          { set: 2, score: 6, won: true, tie: null },
          { set: 3, score: 6, won: false, tie: 2 },
          { set: 4, score: 6, won: true, tie: null },
          { set: 5, score: 3, won: null, tie: null },
        ],
        hasWon: null,
        isServing: false,
        playerOneImage: 'https://i.eurosport.com/_iss_/geo/country/flag/small/2202.png',
        playerTwoImage: 'https://i.eurosport.com/_iss_/geo/country/flag/small/2231.png',
      },
      bottomTeam: {
        playerOneName: 'LATISHA CHAN',
        playerTwoName: 'SANTIEGO GONZÁLEZ',
        sets: [
          { set: 1, score: 3, won: false, tie: null },
          { set: 2, score: 3, won: true, tie: null },
          { set: 3, score: 7, won: true, tie: 7 },
          { set: 4, score: 3, won: false, tie: null },
          { set: 5, score: 6, won: null, tie: null },
        ],
        hasWon: null,
        isServing: true,
        playerOneImage: 'https://i.eurosport.com/_iss_/geo/country/flag/small/2202.png',
        playerTwoImage: 'https://i.eurosport.com/_iss_/geo/country/flag/small/2231.png',
      },
    },
  };

  it('should render as expected', () => {
    const wrapper = shallow(<RoundTable rounds={rounds} matches={matches} />);
    expect(wrapper).toMatchSnapshot();
    const wrapperDouble = shallow(<RoundTable rounds={rounds} matches={doubleMatches} />);
    expect(wrapperDouble).toMatchSnapshot();
  });

  it('should handle single matches data without crashing', () => {
    const wrapper = shallow(<RoundTable rounds={rounds} matches={[singleMatch]} />);
    expect(wrapper).toMatchSnapshot();
    const wrapperDouble = shallow(<RoundTable rounds={rounds} matches={[doubleMatch]} />);
    expect(wrapperDouble).toMatchSnapshot();
  });

  it('should handle empty round data without crashing', () => {
    const wrapper = shallow(<RoundTable rounds={[]} matches={matches} />);
    expect(wrapper).toMatchSnapshot();
    const wrapperDouble = shallow(<RoundTable rounds={[]} matches={doubleMatches} />);
    expect(wrapperDouble).toMatchSnapshot();
  });
});
