import { shallow } from 'enzyme/build';
import React from 'react';

import SeoText from '.';

describe('SeoText', () => {
  it('renders SeoText', () => {
    expect(shallow(<SeoText title="title" subtitle="subtitle" content="content" />)).toMatchSnapshot();
  });
});
