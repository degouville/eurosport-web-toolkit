import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import ArrowLink from '.';

it('renders a ArrowLink', () => {
  // Given
  const wrapper = shallow(
    <ThemeProvider theme={theme}>
      <ArrowLink href="/">Click me !</ArrowLink>
    </ThemeProvider>
  );

  // Expect
  expect(wrapper).toMatchSnapshot();
});
