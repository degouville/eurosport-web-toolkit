import React from 'react';
import { shallow } from 'enzyme';
import PlayIcon, { StyledPlayImageSmall } from '.';

describe.only('PlayIcon', () => {
  it('should render default icon', () => {
    const wrapper = shallow(<PlayIcon className="test" height={50} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should apply icon height passed in through props', () => {
    const wrapper = shallow(<PlayIcon height={100} />);
    expect(wrapper).toHaveStyleRule('height', '100px');
  });

  it('should calculate the correct padding based off passed in height', () => {
    const wrapper = shallow(<PlayIcon height={100} />);
    expect(wrapper).toHaveStyleRule('padding', `${(100 * 0.45) / 2}px`);
  });

  it('should not output wrapper when isRounded=false', () => {
    const wrapper = shallow(<PlayIcon isRounded={false} />);
    expect(wrapper.is(StyledPlayImageSmall)).toEqual(true);
  });
});
