import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { coreLightMinus1, azureRadiance } from '../../colors';
import { fontInterUi } from '../../typography';

const StyledToggleWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 49px 50%;
  grid-template-rows: auto;
  grid-column-gap: 10px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const StyledLabel = styled.span`
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 1px;
  font-family: ${fontInterUi};
  font-weight: bold;
  ${props => (props.isActive ? `color: ${azureRadiance};` : `color: ${coreLightMinus1};`)}
`;

const StyledSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 26px;
  & > input {
    display: none;
  }
`;

const StyledSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.2);
  &::before {
    position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: ${azureRadiance};
    border-radius: 50%;
    ${props => (props.isSetToLeft ? '' : 'transform: translateX(18px);')}
  }
`;

const Toggle = ({ toggleCallback, isSetToLeft, leftLabel, rightLabel }) => (
  <StyledToggleWrapper>
    <StyledLabel isActive={isSetToLeft} style={{ textAlign: 'right' }}>
      {leftLabel}
    </StyledLabel>
    <StyledSwitch>
      <input type="checkbox" onChange={toggleCallback} />
      <StyledSlider isSetToLeft={isSetToLeft} />
    </StyledSwitch>
    <StyledLabel isActive={!isSetToLeft}>{rightLabel}</StyledLabel>
  </StyledToggleWrapper>
);

Toggle.defaultProps = {
  isSetToLeft: true,
  leftLabel: '',
  rightLabel: '',
};

Toggle.propTypes = {
  toggleCallback: PropTypes.func.isRequired,
  isSetToLeft: PropTypes.bool,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
};

export default Toggle;
