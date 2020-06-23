import React from 'react';
import { mount } from 'enzyme/build';
import { ThemeProvider } from 'emotion-theming';
import theme from 'src/theme';
import Dropdown from './index';

describe('Dropdown Component', () => {
  const Child = () => <div />;

  it('Should match snapshot with bottomDisplay true', () => {
    // Given
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Dropdown bottomDisplay>
          <Child />
        </Dropdown>
      </ThemeProvider>
    );

    // Expect
    expect(wrapper.find(Dropdown)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('Should match snapshot with bottomDisplay false', () => {
    // Given
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Dropdown bottomDisplay={false}>
          <Child />
        </Dropdown>
      </ThemeProvider>
    );

    // Expect
    expect(wrapper.find(Dropdown)).toMatchSnapshot();
    wrapper.unmount();
  });
});
