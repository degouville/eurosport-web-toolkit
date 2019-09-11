import React from 'react';
import { shallow } from 'enzyme';
import Controls, { TopBarContainer } from './index';
import useScreenInformation from './useScreenInformation';
import ActionList from './ActionList';
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

  describe('ActionList', () => {
    it('Should display action list in Top bar on mobile', () => {
      // Given
      useScreenInformation.mockImplementation(() => ({ isMobile: true }));
      const props = createDefaultProps();
      const wrapper = shallow(<Controls {...props} />);

      // When
      const actionList = wrapper.find(TopBarContainer).find(ActionList);

      // Expect
      expect(actionList.exists()).toBeTruthy();
    });

    it('Should display action list in Bottom bar on desktop', () => {
      // Given
      useScreenInformation.mockImplementation(() => ({ isMobile: false }));
      const props = createDefaultProps();
      const wrapper = shallow(<Controls {...props} />);

      // When
      const actionList = wrapper.find(BottomBar).find(ActionList);

      // Expect
      expect(actionList.exists()).toBeTruthy();
    });
  });
});
