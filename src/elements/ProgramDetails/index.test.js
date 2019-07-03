import React from 'react';
import { shallow } from 'enzyme';
import ProgramDetails, { StyledSeparator } from '.';
import ChannelIcon from '../ChannelIcon';

describe.only('Program details', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<ProgramDetails textDetail="Text details" callsign="E2NO" />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when callsign is not provided', () => {
    it('should render the default channel icon', () => {
      const wrapper = shallow(<ProgramDetails textDetail="Text details" />);
      expect(wrapper.find(ChannelIcon).prop('type')).toBe('E');
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
  });
});
