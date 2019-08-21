/* eslint-disable react/sort-comp */
import React from 'react';
import debounce from 'lodash/debounce';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import Chevron from 'src/assets/chevron.component.svg';

const StyledWrapper = styled.div`
  display: flex;
  opacity: 0;
  overflow: hidden;
  position: relative;
  ${props =>
    props.slides.length &&
    css`
      opacity: 1;
      transition: opacity 250ms ease-out;
    `}
`;

export const StyledContainer = styled.div`
  overflow: scroll;
  width: 100%;
  ${props =>
    props.trackWidth &&
    css`
      overflow: hidden;
    `};
  margin: 0 0 0 8px;
`;

const StyledSlidesTrack = styled.div`
  position: relative;
  white-space: nowrap;
  top: 0;
  transform: translateX(${props => props.left}px);
  display: ${props => (props.flex ? 'flex' : 'block')};
  margin-left: auto;
  margin-right: auto;
  width: auto;
  transition: transform 200ms ease-out;
  ${props =>
    props.disableNavigation &&
    props.alignCenter &&
    css`
      display: flex;
      justify-content: center;
    `}
  ${props =>
    props.isDragging &&
    css`
      transition: none;
    `}
  user-select: none;
`;

export const StyledSlide = styled.div`
  display: ${props => (props.flex ? 'flex' : 'inline-block')};
  vertical-align: top;
  width: auto;
  margin-right: ${props => props.margin}px;
  &:last-of-type {
    margin-right: 0;
  }
  &:first-of-type {
    padding-left: ${props => (props.offsetLeft ? props.offsetLeft : 0)};
  }
`;

const StyledChevron = styled(Chevron)`
  height: 16px;
  width: 11px;
  path {
    fill: rgba(255, 255, 255, 0.7);
  }
`;

export const StyledAbsoluteArrowWrapper = styled.div`
  position: absolute;
  right: ${props => props.offsetLeft || 0};
  top: 77px;
  display: flex;
  width: 98px;
  z-index: 2;
`;

export const StyledArrow = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  ${props =>
    !props.absoluteNavigation &&
    css`
      width: 36px;
    `};
  margin: 0 1px;
  flex: ${props => (props.absoluteNavigation ? '0 0 48px;' : '0 0 36px;')};
  border-radius: 0 2px 2px 0;
  height: 76px;

  @media (min-width: ${props => `${props.minWidthArrowDisplaying}px`}) {
    display: flex;
    height: ${props => (props.absoluteNavigation ? '48px;' : '88px;')};
  }

  &:hover {
    cursor: pointer;
  }
`;

export const StyledArrowLeft = styled(StyledArrow)`
  transform: scaleX(-1);
