import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { upperFirst } from 'lodash';
import * as breakpoints from '../../breakpoints';

// eslint-disable-next-line react/prop-types
const renderColor = ({ option, ...color }) => {
  const [[name, hex]] = Object.entries(color);
  const isLegacy = name.includes('_');

  // TODO: Remove '❌' after QA
  return (
    <StyledColor hex={hex} option={option} key={name}>
      {isLegacy && '❌'}
      {upperFirst(name)} <StyledHex>{hex}</StyledHex>
    </StyledColor>
  );
};

// eslint-disable-next-line react/prop-types
const renderColors = ([groupName, colors]) => (
  <StyledWrapper key={groupName}>
    <StyledGroupName>{upperFirst(groupName)} colors</StyledGroupName>
    <StyledList>{colors.map(renderColor)}</StyledList>
  </StyledWrapper>
);

const ColorDiff = ({ colors }) => Object.entries(colors).map(renderColors);

ColorDiff.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  colors: PropTypes.object.isRequired,
};

const StyledWrapper = styled.article`
  display: flex;
  flex-direction: column;
  margin: 0 0 3em 0;
  padding: 1em;
  border: dotted #808080;
  ${breakpoints.medium(css`
    flex-direction: row;
  `)};
`;

const StyledList = styled.section`
  flex: 1;
`;

const StyledGroupName = styled.h1`
  color: #808080;
  font-size: 3em;
  font-weight: bold;
  flex: 1;
  margin: 0 0 1em 0;
`;

const StyledColor = styled.p`
  background: ${({ hex }) => hex};
  color: ${({ option: { isDark } }) => (isDark ? '#FFF' : '#000')};
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 1em;
  margin: 0 0.5em 0.5em 0;
`;

const StyledHex = styled.span`
  opacity: 0.5;
`;

export default ColorDiff;
