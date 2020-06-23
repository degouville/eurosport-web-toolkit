import React from 'react';
import { shallow } from 'enzyme';
import Controls, { TopBarContainer } from './index';
import useScreenInformation from './useScreenInformation';
import FullScreen from './FullScreen';
import BottomBar from './BottomBar';

jest.mock('./useScreenInformation');

describe('Components|JWPlayerETP|Controls', () => {
  const createDefaultProps = newProps => ({
    isLive: true,
    isPlaying: true,
    isFullscreen: true,
    onFullscreenChange: jest.fn(),
    onForward: jest.fn(),
    onRewind: jest.fn(),
    onPlay: jest.fn(),
    onPause: jest.fn(),
    onSeek: jest.fn(),
    onMute: jest.fn(),
    seekMin: 0,
    seekMax: 100,
    seekPosition: 50,
    isBuffering: false,
    volume: 50,
    mute: false,
    onVolume: jest.fn(),
    isAdPlaying: false,
    onSkipAd: jest.fn(),
    ...newProps,
  });

  afterEach(() => {
    useScreenInformation.mockClear();
  });

  it('Should match snapshot', () => {
    // Given
    useScreenInformation.mockImplementation(() => ({ isMobile: false }));
    const props = createDefaultProps();
    const wrapper = shallow(<Controls {...props} />);

    // Expect
    expect(wrapper).toMatchSnapshot();
  });

  describe('FullScreen', () => {
    it('Should display FullScreen component in Top bar on mobile', () => {
      // Given
      useScreenInformation.mockImplementation(() => ({ isMobile: true }));
      const props = createDefaultProps();
      const wrapper = shallow(<Controls {...props} />);

      // When
      const fullScreen = wrapper.find(TopBarContainer).find(FullScreen);

      // Expect
      expect(fullScreen.exists()).toBeTruthy();
    });

    it('Should display FullScreen component in Bottom bar on desktop', () => {
      // Given
      useScreenInformation.mockImplementation(() => ({ isMobile: false }));
      const props = createDefaultProps();
      const wrapper = shallow(<Controls {...props} />);

      // When
      const fullScreen = wrapper.find(BottomBar).find(FullScreen);

      // Expect
      expect(fullScreen.exists()).toBeTruthy();
    });
  });
});