`;

export default class Carousel extends React.Component {
  state = {
    slides: [],
    trackWidth: 0,
    disableNavigation: false,
    left: 0,
    isDragging: false,
    slideId: 0,
  };

  coords = {
    x1: 0,
    x2: 0,
    deltaX() {
      return this.x1 - this.x2;
    },
  };

  isOnTouchDevice = false;

  clickTimestamp = null;

  wrapperRef = React.createRef();

  slidesTrackRef = React.createRef();

  componentDidMount() {
    this.isOnTouchDevice = this.isTouchDevice();
    this.calculateElementsSizes();
    this.onWindowResize = debounce(() => this.calculateElementsSizes(), 250);

    window.addEventListener('resize', this.onWindowResize);
    if (this.isOnTouchDevice) {
      this.slidesTrackRef.current.addEventListener('touchstart', this.handleTouchStart, false);
      this.slidesTrackRef.current.addEventListener('touchend', this.handleTouchEnd, false);
      window.addEventListener('touchend', this.handleTouchEndOnWindow, false);
    } else {
      this.slidesTrackRef.current.addEventListener('mousedown', this.handleMouseDown, false);
      this.slidesTrackRef.current.addEventListener('mouseup', this.handleMouseUp, false);
      window.addEventListener('mouseup', this.handleMouseUpOnWindow, false);
    }

    this.slidesTrackRef.current.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
    this.slidesTrackRef.current.removeEventListener('touchstart', this.handleTouchStart);
    this.slidesTrackRef.current.removeEventListener('touchend', this.handleTouchEnd);
    this.slidesTrackRef.current.removeEventListener('touchmove', this.handleTouchMove);
    this.slidesTrackRef.current.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handleMouseUpOnWindow);
    window.removeEventListener('touchend', this.handleTouchEndOnWindow);
    this.slidesTrackRef.current.removeEventListener('mousemove', this.handleMouseMove);
    this.slidesTrackRef.current.removeEventListener('click', this.handleClick);
  }

  isTouchDevice = () => 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

  getXCoordFromEvent = e => {
    if (e.touches && e.touches[0]) {
      return e.touches[0].clientX;
    }

    return e.clientX;
  };

  onTrackMoveStart = e => {
    const x = this.getXCoordFromEvent(e);
    this.clickTimestamp = new Date();
    this.coords.x1 = x;
    this.coords.x2 = x;
  };

  onTrackMoveEnd = e => {
    this.setState({ isDragging: false });
    const newX2 = this.getXCoordFromEvent(e);

    // during touch end event we don't receive the touch coord and newX2 will be undefined
    // thus if undefined - we treat last x2 position as valid one
    if (!this.isOnTouchDevice) {
      this.coords.x2 = newX2;
    }

    this.lockSlides();
  };

  onTrackMove = e => {
    const { disableNavigation } = this.state;
    if (disableNavigation) return;
    e.preventDefault();
    const { x2 } = this.coords;
    const x = this.getXCoordFromEvent(e);

    this.setState(state => ({
      left: state.left - (x2 - x),
      isDragging: true,
    }));

    this.coords.x2 = x;
  };

  handleTouchStart = e => {
    this.onTrackMoveStart(e);
    this.slidesTrackRef.current.addEventListener('touchmove', this.handleTouchMove, false);
  };

  handleTouchEnd = e => {
    this.onTrackMoveEnd(e);
    this.slidesTrackRef.current.removeEventListener('touchmove', this.handleTouchMove);
  };

  handleTouchMove = e => {
    this.onTrackMove(e);
  };

  handleMouseDown = e => {
    this.onTrackMoveStart(e);
    this.slidesTrackRef.current.addEventListener('mousemove', this.handleMouseMove, false);
  };

  handleMouseUp = e => {
    this.onTrackMoveEnd(e);
    this.slidesTrackRef.current.removeEventListener('mousemove', this.handleMouseMove);
  };

  handleMouseUpOnWindow = () => {
    this.slidesTrackRef.current.removeEventListener('mousemove', this.handleMouseMove);
    this.slidesTrackRef.current.removeEventListener('touchmove', this.handleMouseMove);
    this.lockSlides();
    this.setState({ isDragging: false });
  };

  handleTouchEndOnWindow = () => {
    this.slidesTrackRef.current.removeEventListener('touchmove', this.handleMouseMove);
    this.lockSlides();
    this.setState({ isDragging: false });
  };

  handleMouseMove = e => {
    this.onTrackMove(e);
  };

  handleClick = e => {
    if (new Date() - this.clickTimestamp > 150 && Math.abs(this.coords.x1 - this.getXCoordFromEvent(e)) > 20) {
      e.preventDefault();
    }
  };

  getValidSlideId(slideId) {
    const { slides } = this.state;

    if (slideId >= slides.length) {
      return slides.length - 1;
    }

    if (slideId < 0) return 0;

    return slideId;
  }

  calculateElementsSizes = () => {
    const slides = this.getSlidesInformation(this.slidesTrackRef.current.children);
    const wrapperOffsetWidth = this.wrapperRef.current.offsetWidth;
    const trackWidth = this.slidesTrackRef.current.scrollWidth;
    const shouldDisable = trackWidth <= wrapperOffsetWidth;

    this.setState({
      left: 0,
      slideId: 0,
      slides,
      trackWidth,
      wrapperWidth: wrapperOffsetWidth,
      disableNavigation: shouldDisable,
    });
  };

  /**
   * Calculate a new left position to have a "magnetic" effect on the slides
   * @param deltaX
   */
  lockSlides() {
    const { magneticMin, magneticMax } = this.props;
    const { slides, left, disableNavigation } = this.state;
    const deltaX = this.coords.deltaX();

    if (disableNavigation || deltaX === 0) return;

    let slideToLock = slides.find(
      slide => Math.abs(left) >= slide.position && Math.abs(left) <= slide.position + slide.width
    );

    if (slideToLock !== undefined) {
      const nextSlide = slides.find(s => s.slideId > slideToLock.slideId);

      const ratio = (left * -1 - slideToLock.position) / slideToLock.width;
      const limit = deltaX > 0 ? magneticMin : magneticMax;
      if (ratio > limit) {
        slideToLock = nextSlide || slideToLock;
      }

      this.setTrackPosition(slideToLock);
    }
  }

  getSlidesInformation(children) {
    const { slideMargin } = this.props;
    let position = 0;

    let slideId = 0;
    return Array.from(children).reduce((slides, slide) => {
      if (slide.offsetWidth === 0) {
        return slides;
      }
      const slideInfo = {
        width: slide.offsetWidth + slideMargin,
        position,
        slideId,
      };
      position += slideInfo.width;
      slideId += 1;
      return [...slides, slideInfo];
    }, []);
  }

  setTrackPosition = ({ position: newSlidePosition, slideId: newSlideId }) => {
    const { trackWidth, wrapperWidth, left, slides, disableNavigation } = this.state;

    if (disableNavigation) return;

    let lastSlide = slides.find(({ position }) => position + wrapperWidth > trackWidth);

    if (lastSlide === undefined) {
      lastSlide = slides[slides.length - 1];
    }
    if (newSlideId >= lastSlide.slideId && this.checkSlideOutOfScrollRight(newSlideId)) {
      this.setState({
        left: -(trackWidth - wrapperWidth),
        slideId: lastSlide.slideId,
      });

      return;
    }

    if (left > 0) {
      this.setState(({ slides: stateSlides }) => ({
        left: stateSlides[0].position,
        slideId: stateSlides[0].slideId,
      }));

      return;
    }

    this.setState({
      left: -newSlidePosition,
      slideId: newSlideId,
    });
  };

  checkSlideOutOfScrollRight(slideId) {
    const { wrapperWidth, trackWidth, slides } = this.state;
    const { position, width } = slides.find(s => s.slideId === slideId);
    return position + width + wrapperWidth > trackWidth;
  }

  /**
   * Go to the next slide or previous slide and avoid to go behind the carousel limits
   * @param inverted
   */
  slide(inverted = false) {
    const { slides, slideId } = this.state;

    const nextSlideIndex = this.getValidSlideId(inverted ? slideId - 1 : slideId + 1);
    const nextSlide = slides.find(s => s.slideId === nextSlideIndex);

    if (nextSlide !== undefined) {
      this.setTrackPosition(nextSlide);
    }
  }

  nextSlide = () => {
    this.slide();
  };

  previousSlide = () => {
    this.slide(true);
  };

  render() {
    const {
      children,
      slideMargin,
      className,
      withArrow,
      alignCenter,
      flex,
      absoluteNavigation,
      offsetLeft,
      minWidthArrowDisplaying,
    } = this.props;
    const { left, trackWidth, disableNavigation, slides, isDragging } = this.state;
    const defaultNavigationEnabled = !disableNavigation && !absoluteNavigation && withArrow;
    const absoluteNavigationEnabled = !disableNavigation && absoluteNavigation && withArrow;

    return (
      <StyledWrapper className={className} slides={slides} data-test="carousel">
        {absoluteNavigationEnabled && (
          <StyledAbsoluteArrowWrapper offsetLeft={offsetLeft}>
            <StyledArrowLeft
              onClick={this.previousSlide}
              data-test="carousel-arrow-left"
              absoluteNavigation
              minWidthArrowDisplaying={minWidthArrowDisplaying}
            >
              <StyledChevron />
            </StyledArrowLeft>
            <StyledArrow
              onClick={this.nextSlide}
              data-test="carousel-arrow-right"
              absoluteNavigation
              minWidthArrowDisplaying={minWidthArrowDisplaying}
            >
              <StyledChevron />
            </StyledArrow>
          </StyledAbsoluteArrowWrapper>
        )}
        {defaultNavigationEnabled && (
          <StyledArrowLeft
            onClick={this.previousSlide}
            data-test="carousel-arrow-left"
            minWidthArrowDisplaying={minWidthArrowDisplaying}
          >
            <StyledChevron />
          </StyledArrowLeft>
        )}
        <StyledContainer trackWidth={trackWidth} innerRef={this.wrapperRef}>
          <StyledSlidesTrack
            innerRef={this.slidesTrackRef}
            left={left}
            trackWidth={trackWidth}
            isDragging={isDragging}
            data-test="carousel-slider"
            alignCenter={alignCenter}
            disableNavigation={disableNavigation}
            flex={flex}
          >
            {children.map((child, index) => (
              <StyledSlide
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                margin={slideMargin}
                data-test={`carousel-item-${index}`}
                flex={flex}
                offsetLeft={offsetLeft}
              >
                {child}
              </StyledSlide>
            ))}
          </StyledSlidesTrack>
        </StyledContainer>
        {defaultNavigationEnabled && (
          <StyledArrow
            onClick={this.nextSlide}
            data-test="carousel-arrow-right"
            minWidthArrowDisplaying={minWidthArrowDisplaying}
          >
            <StyledChevron />
          </StyledArrow>
        )}
      </StyledWrapper>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.node,
  slideMargin: PropTypes.number,
  className: PropTypes.string,
  withArrow: PropTypes.bool,
  alignCenter: PropTypes.bool,
  flex: PropTypes.bool,
  magneticMin: PropTypes.number,
  magneticMax: PropTypes.number,
  absoluteNavigation: PropTypes.bool,
  offsetLeft: PropTypes.string,
  minWidthArrowDisplaying: PropTypes.number,
};

Carousel.defaultProps = {
  children: null,
  slideMargin: 8,
  className: '',
  withArrow: true,
  alignCenter: false,
  flex: false,
  magneticMin: 0.2,
  magneticMax: 0.8,
  absoluteNavigation: false,
  offsetLeft: '0',
  minWidthArrowDisplaying: 900,
};
