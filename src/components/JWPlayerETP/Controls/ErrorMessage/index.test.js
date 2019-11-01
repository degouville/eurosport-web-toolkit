import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import theme from 'src/theme';
import ErrorMessage from './index';

describe('ErrorMessage', () => {
  it('Should match snapshot', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ErrorMessage message="Error" />
      </ThemeProvider>
    );

    expect(wrapper.find(ErrorMessage)).toMatchSnapshot();
  });
  it('Should display correct error message', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ErrorMessage message="Error Message" />
      </ThemeProvider>
    ).find(ErrorMessage);
    expect(wrapper.text()).toEqual('Error Message');
  });
});
