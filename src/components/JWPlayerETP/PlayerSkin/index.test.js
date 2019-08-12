import React from 'react';
import { shallow } from 'enzyme';
import PlayerSkin, { Overlay } from './index';
import useInteraction from './useInteraction';
import useFullscreen from './useFullscreen';
import Controls from '../Controls';

jest.mock('./useInteraction');
jest.mock('./useFullscreen');

describe('Components|PlayerWrapper', () => {
  const createDefaultProps = newProps => ({
    id: '1234',
    onPlay: jest.fn(),
    onPause: jest.fn(),
    onForward: jest.fn(),
    onRewind: jest.fn(),
    onSeek: jest.fn(),
    isPlaying: false,
    isFullscreen: false,
    isLive: true,
    rewindCounts: undefined,
    seekMin: 0,
    seekMax: 100,
    seekPosition: 50,
    ...newProps,
  });

  const getActiveState = wrp => wrp.find(Overlay).prop('active');

  beforeEach(() => {
    useInteraction.mockImplementation(jest.requireActual('./useInteraction').default);
    useFullscreen.mockImplementation(jest.requireActual('./useFullscreen').default);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

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

  describe('Keep interaction on events', () => {
    let wrapper;
    let handlePlayerInteraction;
    let onFullscreenChange;

    const callControlActions = actions => actions.forEach(action => wrapper.find(Controls).prop(action)());

    beforeEach(() => {
      handlePlayerInteraction = jest.fn();
      onFullscreenChange = jest.fn();
      useFullscreen.mockReturnValue([false, onFullscreenChange]);
      useInteraction.mockImplementation(() => ({ handlePlayerInteraction }));
    });

    it('Should keep interaction on action events', () => {
      // Given

      const props = createDefaultProps({ isPlaying: true });
      wrapper = shallow(<PlayerSkin {...props} />);

      // When
      callControlActions(['onPlay', 'onPause', 'onFullscreenChange', 'onForward', 'onRewind', 'onSeek']);

      // Expect
      expect(props.onPlay).toHaveBeenCalled();
      expect(props.onPause).toHaveBeenCalled();
      expect(props.onForward).toHaveBeenCalled();
      expect(props.onRewind).toHaveBeenCalled();
      expect(props.onSeek).toHaveBeenCalled();
      expect(onFullscreenChange).toHaveBeenCalled();
      expect(handlePlayerInteraction).toHaveBeenCalledTimes(6);
    });
  });
});
