import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import theme from 'src/theme';
import PlayerStatistics from '.';
import { names, comparisonPoints } from './mock/data';

import { setGradient, addPercentMark } from './utils';

describe('PlayerStatistics', () => {
  describe('Component', () => {
    it('renders as expected', () => {
      // Given
      const wrapper = shallow(
        <ThemeProvider theme={theme}>
          <PlayerStatistics names={names} comparisonPoints={comparisonPoints} />
        </ThemeProvider>
      );

      const playerStatistics = wrapper.find(PlayerStatistics);

      // Expect
      expect(playerStatistics).toMatchSnapshot();
    });
  });

  describe('Utils', () => {
    it('generate a linear-gradient', () => {
      // Given
      const options = {
        firstValue: 6,
        secondValue: 8,
        maximumValue: 10,
        colorOne: 'blue',
        colorTwo: 'red',
      };

      // When
      const gradient = setGradient({ ...options });

      // Expect
      const wantedGradient = `
    linear-gradient(
      to right,
      transparent 0%,
      transparent 20%,
      blue 20%,
      blue 50%,
      red 50%,
      red 90%,
      transparent 90%,
      transparent
    )
  `;

      expect(gradient).toBe(wantedGradient);
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
