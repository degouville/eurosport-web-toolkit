import React from 'react';
import { shallow } from 'enzyme';
import SimpleTabs, { TabActive, TabSelected } from '.';

const mockData = [
  {
    label: '1st Round',
    href: '#1',
  },
  {
    label: '2nd Round',
    href: '#2',
  },
  {
    label: '3rd Round',
    href: '#3',
  },
  {
    label: 'Semi-final',
    disabled: true,
    href: '#6',
  },
];

describe('SimpleTabs module', () => {
  let wrapper;
  const getChildren = () => wrapper.dive().children();

  beforeEach(() => {
    wrapper = shallow(<SimpleTabs tabs={mockData} onItemSelected={() => {}} />);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('sets first tab by default', () => {
    expect(
      getChildren()
        .at(0)
        .is(TabSelected)
    ).toBe(true);
  });

  it('respects initialTabIndex to set default tab', () => {
    wrapper.setProps({ initialTabIndex: 2 });

    expect(
      getChildren()
        .at(2)
        .is(TabSelected)
    ).toBe(true);
  });

  it('sets active tab on click', () => {
    const clickTabIndex = 2;

    expect(
      getChildren()
        .at(clickTabIndex)
        .is(TabActive)
    ).toBe(true);

    getChildren()
      .at(clickTabIndex)
      .simulate('click', { preventDefault: () => {} });

    expect(
      getChildren()
        .at(clickTabIndex)
        .is(TabSelected)
    ).toBe(true);
  });

  it('tab click triggers onItemSelected callback', () => {
    const spy = jest.fn();

    wrapper.setProps({ onItemSelected: spy });
    getChildren()
      .at(1)
      .simulate('click', { preventDefault: () => {} });

    expect(spy).toHaveBeenCalledWith('#2', 1);
  });

  it('disabled and current tabs do not trigger onItemSelected callback', () => {
    const spy = jest.fn();

    wrapper.setProps({ onItemSelected: spy });
    getChildren()
      .at(0)
      .simulate('click');

    getChildren()
      .at(3)
      .simulate('click');

    expect(spy).not.toHaveBeenCalled();
  });
});
