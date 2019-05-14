import React from 'react';
import { shallow } from 'enzyme';
import LiveComments from '.';

import mockData from './mock/livecomments';

const liveComments = mockData.livecomments.slice(0, 5);

describe('LiveComments module', () => {
  it('renders LiveComments', () => {
    expect(shallow(<LiveComments livecomments={liveComments} labelPlayButton="playButtonText" />)).toMatchSnapshot();
  });
});
