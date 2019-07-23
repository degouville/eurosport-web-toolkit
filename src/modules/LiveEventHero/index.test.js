import React from 'react';
import { shallow } from 'enzyme';
import LiveEventHero from '.';

describe('Live Event Hero', () => {
  const makeProps = newProps => ({
    title: 'ROLAND GARROS',
    subtitle: '3RD ROUND',
    ...newProps,
  });

  it('should render as expected', () => {
    const wrapper = shallow(<LiveEventHero {...makeProps()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
