import React from 'react';
import { shallow } from 'enzyme';
import PlayerWrapper from './index';

describe('Components|PlayerWrapper', () => {
  it('should match snapshot', () => {
    // Given
    const renderProps = jest.fn();
    const wrapper = shallow(<PlayerWrapper isPlaying>{renderProps}</PlayerWrapper>);

    // Expect
    expect(wrapper).toMatchSnapshot();
  });
});
