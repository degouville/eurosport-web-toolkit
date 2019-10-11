import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import theme from 'src/theme';
import ErrorBanner from './index';

describe('ErrorBanner', () => {
  it('Should match snapshot', () => {
    const errorBanner = mount(
      <ThemeProvider theme={theme}>
        <ErrorBanner message="Error" />
      </ThemeProvider>
    );

    expect(errorBanner.find(ErrorBanner)).toMatchSnapshot();
  });
  it('Should display correct error message', () => {
    const errorBanner = mount(
      <ThemeProvider theme={theme}>
        <ErrorBanner message="Error Message" />
      </ThemeProvider>
    ).find(ErrorBanner);
    expect(errorBanner.text()).toEqual('Error Message');
  });
});
