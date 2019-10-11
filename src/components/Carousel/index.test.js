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

  describe('getValidSlideId', () => {
    it('should return original slide id', () => {
      // Given
      const slideId = 4;
      const wrapper = mount(initialSlides);
      wrapper.setState(initialState);

      // When
      const validSlideId = wrapper.instance().getValidSlideId(slideId);

      // Expect
      expect(validSlideId).toBe(slideId);
    });

    it('should return slide id 5', () => {
      // Given
      const slideId = 7;
      const wrapper = mount(initialSlides);
      wrapper.setState(initialState);

      // When
      const validSlideId = wrapper.instance().getValidSlideId(slideId);

      // Expect
      expect(validSlideId).toBe(5);
    });
  });

  describe('handleMouseUp', () => {
    it('should call onTrackMoveEnd method ', () => {
      // Given
      const event = new Event('mouseup');
      const wrapper = mount(initialSlides);
      wrapper.setState(initialState);
      wrapper.instance().onTrackMoveEnd = jest.fn();

      // When
      wrapper.instance().handleMouseUp(event);

      // Expect
      expect(wrapper.instance().onTrackMoveEnd).toHaveBeenCalledWith(event);
    });
  });

  describe('handleTouchEndOnWindow', () => {
    it('should call lockSlides method ', () => {
      // Given
      const wrapper = mount(initialSlides);
      wrapper.setState(initialState);
      wrapper.instance().lockSlides = jest.fn();

      // When
      wrapper.instance().handleTouchEndOnWindow();

      // Expect
      expect(wrapper.instance().lockSlides).toHaveBeenCalled();
    });
  });

  describe('handleMouseDown', () => {
    it('should call onTrackMoveStart method ', () => {
      // Given
      const event = new Event('mousedown');
      const wrapper = mount(initialSlides);
      wrapper.setState(initialState);
      wrapper.instance().onTrackMoveStart = jest.fn();

      // When
      wrapper.instance().handleMouseDown(event);

      // Expect
      expect(wrapper.instance().onTrackMoveStart).toHaveBeenCalledWith(event);
    });
  });

  describe('handleMouseMove', () => {
    it('should call onTrackMove method ', () => {
      // Given
      const event = new Event('mousemove');
      const wrapper = mount(initialSlides);
      wrapper.setState(initialState);
      wrapper.instance().onTrackMove = jest.fn();

      // When
      wrapper.instance().handleMouseMove(event);

      // Expect
      expect(wrapper.instance().onTrackMove).toHaveBeenCalledWith(event);
    });
  });

  describe('handleMouseUpOnWindow', () => {
    it('should call lockSlides method ', () => {
      // Given
      const wrapper = mount(initialSlides);
      wrapper.setState(initialState);
      wrapper.instance().lockSlides = jest.fn();

      // When
      wrapper.instance().handleMouseUpOnWindow();

      // Expect
      expect(wrapper.instance().lockSlides).toHaveBeenCalled();
    });
  });

  describe('handleTouchEnd', () => {
    it('should call onTrackMoveEnd method ', () => {
      // Given
      const event = new Event('touchend');
      const wrapper = mount(initialSlides);
      wrapper.setState(initialState);
      wrapper.instance().onTrackMoveEnd = jest.fn();

      // When
      wrapper.instance().handleTouchEnd(event);

      // Expect
      expect(wrapper.instance().onTrackMoveEnd).toHaveBeenCalledWith(event);
    });
  });

  describe('handleTouchMove', () => {
    it('should call onTrackMove method ', () => {
      // Given
      const event = new Event('touchmove');
      const wrapper = mount(initialSlides);
      wrapper.setState(initialState);
      wrapper.instance().onTrackMove = jest.fn();

      // When
      wrapper.instance().handleTouchMove(event);

      // Expect
      expect(wrapper.instance().onTrackMove).toHaveBeenCalledWith(event);
    });
  });

  describe('handleTouchStart', () => {
    it('should call onTrackMoveStart method ', () => {
      // Given
      const event = new Event('touchstart');
      const wrapper = mount(initialSlides);
      wrapper.setState(initialState);
      wrapper.instance().onTrackMoveStart = jest.fn();

      // When
      wrapper.instance().handleTouchStart(event);

      // Expect
      expect(wrapper.instance().onTrackMoveStart).toHaveBeenCalledWith(event);
    });
  });

  describe('lockSlides', () => {
    it('should call setTrackPosition', () => {
      // Given
      const wrapper = mount(initialSlides);
      wrapper.setState({ ...initialState, disableNavigation: false });
      wrapper.instance().setTrackPosition = jest.fn();
      wrapper.instance().coords.deltaX = jest.fn().mockReturnValue(100);

      // When
      wrapper.instance().lockSlides();

      // Expect
      expect(wrapper.instance().setTrackPosition).toHaveBeenCalled();
    });
  });

  describe('onTrackMove', () => {
    it('should not fill x2 coordinate when navigation is disabled', () => {
      // Given
      const event = new Event('touchmove');
      const wrapper = mount(initialSlides);
      wrapper.setState({ ...initialState, disableNavigation: true });

      event.touches = [
        {
          clientX: 50,
        },
      ];

      // When
      wrapper.instance().onTrackMove(event);

      // Expect
      expect(wrapper.instance().coords.x2).not.toBe(50);
    });

    it('should fill x2 coordinate when navigation is enabled', () => {
      // Given
      const event = new Event('touchmove');
      const wrapper = mount(initialSlides);
      wrapper.setState({ ...initialState, disableNavigation: false });

      event.touches = [
        {
          clientX: 200,
        },
      ];

      // When
      wrapper.instance().onTrackMove(event);

      // Expect
      expect(wrapper.instance().coords.x2).toBe(200);
    });
  });

  describe('onTrackMoveEnd', () => {
    it('should call lockSlides method ', () => {
      // Given
      const event = new Event('touchmove');
      const wrapper = mount(initialSlides);
      wrapper.setState(initialState);
      wrapper.instance().lockSlides = jest.fn();

      // When
      wrapper.instance().onTrackMoveEnd(event);

      // Expect
      expect(wrapper.instance().lockSlides).toHaveBeenCalled();
    });
  });

  describe('onTrackMoveStart', () => {
    it('should fill x1 and x2 coordinates', () => {
      // Given
      const event = new Event('touchmove');
      const wrapper = mount(initialSlides);
      wrapper.setState(initialState);

      event.touches = [
        {
          clientX: 100,
        },
      ];

      // When
      wrapper.instance().onTrackMoveStart(event);

      // Expect
      expect(wrapper.instance().coords.x1).toBe(100);
      expect(wrapper.instance().coords.x2).toBe(100);
    });
  });
});
