import React from 'react';
import { mount } from 'enzyme';
import Carousel from './index';

const initialState = {
  left: 0,
  slides: [
    { position: 0, width: 500, slideId: 0 },
    { position: 500, width: 500, slideId: 1 },
    { position: 1000, width: 500, slideId: 2 },
    { position: 1500, width: 500, slideId: 3 },
    { position: 2000, width: 500, slideId: 4 },
    { position: 2500, width: 500, slideId: 5 },
  ],
  slideId: 0,
  wrapperWidth: 2000,
  trackWidth: 3000,
};

const initialSlides = (
  <Carousel>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
  </Carousel>
);

describe('Carousel test', () => {
  it('must render the carousel', () => {
    expect(mount(initialSlides)).toMatchSnapshot();
  });

  it('slide with arrow', () => {
    const wrapper = mount(initialSlides);
    wrapper.setState(initialState);
    wrapper.setState({ disableNavigation: false });
    // Next slide
    wrapper.instance().slide();
    expect(wrapper.state().left).toEqual(-500);
    expect(wrapper.state().slideId).toEqual(1);
    // Next slide
    wrapper.instance().slide();
    expect(wrapper.state().left).toEqual(-1000);
    expect(wrapper.state().slideId).toEqual(2);
    // Previous slide
    wrapper.instance().slide(true);
    expect(wrapper.state().left).toEqual(-500);
    expect(wrapper.state().slideId).toEqual(1);
    // Previous slide
    wrapper.instance().slide(true);
    expect(wrapper.state().left).toEqual(-0);
    expect(wrapper.state().slideId).toEqual(0);
    // Previous slide
    wrapper.instance().slide(true);
    expect(wrapper.state().left).toEqual(-0);
    expect(wrapper.state().slideId).toEqual(0);
  });
});
