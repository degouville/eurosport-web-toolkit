import React from 'react';
import { mount, shallow } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import theme from 'src/theme';

import LiveStatus from './index';

describe('Components|JWPlayerETP|Controls|LiveStatus', () => {
  it('Should match snapshot on live', () => {
    // Given
    const wrapper = shallow(<LiveStatus isLive onSeek={jest.fn} seekMax={-25} />);

    // Expect
    expect(wrapper).toMatchSnapshot();
  });

  it('Should match snapshot on rewindCounts', () => {
    // Given
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <LiveStatus rewindCounts="-1.23.23" onSeek={jest.fn} seekMax={-25} />
      </ThemeProvider>
    ).find(LiveStatus);

    // Expect
    expect(wrapper).toMatchSnapshot();
  });

  it('Should match snapshot on live', () => {
    // Given
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <LiveStatus isLive onSeek={jest.fn} seekMax={-25} />
      </ThemeProvider>
    ).find(LiveStatus);

    // Expect
    expect(wrapper).toMatchSnapshot();
  });

  it('Should match snapshot offline', () => {
    // Given
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <LiveStatus onSeek={jest.fn} seekMax={-25} />
      </ThemeProvider>
    ).find(LiveStatus);

    // Expect
    expect(wrapper).toMatchSnapshot();
  });

  it('Should show Back to Live action if rewindCounts exists', () => {
    // Given
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <LiveStatus rewindCounts="-11:38" onSeek={jest.fn} seekMax={-25} />
      </ThemeProvider>
    ).find(LiveStatus);

    // Expect
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('img').prop('alt')).toEqual('Forward');
  });

  it('Should not show Back to Live action if rewindCounts is null', () => {
    // Given
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <LiveStatus onSeek={jest.fn} seekMax={-25} />
      </ThemeProvider>
    ).find(LiveStatus);

    // Expect
    expect(wrapper.find('img')).toHaveLength(0);
  });
});
