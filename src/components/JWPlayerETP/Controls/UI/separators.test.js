import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import theme from 'src/theme';
import { HorizontalSeparator, VerticalSeparator } from './separators';

describe('Separators', () => {
  it('HorizontalSeparator', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <HorizontalSeparator />
      </ThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('VerticalSeparator', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <VerticalSeparator />
      </ThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
