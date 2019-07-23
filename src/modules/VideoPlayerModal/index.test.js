import React from 'react';
import { mount } from 'enzyme';
import VideoPlayerModal from './index';

describe('VideoPlayerModal', () => {
  it('should match snapshot', () => {
    // Given
    const wrapper = mount(
      <VideoPlayerModal>
        <div />
      </VideoPlayerModal>
    );

    // Expect
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
