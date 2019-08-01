import React from 'react';
import { shallow } from 'enzyme';
import PlayerSkin, { Overlay } from './index';

describe('Components|PlayerWrapper', () => {
  const createDefaultProps = newProps => ({
    id: '1234',
    onForward: jest.fn(),
    onRewind: jest.fn(),
    onPlay: jest.fn(),
    onPause: jest.fn(),
    isPlaying: false,
    isFullscreen: false,
    onFullscreenChange: jest.fn(),
    isLive: true,
    rewindCounts: undefined,
    ...newProps,
  });

  const getActiveState = wrp => wrp.find(Overlay).prop('active');

  it('should match snapshot', () => {
    // Given
    const props = createDefaultProps({ isPlaying: true });
    const wrapper = shallow(<PlayerSkin {...props} />);

    // Expect
    expect(wrapper).toMatchSnapshot();
  });

  describe('Controls display', () => {
    it('Should hide skin when the player is playing', () => {
      // Given
      const props = createDefaultProps({ isPlaying: true });
      const wrapper = shallow(<PlayerSkin {...props} />);

      // When
      const isActive = getActiveState(wrapper);

      // Expect
      expect(isActive).toBeFalsy();
    });

    it('Should show skin when player is not playing', () => {
      // Given
      const props = createDefaultProps({ isPlaying: false });
      const wrapper = shallow(<PlayerSkin {...props} />);
      // When
      const isActive = getActiveState(wrapper);

      // Expect
      expect(isActive).toBeTruthy();
    });

    it('Should show skin on a event', () => {
      // Given
      const props = createDefaultProps({ isPlaying: true });
      const wrapper = shallow(<PlayerSkin {...props} />);

      // When
      wrapper.prop('onMouseOver')();
      const isActive = getActiveState(wrapper);

      // Expect
      expect(isActive).toBeTruthy();
    });
  });

  describe('UI Event handling', () => {
    let wrapper;

    beforeEach(() => {
      // Given
      const props = createDefaultProps({ isPlaying: true });
      wrapper = shallow(<PlayerSkin {...props} />);
    });

    it('Should handle onKeyUp events', () => {
      // When
      const onKeyUp = wrapper.prop('onKeyUp');

      // Expect
      expect(onKeyUp).not.toBeUndefined();
    });

    it('Should handle onMouseOver events', () => {
      // When
      wrapper.prop('onMouseOver')();
      const isActive = getActiveState(wrapper);

      // Expect
      expect(isActive).toBeTruthy();
    });

    it('Should handle onFocus events', () => {
      // When
      wrapper.prop('onFocus')();
      const isActive = getActiveState(wrapper);

      // Expect
      expect(isActive).toBeTruthy();
    });

    it('Should handle onMouseMove events', () => {
      // When
      wrapper.prop('onMouseMove')();
      const isActive = getActiveState(wrapper);

      // Expect
      expect(isActive).toBeTruthy();
    });

    it('Should handle onTouchMove events', () => {
      // When
      wrapper.prop('onTouchMove')();
      const isActive = getActiveState(wrapper);

      // Expect
      expect(isActive).toBeTruthy();
    });

    it('Should handle onTouchStart events', () => {
      // When
      wrapper.prop('onTouchStart')();
      const isActive = getActiveState(wrapper);

      // Expect
      expect(isActive).toBeTruthy();
    });
  });
});
