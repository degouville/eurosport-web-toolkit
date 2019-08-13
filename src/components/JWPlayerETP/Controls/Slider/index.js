import React from 'react';
import RCSlider from 'rc-slider';
import PropTypes from 'prop-types';

const getHandleStyle = ({ handleSize, railThickness, handleColor }) => ({
  borderColor: 'transparent',
  height: handleSize,
  width: handleSize,
  backgroundColor: handleColor,
  margin: -(handleSize / 2) + railThickness / 2,
});

const getBarStyle = ({ backgroundColor, railThickness, vertical }) => {
  if (vertical) return { backgroundColor, width: railThickness };
  return { backgroundColor, height: railThickness };
};

const Slider = ({
  value,
  onChange,
  defaultValue,
  min,
  max,
  vertical,
  railThickness,
  railColor,
  handleSize,
  handleColor,
  trackColor,
}) => (
  <RCSlider
    defaultValue={defaultValue}
    onChange={onChange}
    vertical={vertical}
    trackStyle={getBarStyle({ backgroundColor: trackColor, railThickness, vertical })}
    handleStyle={getHandleStyle({ handleSize, railThickness, handleColor })}
    railStyle={getBarStyle({ backgroundColor: railColor, railThickness, vertical })}
    value={value}
    min={min}
    max={max}
  />
);

Slider.propTypes = {
  // Values
  // eslint-disable-next-line react/forbid-prop-types
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.number.isRequired,

  // Theme
  vertical: PropTypes.bool.isRequired,
  railThickness: PropTypes.number.isRequired,
  railColor: PropTypes.string.isRequired,
  handleSize: PropTypes.number.isRequired,
  handleColor: PropTypes.string.isRequired,
  trackColor: PropTypes.string.isRequired,
};

export default Slider;
