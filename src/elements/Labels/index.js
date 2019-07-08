import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import {
  coreNeutral9,
  coreLightMinus1,
  coreNeutral4,
  royalBlue,
  utahCrimson,
  dodgerBlue,
  brandBase,
} from '../../colors';
import { fontHelvetica } from '../../typography';
import * as breakpoints from '../../breakpoints';

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

  ${props =>
    props.isSimpleMode &&
    css`
      color: ${coreLightMinus1};
      font-size: 8px;
      line-height: 11px;
      letter-spacing: 0.41px;
    `}}

  ${props =>
    props.isSimpleMode &&
    breakpoints.small(
      css`
        color: ${coreLightMinus1};
        font-size: 11px;
        line-height: 13px;
        letter-spacing: 0.5px;
      `
    )}
`;

export const StyledLabelSimple = styled.div`
  text-transform: uppercase;
  font-weight: 300;

  &::after {
    display: inline-block;
    content: '/';
    margin: 0 0.5em;
    color: ${coreNeutral4};
  }

  &:last-child {
    &::after {
      display: none;
    }
  }
`;

export const StyledLabel = styled.div`
  display: flex;
  ${fontHelvetica};
  font-size: 9.6px;
  line-height: 27px;
  height: 25px;
  letter-spacing: 0.8px;
  padding: 0 12px;
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

   ${breakpoints.medium(css`
     font-size: 12px;
     line-height: 30px;
     height: 28px;
     letter-spacing: 1px;
     padding: 0 15px;
   `)};
`;

const StyledLabelIcon = styled.div`
  font-size: 18px;
  margin-right: 2px;
`;

const Labels = ({ labels, isSimpleMode }) => {
  const LabelComponent = isSimpleMode ? StyledLabelSimple : StyledLabel;

  return (
    <StyledLabels isSimpleMode={isSimpleMode}>
      {labels.map((label, index) => (
        <LabelComponent
          color={label.color}
          bold={label.bold}
          key={label.text + label.color}
          layer={labels.length - index}
        >
          {label.icon && <StyledLabelIcon>{label.icon}</StyledLabelIcon>}
          {label.text}
        </LabelComponent>
      ))}
    </StyledLabels>
  );
};

export const labelsType = PropTypes.arrayOf(
  PropTypes.shape({
    text: PropTypes.string.isRequired,
    color: PropTypes.oneOf(Object.keys(colorsMapping)),
    bold: PropTypes.bool,
    icon: PropTypes.string,
  })
);

Labels.defaultProps = {
  isSimpleMode: false,
};

Labels.propTypes = {
  labels: labelsType.isRequired,
  isSimpleMode: PropTypes.bool,
};

export default Labels;
