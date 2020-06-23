import React from 'react';
import { shallow } from 'enzyme';
import JWPlayerETP from '.';
import PlayerSkin from './PlayerSkin';
import { getBaseProps } from './index.stories';

describe('JWPLayerETP', () => {
  it('should have PlayerControls as default prop', () => {
    const wrapper = shallow(<JWPlayerETP {...getBaseProps()} />);
    expect(wrapper.prop('PlayerControls')).toBe(PlayerSkin);
  });
});
