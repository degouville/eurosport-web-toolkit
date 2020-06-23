import React from 'react';
import { shallow } from 'enzyme';
import PlayIcon from '.';

describe('PlayIcon', () => {
  it('should render default icon', () => {
    const wrapper = shallow(<PlayIcon className="test" height={50} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should display alt text passed in from props', () => {
    const wrapper = shallow(<PlayIcon alt="test-alt" height={50} />);
    expect(wrapper.find('img').prop('alt')).toEqual('test-alt');
  });

  it('should display default alt text when not passed in props', () => {
    const wrapper = shallow(<PlayIcon height={50} />);
    expect(wrapper.find('img').prop('alt')).toEqual('play');
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
    expect(wrapper.type()).toEqual('img');
  });
});
