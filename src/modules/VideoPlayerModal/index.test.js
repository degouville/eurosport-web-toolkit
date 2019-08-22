import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import theme from 'src/theme';
import VideoPlayerModal from './index';

describe('VideoPlayerModal', () => {
  it('should match snapshot', () => {
    // Given
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <VideoPlayerModal onClose={() => null}>
          <div />
        </VideoPlayerModal>
      </ThemeProvider>
    );

    // Expect
    expect(wrapper.find(VideoPlayerModal)).toMatchSnapshot();
    wrapper.unmount();
  });
});
