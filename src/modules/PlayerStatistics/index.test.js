import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import theme from 'src/theme';
import ibmLogo from 'src/assets/ibm-logo.svg';
import PlayerStatistics, { StyledSponsored } from '.';
import { names, comparisonPoints } from './mock/data';
import { setStatsBar, addPercentMark } from './utils';

describe('PlayerStatistics', () => {
  describe('Component', () => {
    it('renders as expected', () => {
      // Given
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <PlayerStatistics names={names} comparisonPoints={comparisonPoints} />
        </ThemeProvider>
      );

      const playerStatistics = wrapper.find(PlayerStatistics);

      // Expect
      expect(playerStatistics).toMatchSnapshot();
    });

    it('should display sponsore logo', () => {
      // Given
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <PlayerStatistics isSponsored names={names} comparisonPoints={comparisonPoints} />
        </ThemeProvider>
      );

      const playerStatistics = wrapper.find(StyledSponsored);

      // Expect
      expect(playerStatistics.props().src).toEqual(ibmLogo);
    });
  });

  describe('Utils', () => {
    it('generate a linear-gradient', () => {
      // Given
      const options = {
        firstValue: 6,
        secondValue: 8,
        maximumValue: 16,
        colorOne: 'blue',
        colorTwo: 'red',
      };

      // When
      const statsBar = setStatsBar({ ...options });

      // Expect
      const wantedBar = `&:before {
        content: '';
        display: block;
        position: absolute;
        right: 50%;
        top: 0;
        bottom: 0;
        width: 18%;
        background: blue;
        transition: width 0.3s ease-out;
      }
      &:after {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 25%;
        background: red;
        transition: width 0.3s ease-out;
      }
  `;

      expect(statsBar).toBe(wantedBar);
    });

    it('add percentage mark', () => {
      // Given
      const value = 3;
      const isPercent = true;

      // When
      const normalizedValue = addPercentMark(isPercent, value);

      // Expect
      const wantedValue = `3%`;
      expect(normalizedValue).toBe(wantedValue);
    });
  });
});
