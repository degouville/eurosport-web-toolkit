import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'react-emotion';
import * as colors from '../../colors';

const rotate = keyframes`
to {
    transform: rotate(360deg);
  }
`;

const StyledWrapper = styled.div`
  margin: 10px;
  width: ${props => props.width};
  height: ${props => props.width};
`;

const Spinner = ({ color, width, className }) => (
  <StyledWrapper width={width} className={className}>
    <svg
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
      css={css`
        animation: ${rotate} 2s linear infinite;
      `}
    >
      <circle
        style={{
          fill: 'transparent',
          strokeWidth: 2,
          width: '100%',
          height: '100%',
          strokeDasharray: 170,
          strokeDashoffset: 20,
        }}
        cx="33"
        cy="33"
        r="31"
        stroke="url(#gradient)"
      />
      <linearGradient id="gradient">
        <stop offset="50%" stopColor={color} stopOpacity="1" />
        <stop offset="65%" stopColor={color} stopOpacity="1" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>

      <circle
        style={{ strokeDasharray: 170, strokeDashoffset: 20 }}
        cx="36.8"
        cy="2.3"
        r="0.5"
        fill={color}
        stroke={color}
      />
    </svg>
  </StyledWrapper>
);

Spinner.defaultProps = {
  color: colors.coreLightMinus1,
  className: undefined,
};

Spinner.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Spinner;
