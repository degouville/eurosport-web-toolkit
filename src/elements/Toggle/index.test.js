import React from 'react';
import { shallow, mount } from 'enzyme/build';
import { Toggle } from '../..';

describe('Toggle', () => {
  const toggleProps = {
    toggleCallback: () => null,
    leftLabel: 'left label',
    rightLabel: 'right label',
  };

  it('renders Toggle as expected', () => {
    expect(shallow(<Toggle {...toggleProps} />)).toMatchSnapshot();
  });

  it('should call the callback on click', () => {
    const propsWithMock = {
      ...toggleProps,
      toggleCallback: jest.fn(),
    };
    const wrapper = mount(<Toggle {...propsWithMock} />);
    const slider = wrapper.find({ type: 'checkbox' });
    expect(slider).toHaveLength(1);

    slider.simulate('change');

    expect(propsWithMock.toggleCallback).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('changes the UI based on isSetToLeft prop', () => {
    const wrapper = mount(<Toggle {...toggleProps} />);
    wrapper.setProps({ isSetToLeft: false });
    expect(wrapper.find('span').at(0)).toHaveStyleRule('color', '#ffffff');
    expect(wrapper.find('span').at(2)).toHaveStyleRule('color', '#0094F8');
  });
});
