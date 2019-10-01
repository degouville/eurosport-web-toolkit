import React from 'react';
import { shallow } from 'enzyme';
import ShareIcons from '.';

const icons = [
  { icon: 'facebook', size: 32, onClick: () => {} },
  { icon: 'twitter', size: 32, onClick: () => {} },
  { icon: 'whatsapp', size: 32, onClick: () => {} },
];

describe('Footer', () => {
  it('renders when everything passed in', () => {
    expect(shallow(<ShareIcons labelIcon icons={icons} label="share" />)).toMatchSnapshot();
  });

  it('renders without label', () => {
    expect(shallow(<ShareIcons labelIcon icons={icons} />)).toMatchSnapshot();
  });

  it('renders with no label share icon', () => {
    expect(shallow(<ShareIcons icons={icons} />)).toMatchSnapshot();
  });
});
