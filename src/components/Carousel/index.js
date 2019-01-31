import React from 'react';
import styled, { css } from 'react-emotion';
import Swipeable from 'react-swipeable';
import PropTypes from 'prop-types';
import * as breakpoints from '../../breakpoints';
import { ReactComponent as Chevron } from '../../assets/chevron.svg';

const StyledWrapper = styled.div`
  display: flex;
`;

const StyledContainer = styled.div`
  overflow: hidden;
  margin: 0 8px;
`;

const StyledSlidesTrack = styled.div`
  position: relative;
  top: 0;
  left: ${props => props.left}px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: ${props => props.trackWidth}px;
  transition: left 200ms ease-out;
`;

const StyledSlide = styled.div`
  display: block;
  float: left;
  width: auto;
  margin-right: ${props => props.margin}px;
  &:last-of-type {
    margin-right: 0;
  }
`;

const StyledArrow = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  width: 36px;
  margin: 0 1px;
  flex: 0 0 36px;
  border-radius: 0px 2px 2px 0px;
  height: 76px;

  ${breakpoints.large(css`
    display: flex;
    height: 88px;
  `)};
  &:hover {
    cursor: pointer;
  }
`;

const StyledArrowLeft = styled(StyledArrow)`
  transform: scaleX(-1);
`;

const StyledChevron = styled(Chevron)`
  height: 16px;
  width: 11px;
  path {
    fill: rgba(255, 255, 255, 0.7);
  }
`;

export default class Carousel extends React.Component {
  state = {
    left: 0,
    currentSlide: 0,
    trackWidth: 0,
  };

  wrapperRef = React.createRef();

  slidesTrackRef = React.createRef();

  componentDidMount() {
    setTimeout(() => this.calculateElementsSizes(), 200);
    window.addEventListener('resize', this.calculateElementsSizes);
  }

  getSlidesInformations(children) {
    const { slideMargin } = this.props;
    let position = 0;
    return Array.from(children).reduce((slides, slide) => {
      const slideInfo = {
        width: slide.offsetWidth + slideMargin,
        position,
      };
      position += slideInfo.width;
      return [...slides, slideInfo];
    }, []);
  }

  static getTrackWidth(slides) {
    return slides.reduce((sum, slide) => sum + slide.width, 0);
  }

  calculateElementsSizes = () => {
    const slides = this.getSlidesInformations(this.slidesTrackRef.current.children);
    this.setState({
      trackWidth: Carousel.getTrackWidth(slides),
    });
    this.setState({
      slides,
      wrapperWidth: this.wrapperRef.current.offsetWidth,
    });
  };

  isInRange(x) {
    const { trackWidth, wrapperWidth, slides } = this.state;
    return x > 0 || x < wrapperWidth - slides[slides.length - 1].width - trackWidth;
  }

  /**
   * Calculate the new left position according to the swipe force and avoid it to go behind the limits
   * @param deltaX
   * @param velocity
   */
  handleSwipe(deltaX, velocity) {
    let { left } = this.state;
    left += ((deltaX * -1) / 5) * velocity;
    if (!this.isInRange(left)) {
      this.setState({ left });
    }
  }

  /**
   * Calculate a new left position to have a "magnetic" effect on the slides
   * @param deltaX
   */
  lockSlides(deltaX) {
    const { slides } = this.state;
    let { left, currentSlide } = this.state;
    slides.forEach((slide, index) => {
      if (Math.abs(left) >= slide.position && Math.abs(left) <= slide.position + slide.width) {
        const ratio = (left * -1 - slide.position) / slide.width;
        const limit = deltaX > 0 ? 0.2 : 0.8;
        if (ratio > limit) {
          left = slides[index + 1].position * -1;
          currentSlide += 1;
        } else {
          left = slide.position * -1;
          currentSlide = index;
        }
        this.setState({ left, currentSlide });
      }
    });
  }

  /**
   * Go to the next slide or previous slide and avoid to go behind the carousel limits
   * @param inverted
   */
  slide(inverted = false) {
    const { slides } = this.state;
    let { left, currentSlide } = this.state;
    if (inverted && slides[currentSlide - 1]) {
      left += slides[currentSlide - 1].width;
      currentSlide -= 1;
    } else if (!inverted) {
      left += slides[currentSlide].width * -1;
      currentSlide += 1;
    }
    if (!this.isInRange(left)) {
      this.setState({
        left,
        currentSlide,
      });
    }
  }

  render() {
    const { children, slideMargin } = this.props;
    const { left, trackWidth } = this.state;
    return (
      <StyledWrapper>
        <StyledArrowLeft onClick={() => this.slide(true)}>
          <StyledChevron />
        </StyledArrowLeft>
        <StyledContainer innerRef={this.wrapperRef}>
          <Swipeable
            onSwiping={(e, deltaX, deltaY, absX, absY, velocity) => this.handleSwipe(deltaX, velocity)}
            onSwiped={(e, deltaX) => this.lockSlides(deltaX)}
          >
            <StyledSlidesTrack innerRef={this.slidesTrackRef} left={left} trackWidth={trackWidth}>
              {children.map((child, index) => (
                /* eslint-disable-next-line react/no-array-index-key */
                <StyledSlide key={index} margin={slideMargin}>
                  {child}
                </StyledSlide>
              ))}
            </StyledSlidesTrack>
          </Swipeable>
        </StyledContainer>
        <StyledArrow onClick={() => this.slide()}>
          <StyledChevron />
        </StyledArrow>
      </StyledWrapper>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.node,
  slideMargin: PropTypes.number,
};

Carousel.defaultProps = {
  children: null,
  slideMargin: 8,
};