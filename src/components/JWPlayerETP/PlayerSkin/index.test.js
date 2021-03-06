import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { ThemeProvider } from 'emotion-theming';
import theme from 'src/theme';
import PlayerSkin, { ControlsOverlay, SpinnerOverlay, ErrorOverlay } from './index';
import useInteraction from './useInteraction';
import useFullscreen from './useFullscreen';
import Controls, { TitleContainer } from '../Controls';

jest.mock('./useInteraction');
jest.mock('./useFullscreen');

describe('Components|PlayerSkin', () => {
  const createDefaultProps = newProps => ({
    id: '1234',
    onPlay: jest.fn(),
    onPause: jest.fn(),
    onForward: jest.fn(),
    onRewind: jest.fn(),
    onSeek: jest.fn(),
    onVolume: jest.fn(),
    onMute: jest.fn(),
    onSkipAd: jest.fn(),
    isPlaying: false,
    isFullscreen: false,
    isLive: true,
    rewindCounts: undefined,
    seekMin: 0,
    seekMax: 100,
    seekPosition: 50,
    volume: 50,
    mute: false,
    controls: false,
    isBuffering: false,
    title: 'title',
    isAdPlaying: false,
    ...newProps,
  });

  const getControlsActiveState = wrp => wrp.find(ControlsOverlay).prop('active');
  const getSpinnerActiveState = wrp => wrp.find(SpinnerOverlay).exists();

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
    it('Should show controls when JWPlayer controls are not displayed', () => {
      // Given
      const props = createDefaultProps({ controls: false });
      const wrapper = shallow(<PlayerSkin {...props} />);

      // When
      const result = wrapper.find(ControlsOverlay).exists();

      // Expect
      expect(result).toBe(true);
    });

    it('Should hide controls when JWPlayer controls are displayed', () => {
      // Given
      const props = createDefaultProps({ controls: true });
      const wrapper = shallow(<PlayerSkin {...props} />);

      // When
      const result = wrapper.find(ControlsOverlay).exists();

      // Expect
      expect(result).toBe(false);
    });

    it('Should hide skin when the player is playing', () => {
      // Given
      const props = createDefaultProps({ isPlaying: true });
      const wrapper = shallow(<PlayerSkin {...props} />);

      // When
      const isActive = getControlsActiveState(wrapper);

      // Expect
      expect(isActive).toBeFalsy();
    });

    it('Should show skin when player is not playing', () => {
      // Given
      const props = createDefaultProps({ isPlaying: false });
      const wrapper = shallow(<PlayerSkin {...props} />);

      // When
      const isActive = getControlsActiveState(wrapper);

      // Expect
      expect(isActive).toBeTruthy();
    });

    it('Should show skin on a onMouseMove', () => {
      // Given
      const props = createDefaultProps({ isPlaying: true });
      const wrapper = shallow(<PlayerSkin {...props} />);

      // When
      wrapper.prop('onMouseMove')();
      const isActive = getControlsActiveState(wrapper);

      // Expect
      expect(isActive).toBeTruthy();
    });

    it('Should not show skin when buffering', () => {
      // Given
      const props = createDefaultProps({ isPlaying: true, isBuffering: true });
      const wrapper = shallow(<PlayerSkin {...props} />);

      // When
      const isActive = getControlsActiveState(wrapper);

      // Expect
      expect(isActive).toBe(false);
    });
  });

  describe('Spinner display', () => {
    it('Should show spinner on buffering', () => {
      // Given
      const props = createDefaultProps({ isPlaying: true, isBuffering: true });
      const wrapper = shallow(<PlayerSkin {...props} />);

      // When
      const isActive = getSpinnerActiveState(wrapper);

      // Expect
      expect(isActive).toBe(true);
    });
  });

  describe('Error display', () => {
    it('Should display error overlay if there is an error', () => {
      // Given
      const props = createDefaultProps({ errorMessage: 'This is an error', isPlaying: true, isBuffering: true });
      const wrapper = shallow(<PlayerSkin {...props} />);

      // Expect
      expect(wrapper.find(ErrorOverlay)).toHaveLength(1);
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

    it('Should handle onMouseMove events', () => {
      // When
      wrapper.prop('onMouseMove')();
      const isActive = getControlsActiveState(wrapper);

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
      callControlActions(['onPlay', 'onPause', 'onFullscreenChange', 'onForward', 'onRewind', 'onSeek', 'onVolume']);

      // Expect
      expect(props.onPlay).toHaveBeenCalled();
      expect(props.onPause).toHaveBeenCalled();
      expect(props.onForward).toHaveBeenCalled();
      expect(props.onRewind).toHaveBeenCalled();
      expect(props.onSeek).toHaveBeenCalled();
      expect(props.onVolume).toHaveBeenCalled();
      expect(onFullscreenChange).toHaveBeenCalled();
      expect(handlePlayerInteraction).toHaveBeenCalledTimes(7);
    });

    it('Should forward props', () => {
      // Given
      const props = createDefaultProps({ isPlaying: true });
      wrapper = shallow(<PlayerSkin {...props} />);

      // When
      wrapper.find(Controls).prop('onVolume')(42);
      wrapper.find(Controls).prop('onSeek')(42);
      wrapper.find(Controls).prop('onMute')(true);

      // Expect
      expect(props.onVolume).toHaveBeenCalledWith(42);
      expect(props.onSeek).toHaveBeenCalledWith(42);
      expect(props.onMute).toHaveBeenCalledWith(true);
      expect(handlePlayerInteraction).toHaveBeenCalledTimes(3);
    });
  });

  describe('Display title', () => {
    let wrapper;
    let onFullscreenChange;

    beforeEach(() => {
      onFullscreenChange = jest.fn();
    });

    it('Should display title when Fullscreen is active', () => {
      useFullscreen.mockReturnValue([true, onFullscreenChange]);
      // Given
      const props = createDefaultProps({ isPlaying: true });
      wrapper = mount(
        <ThemeProvider theme={theme}>
          <PlayerSkin {...props} />
        </ThemeProvider>
      );

      // When
      act(() => {
        wrapper.find(Controls).prop('onFullscreenChange')();
      });

      // Expect
      expect(wrapper.find(TitleContainer).text()).toEqual('title');
    });

    it('Should not display title when Fullscreen is inactive', () => {
      useFullscreen.mockReturnValue([false, onFullscreenChange]);
      // Given
      const props = createDefaultProps({ isPlaying: true });
      wrapper = mount(
        <ThemeProvider theme={theme}>
          <PlayerSkin {...props} />
        </ThemeProvider>
      );

      // When
      act(() => {
        wrapper.find(Controls).prop('onFullscreenChange')();
      });

      // Expect
      expect(wrapper.find(TitleContainer).text()).toEqual('');
    });

    it('Should display title when not Fullscreen if isAdPlaying is true', () => {
      useFullscreen.mockReturnValue([false, onFullscreenChange]);
      // Given
      const props = createDefaultProps({ isPlaying: true, isAdPlaying: true });
      wrapper = mount(
        <ThemeProvider theme={theme}>
          <PlayerSkin {...props} />
        </ThemeProvider>
      );

      // When
      act(() => {
        wrapper.find(Controls).prop('onFullscreenChange')();
      });

      // Expect
      expect(wrapper.find(TitleContainer).text()).toEqual('title');
    });
  });
});
