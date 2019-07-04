import React from 'react';
import { shallow } from 'enzyme';
import ProgramDetails, { StyledSeparator } from '.';
import ChannelIcon from '../ChannelIcon';

describe.only('Program details', () => {
  it('should render as expected', () => {
    const wrapper = shallow(
      <ProgramDetails textDetail="Text details" callsign="E2NO" customIcon={<span id="icon" />} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('when callsign is not provided', () => {
    it('should render the default channel icon', () => {
      const wrapper = shallow(<ProgramDetails textDetail="Text details" />);
      expect(wrapper.find(ChannelIcon).prop('type')).toBe('E');
    });

    it('does not render customIcon', () => {
      const Icon = <span id="custom-icon" />;
      const wrapper = shallow(<ProgramDetails textDetail="Text details" customIcon={Icon} />);
      expect(wrapper.find({ id: 'custom-icon' })).toHaveLength(0);
    });
  });

  describe('when callsign is empty', () => {
    it('should not render a channel icon', () => {
      const wrapper = shallow(<ProgramDetails textDetail="Text details" callsign="" />);
      expect(wrapper.find(ChannelIcon)).toHaveLength(0);
    });

    it('should not render Separator', () => {
      const wrapper = shallow(<ProgramDetails textDetail="Text details" callsign={null} />);
      expect(wrapper.find(StyledSeparator)).toHaveLength(0);
    });

    it('renders customIcon if provided', () => {
      const Icon = <span id="custom-icon" />;
      const wrapper = shallow(<ProgramDetails textDetail="Text details" callsign="" customIcon={Icon} />);
      expect(wrapper.find({ id: 'custom-icon' })).toHaveLength(1);
      expect(wrapper.find(StyledSeparator)).toHaveLength(1);
    });
  });
});
