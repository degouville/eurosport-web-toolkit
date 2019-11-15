import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import theme from 'src/theme';
import BarControlWrapper from './barControlWrapper';

describe('BarControlWrapper', () => {
  it('should match snapshot', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <BarControlWrapper />
      </ThemeProvider>
    );
    expect(wrapper.find(BarControlWrapper)).toMatchSnapshot();
  });
  it('should render with medium size', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <BarControlWrapper medium />
      </ThemeProvider>
    );
    expect(wrapper).toHaveStyleRule('width', '80px');
  });
});
