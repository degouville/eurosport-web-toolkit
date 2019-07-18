import React from 'react';
import { shallow } from 'enzyme';
import ErrorBanner from './index';

describe('ErrorBanner', () => {
  it('Should match snapshot', () => {
    const errorBanner = shallow(<ErrorBanner message="Error" />);

    expect(errorBanner).toMatchSnapshot();
  });
});
