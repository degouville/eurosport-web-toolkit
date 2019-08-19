import React from 'react';
import { shallow } from 'enzyme';
import VolumeOff from 'src/assets/icon-volume-off.svg';
import VolumeMedium from 'src/assets/icon-volume-medium.svg';
import VolumeHigh from 'src/assets/icon-volume-high.svg';
import Icon from '../UI/icon';
import { BarWithPointer, DropdownContainer, Volume } from './index';
import Slider from '../Slider';
import Dropdown from '../Dropdown';
import useClickOutside from './useClickOutside';

jest.mock('./useClickOutside');

describe('Volume', () => {
  const createDefaultProps = newProps => ({
    volume: 50,
    onVolume: jest.fn(),
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
    beforeEach(() => {
      useClickOutside.mockImplementation(() => jest.fn());
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('Should contains Dropdown when the volume is shown', () => {
      // Given
      const props = createDefaultProps();
      const wrapper = shallow(<Volume {...props} />);

      // When
      wrapper.find(BarWithPointer).simulate('click');
      const result = wrapper.find(Dropdown).exists();

      // Expect
      expect(result).toBe(true);
    });

    it('Should not contains Dropdown when the volume is shown', () => {
      // Given
      const props = createDefaultProps();
      const wrapper = shallow(<Volume {...props} />);

      // When
      wrapper.find(BarWithPointer).simulate('click');
      useClickOutside.mock.calls[1][0].callback();
      wrapper.update();
      const result = wrapper.find(Dropdown).exists();

      // Expect
      expect(result).toBe(false);
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
      const props = createDefaultProps({ mute: true, volume: 1 });
      const wrapper = shallow(<Volume {...props} />);

      // When
      wrapper.find(BarWithPointer).simulate('click');
      const result = wrapper.find(Slider).prop('value');

      // Expect
      expect(result).toEqual(0);
    });

    it('Should pass volume as value', () => {
      // Given
      const props = createDefaultProps({ mute: false, volume: 42 });
      const wrapper = shallow(<Volume {...props} />);

      // When
      wrapper.find(BarWithPointer).simulate('click');
      const result = wrapper.find(Slider).prop('value');

      // Expect
      expect(result).toEqual(42);
    });
  });

  describe('Dropdown and Click', () => {
    it('Should disabled click on the bar when the mouse is over the Dropdown', () => {
      // Given
      const props = createDefaultProps({ mute: false, volume: 42 });
      const wrapper = shallow(<Volume {...props} />);

      // When
      wrapper.find(BarWithPointer).simulate('click');
      wrapper.find(DropdownContainer).simulate('mouseOver');
      wrapper.find(BarWithPointer).simulate('click');
      const result = wrapper.find(DropdownContainer).exists();

      // Expect
      expect(result).toEqual(true);
    });

    it('Should re-enable click on the bar when the mouse is out the Dropdown', () => {
      // Given
      const props = createDefaultProps({ mute: false, volume: 42 });
      const wrapper = shallow(<Volume {...props} />);

      // When
      wrapper.find(BarWithPointer).simulate('click');
      wrapper.find(DropdownContainer).simulate('mouseOver');
      wrapper.find(DropdownContainer).simulate('mouseOut');
      wrapper.find(BarWithPointer).simulate('click');
      const result = wrapper.find(DropdownContainer).exists();

      // Expect
      expect(result).toEqual(false);
    });
  });
});
