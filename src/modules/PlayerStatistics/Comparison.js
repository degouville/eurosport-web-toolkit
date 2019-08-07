import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { H6 } from 'src/typography';
import { theme } from 'src';
import * as breakpoints from 'src/breakpoints';
import { setGradient, addPercentMark } from './utils';

const Comparison = ({ title, currentValues, maximumValue, isPercent, id }) => {
  const { one, two } = currentValues;
  const { colorOne, colorTwo } = theme.statistics.comparison;
  const config = { firstValue: one, secondValue: two, maximumValue, colorOne, colorTwo };
  return (
    <StyledComparison gradient={setGradient(config)} key={id}>
      <StyledValue>{addPercentMark(isPercent, one)}</StyledValue>
      <StyledLabel>{title}</StyledLabel>
      <StyledValue>{addPercentMark(isPercent, two)}</StyledValue>
    </StyledComparison>
  );
};

Comparison.propTypes = {
  title: PropTypes.string.isRequired,
  currentValues: PropTypes.shape(PropTypes.object).isRequired,
  maximumValue: PropTypes.number.isRequired,
  isPercent: PropTypes.bool,
  id: PropTypes.shape(PropTypes.any).isRequired,
};

Comparison.defaultProps = {
  isPercent: false,
};

const StyledComparison = styled.li`
  display: flex;
  justify-content: space-around;
  background: ${props => props.theme.statistics.comparison.background};
  background-image: ${({ gradient }) => gradient};
  margin: 0 0 20px 0;
  &:last-of-type {
    margin: 0;
  }
`;

const ValueCommonStyle = css`
  flex: 1;
  text-align: center;
  text-transform: uppercase;
  min-height: 44px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledValue = styled.p`
  ${ValueCommonStyle}
  font-size: 12px;
  ${breakpoints.medium(css`
    font-size: 14px;
  `)}
`;

const StyledLabel = styled(H6)`
  ${ValueCommonStyle}
  flex: 4;
  font-size: 10px;
  ${breakpoints.small(css`
    flex: 2;
  `)}
  ${breakpoints.medium(css`
    font-size: 12px;
    flex: 1;
  `)}
`;

export default Comparison;
