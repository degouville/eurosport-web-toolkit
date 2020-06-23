import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import theme from 'src/theme';
import LiveEventHero from '.';

describe('Live Event Hero', () => {
  const makeProps = newProps => ({
    title: 'ROLAND GARROS',
    subtitle: '3RD ROUND',
    ...newProps,
  });

  it('should render as expected', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <LiveEventHero {...makeProps()} />
      </ThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
