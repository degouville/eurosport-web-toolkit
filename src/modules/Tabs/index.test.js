import React from 'react';
import { mount, shallow } from 'enzyme';
import Tabs, { StyledLabel, StyledItem } from '.';
import * as icons from './icon-type';

const tabsData = [
  {
    label: 'Match',
    icon: icons.MATCH,
    key: 'keytab1',
  },
  {
    label: 'All Matches',
    icon: icons.ALL_MATCHES,
    key: 'keytab2',
  },
  {
    label: 'User Comments',
    icon: icons.USER_COMMENTS,
    key: 'keytab3',
  },
  {
    label: 'Live Comments',
    icon: icons.LIVE_COMMENTS,
    key: 'keytab4',
  },
];

describe('Tabs', () => {
  it('renders its content', () => {
    expect(mount(<Tabs defaultTab="keytab1" onItemSelected={() => null} tabs={tabsData} />)).toMatchSnapshot();
  });
  it('display each tabs from the datas', () => {
    const wrapper = shallow(<Tabs defaultTab="keytab1" onItemSelected={() => null} tabs={tabsData} />);
    expect(wrapper.find("[data-test^='keytab']").length).toEqual(4);
    expect(
      wrapper
        .find(StyledLabel)
        .first()
        .childAt(0)
        .text()
    ).toEqual('Match');
  });
  it('should trigger the callback passed as prop on click', () => {
    const handleClick = jest.fn();
    const wrapper = shallow(<Tabs defaultTab="keytab1" onItemSelected={handleClick} tabs={tabsData} />);
    const firstTab = wrapper.find(StyledItem).first();
    firstTab.simulate('click');
    expect(handleClick).toHaveBeenCalledWith('keytab1');
  });
  it('should update the selected tab state when a tab is clicked', () => {
    const wrapper = mount(<Tabs defaultTab="keytab1" onItemSelected={() => null} tabs={tabsData} />);
    expect(wrapper.state().itemSelected).toEqual('keytab1');
    wrapper.find(`${StyledItem}[data-test='keytab2']`).simulate('click');
    expect(wrapper.state().itemSelected).toEqual('keytab2');
    wrapper.find(`${StyledItem}[data-test='keytab3']`).simulate('click');
    expect(wrapper.state().itemSelected).toEqual('keytab3');
  });
});
