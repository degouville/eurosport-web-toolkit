import React from 'react';
import { shallow } from 'enzyme';
import { DeactivatedComments } from './DeactivatedComments';

describe('DeactivatedComments', () => {
  it('renders a DeactivatedComments Component', () => {
    expect(shallow(<DeactivatedComments t={() => 'deactivated comments translation'} />)).toMatchSnapshot();
  });
});
