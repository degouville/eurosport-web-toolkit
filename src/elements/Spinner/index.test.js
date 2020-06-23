import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '.';

describe('Spinner', () => {
  it('should render default spinner', () => {
    const wrapper = shallow(<Spinner className="test" width="50px" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with color passed as prop', () => {
    const wrapper = shallow(<Spinner className="test" color="red" width="50px" />);
    expect(
      wrapper
        .find('stop')
        .first()
        .prop('stopColor')
    ).toEqual('red');
  });

  it('should render with size passed as prop', () => {
    const wrapper = shallow(<Spinner className="test" color="red" width="100px" />);
    expect(wrapper.first()).toHaveStyleRule('height', '100px');
  });
});
