import React from 'react';
import { mount, shallow } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import theme from 'src/theme';

import LiveStatus from './index';

describe('Components|JWPlayerETP|Controls|LiveStatus', () => {
  it('Should match snapshot on live', () => {
    // Given
    const wrapper = shallow(<LiveStatus isLive />);

    // Expect
    expect(wrapper).toMatchSnapshot();
  });

  it('Should match snapshot on rewindCounts', () => {
    // Given
    const wrapper = shallow(<LiveStatus rewindCounts="-1.23.23" />);

    // Expect
    expect(wrapper).toMatchSnapshot();
  });

  it('Should match snapshot on live', () => {
    // Given
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <LiveStatus isLive />
      </ThemeProvider>
    ).find(LiveStatus);

    // Expect
    expect(wrapper).toMatchSnapshot();
  });

  it('Should match snapshot offline', () => {
    // Given
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <LiveStatus />
      </ThemeProvider>
    ).find(LiveStatus);

    // Expect
    expect(wrapper).toMatchSnapshot();
  });
});
