import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import Button from '.';

describe('Button', () => {
  it('renders a primary Button by default', () => {
    // Given
    const wrapper = shallow(
      <ThemeProvider theme={theme}>
        <Button>Click me !</Button>
      </ThemeProvider>
    );

    // When
    const type = wrapper.prop('type');

    // Expect
    expect(type).toBe('primary');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a secondary Button', () => {
    // Given
    const wrapper = shallow(
      <ThemeProvider theme={theme}>
        <Button type="secondary">Click me !</Button>
      </ThemeProvider>
    );

    // Expect
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a form Button', () => {
    // Given
    const wrapper = shallow(
      <ThemeProvider theme={theme}>
        <Button type="form">Click me !</Button>
      </ThemeProvider>
    );

    // Expect
    expect(wrapper).toMatchSnapshot();
  });
});
