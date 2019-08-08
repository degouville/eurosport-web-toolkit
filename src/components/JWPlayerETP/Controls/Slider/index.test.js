import React from 'react';
import { shallow } from 'enzyme';
import Slider from './index';

describe('Components|JWPlayerETP|Slider', () => {
  const createProps = newProps => ({
    value: 50,
    onChange: jest.fn(),
    defaultValue: 0,
    min: 0,
    max: 50,
    railThickness: 10,
    railColor: 'blue',
    handleSize: 20,
    handleColor: 'red',
    trackColor: 'green',
    ...newProps,
  });

  it('should match snapshot on vertical', () => {
    const props = createProps({ vertical: true });
    const wrapper = shallow(<Slider {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot on horizontal', () => {
    const props = createProps({ vertical: false });
    const wrapper = shallow(<Slider {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
