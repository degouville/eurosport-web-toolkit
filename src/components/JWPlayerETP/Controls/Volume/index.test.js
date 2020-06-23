import React from 'react';
import { shallow } from 'enzyme';
import * as DeviceInfo from 'react-device-detect';
import VolumeOff from 'src/assets/icon-volume-off.svg';
import VolumeMedium from 'src/assets/icon-volume-medium.svg';
import VolumeHigh from 'src/assets/icon-volume-high.svg';
import Icon from '../UI/icon';
import { Volume } from './index';
import Slider from '../Slider';
import Dropdown from '../Dropdown';
import BarControlWrapper from '../UI/barControlWrapper';
import useVolumeWithDelay from './useVolumeWithDelay';

jest.mock('react-device-detect');
jest.mock('./useVolumeWithDelay');

describe('Volume', () => {
  let setShowVolume;
  let useVolumeWithDelayMock;

  const createDefaultProps = newProps => ({
    volume: 50,
    onVolume: jest.fn(),
    onMute: jest.fn(),
    mute: false,
    theme: {
      playerControls: {
        volume: {
          trackColor: 'blue',
          handleSize: 20,
          handleColor: 'red',
          railColor: 'green',
          railThickness: 5,
          vertical: false,
        },
      },
    },
    ...newProps,
  });

  beforeEach(() => {
    setShowVolume = jest.fn();
    useVolumeWithDelayMock = jest.fn(() => [false, setShowVolume]);
    useVolumeWithDelay.mockImplementation(useVolumeWithDelayMock);
    DeviceInfo.isMobile = false;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Snapshots', () => {
    it('Should match snapshot when the volume is not shown', () => {
      // Given
      const props = createDefaultProps();
      const wrapper = shallow(<Volume {...props} />);

      // Expect
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Volume bar', () => {
    it('Should not contains Dropdown', () => {
      // Given
      const props = createDefaultProps();
      const wrapper = shallow(<Volume {...props} />);
      const result = wrapper.find(Dropdown).exists();

      // Expect
      expect(result).toBe(false);
    });

    it('Should contains Dropdown volume when the mouse is over the volume button', () => {
      // Given
      useVolumeWithDelayMock = jest.fn(() => [true, setShowVolume]);
      useVolumeWithDelay.mockImplementation(useVolumeWithDelayMock);
      const props = createDefaultProps();
      const wrapper = shallow(<Volume {...props} />);

      // When
      wrapper.find(BarControlWrapper).simulate('mouseOver');
      const result = wrapper.find(Dropdown).exists();

      // Expect
      expect(result).toBe(true);
      expect(setShowVolume).toHaveBeenCalledWith(true);
    });

    it('Should not contains Dropdown when the mouse is outside the button', () => {
      // Given
      const props = createDefaultProps();
      const wrapper = shallow(<Volume {...props} />);

      // When
      wrapper.find(BarControlWrapper).simulate('mouseOut');
      const result = wrapper.find(Dropdown).exists();

      // Expect
      expect(result).toBe(false);
      expect(setShowVolume).toHaveBeenCalledWith(false);
    });

    it('Should not trigger setShowVolume when mouseOver on mobile', () => {
      // Given
      DeviceInfo.isMobile = true;
      const props = createDefaultProps();
      const wrapper = shallow(<Volume {...props} />);

      // When
      wrapper.find(BarControlWrapper).simulate('mouseOver');
      const result = wrapper.find(Dropdown).exists();

      // Expect
      expect(result).toBe(false);
      expect(setShowVolume).not.toHaveBeenCalled();
    });

    it('Should not trigger setShowVolume when mouseOut on mobile', () => {
      // Given
      DeviceInfo.isMobile = true;
      const props = createDefaultProps();
      const wrapper = shallow(<Volume {...props} />);

      // When
      wrapper.find(BarControlWrapper).simulate('mouseOut');
      const result = wrapper.find(Dropdown).exists();

      // Expect
      expect(result).toBe(false);
      expect(setShowVolume).not.toHaveBeenCalled();
    });
  });

  describe('Volume icon', () => {
    it('Should show volume off when the player is muted', () => {
      // Given
      const props = createDefaultProps({ mute: true });
      const wrapper = shallow(<Volume {...props} />);

      // When
      const source = wrapper.find(Icon).prop('src');

      // Expect
      expect(source).toEqual(VolumeOff);
    });

    it('Should show volume medium when the volume is between 1 and 49', () => {
      // Given
      const props = createDefaultProps({ mute: false, volume: 1 });
      const wrapper = shallow(<Volume {...props} />);

      // When
      const source = wrapper.find(Icon).prop('src');

      // Expect
      expect(source).toEqual(VolumeMedium);
    });

    it('Should show volume medium when the volume is between 50 and 100', () => {
      // Given
      const props = createDefaultProps({ mute: false, volume: 50 });
      const wrapper = shallow(<Volume {...props} />);

      // When
      const source = wrapper.find(Icon).prop('src');

      // Expect
      expect(source).toEqual(VolumeHigh);
    });
  });

  describe('Slider props', () => {
    it('Should pass 0 as value if we are mute', () => {
      // Given
      useVolumeWithDelayMock = jest.fn(() => [true, setShowVolume]);
      useVolumeWithDelay.mockImplementation(useVolumeWithDelayMock);
      const props = createDefaultProps({ mute: true, volume: 1 });
      const wrapper = shallow(<Volume {...props} />);

      // When
      const result = wrapper.find(Slider).prop('value');

      // Expect
      expect(result).toEqual(0);
    });

    it('Should pass volume as value', () => {
      // Given
      useVolumeWithDelayMock = jest.fn(() => [true, setShowVolume]);
      useVolumeWithDelay.mockImplementation(useVolumeWithDelayMock);
      const props = createDefaultProps({ mute: false, volume: 42 });
      const wrapper = shallow(<Volume {...props} />);

      // When
      const result = wrapper.find(Slider).prop('value');

      // Expect
      expect(result).toEqual(42);
    });
  });

  describe('Mute / unmute', () => {
    it('Should mute the volume when we click on the volume', () => {
      // Given
      const props = createDefaultProps({ mute: false, volume: 42 });
      const wrapper = shallow(<Volume {...props} />);

      // When
      wrapper.find(Icon).simulate('click');

      // Expect
      expect(props.onMute).toHaveBeenCalledWith(true);
    });

    it('Should unmute the volume when we click on the volume', () => {
      // Given
      const props = createDefaultProps({ mute: true, volume: 42 });
      const wrapper = shallow(<Volume {...props} />);

      // When
      wrapper.find(Icon).simulate('click');

      // Expect
      expect(props.onMute).toHaveBeenCalledWith(false);
    });

    it('Should set volume to 100 when we came back from mute on mobile', () => {
      // Given
      DeviceInfo.isMobile = true;
      const props = createDefaultProps({ mute: true, volume: 42 });
      const wrapper = shallow(<Volume {...props} />);

      // When
      wrapper.find(Icon).simulate('click');

      // Expect
      expect(props.onMute).toHaveBeenCalledWith(false);
      expect(props.onVolume).toHaveBeenCalledWith(100);
    });
  });
});
