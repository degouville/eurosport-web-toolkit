import React from 'react';
import { shallow } from 'enzyme';
import UnderlineLink from './index';

describe.only('UnderlineLink', () => {
  it('should render default UnderlineLink', () => {
    // Given
    const wrapper = shallow(<UnderlineLink href="/eurosport">NEED HELP?</UnderlineLink>);

    // Expect
    expect(wrapper).toMatchSnapshot();
  });
});
