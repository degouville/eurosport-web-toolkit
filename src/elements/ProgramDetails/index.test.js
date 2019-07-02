import React from 'react';
import { shallow, mount } from 'enzyme';
import ProgramDetails from '.';
import ChannelIcon from '../ChannelIcon';

describe.only('PlayIcon', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<ProgramDetails textDetail="Text details" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the default channel icon', () => {
    const wrapper = mount(<ProgramDetails textDetail="Text details" />);
    expect(wrapper.find(ChannelIcon).prop('type')).toBe('E');
  });

  it('should not render a channel icon', () => {
    const wrapper = mount(<ProgramDetails textDetail="Text details" callsign="" />);
    expect(wrapper.find(ChannelIcon)).toHaveLength(0);
  });
});
