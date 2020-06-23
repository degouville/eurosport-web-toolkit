import React from 'react';
import { shallow } from 'enzyme';
import ColorDiff from '.';
import { colors } from './index.stories';

describe('ColorDiff', () => {
  it('Should match snapshot', () => {
    const colorDiff = shallow(<ColorDiff colors={colors} />);

    expect(colorDiff).toMatchSnapshot();
  });
});
