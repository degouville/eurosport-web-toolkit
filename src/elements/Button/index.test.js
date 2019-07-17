import React from 'react';
import { shallow } from 'enzyme';
import theme from '../../theme';
import Button from '.';

describe('Button', () => {
  it('renders a primary Button by default', () => {
    // Given
    const wrapper = shallow(<Button theme={theme}>Click me !</Button>);

    // When
    const type = wrapper.prop('type');

    // Expect
    expect(type).toBe('primary');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a secondary Button', () => {
    // Given
    const wrapper = shallow(
      <Button theme={theme} type="secondary">
        Click me !
      </Button>
    );

    // Expect
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a form Button', () => {
    // Given
    const wrapper = shallow(
      <Button theme={theme} type="form">
        Click me !
      </Button>
    );

    // Expect
    expect(wrapper).toMatchSnapshot();
  });
});
