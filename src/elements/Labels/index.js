import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { coreNeutral9, coreLightMinus1, royalBlue, utahCrimson, dodgerBlue, brandBase } from '../../colors';

const colorsMapping = {
  white: {
    text: coreNeutral9,
    background: coreLightMinus1,
  },
  blue: {
    text: coreLightMinus1,
    background: royalBlue,
  },
  red: {
    text: coreLightMinus1,
    background: utahCrimson,
  },
  cyan: {
    text: brandBase,
    background: dodgerBlue,
  },
};

const StyledLabels = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledLabel = styled.div`
  display: flex;
  font-family: Helvetica;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 1px;
  padding: 7px 15px 7px 15px;
  text-transform: uppercase;
  ${props =>
    css`
      z-index: ${props.layer};
    `}
  ${props =>
    props.bold &&
    css`
      font-weight: bold;
    `}
  ${props =>
    props.color &&
    colorsMapping[props.color] &&
    css`
      color: ${colorsMapping[props.color].text};
      background-color: ${colorsMapping[props.color].background};
      position: relative;
      &::after {
        content: '';
        position: absolute;
        right: -2px;
        top: 0;
        display: block;
        width: 4px;
        height: 100%;
        background-color: ${colorsMapping[props.color].background};
        transform: skew(-5deg);
      }
    `}
`;

const StyledLabelIcon = styled.div`
  font-size: 18px;
  margin-right: 2px;
`;

const Labels = ({ labels }) => (
  <StyledLabels>
    {labels.map((label, index) => (
      <StyledLabel color={label.color} bold={label.bold} key={label.text + label.color} layer={labels.length - index}>
        {label.icon && <StyledLabelIcon>{label.icon}</StyledLabelIcon>}
        {label.text}
      </StyledLabel>
    ))}
  </StyledLabels>
);

Labels.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      color: PropTypes.oneOf(Object.keys(colorsMapping)),
      bold: PropTypes.bool,
      icon: PropTypes.string,
    })
  ).isRequired,
};

export default Labels;
