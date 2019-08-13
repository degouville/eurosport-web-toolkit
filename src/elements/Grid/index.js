import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import * as breakpoints from '../../breakpoints';

// ratio is the content width in percent plus 2 half gaps (so one gap) because of negative margins on the row
const grid = {
  tiny: {
    ratio: 100 / (89.86 + 5.07),
    gutter: 5.07,
    get gap() {
      return 5.07 * this.ratio;
    },
    get columnSize() {
      return 10.75 * this.ratio;
    },
    columns: 6,
    type: '%',
  },
  small: {
    ratio: 100 / (91.12 + 4.44),
    gutter: 4.44,
    get gap() {
      return 4.44 * this.ratio;
    },
    get columnSize() {
      return 11.48 * this.ratio;
    },
    columns: 6,
    type: '%',
  },
  medium: {
    ratio: 100 / (91.41 + 2.34),
    gutter: 4.3,
    get gap() {
      return 2.34 * this.ratio;
    },
    get columnSize() {
      return 5.47 * this.ratio;
    },
    columns: 12,
    type: '%',
  },
  large: {
    gap: 20,
    gutter: 'auto',
    columnSize: 62,
    columns: 12,
    width: 964,
    type: 'px',
  },
  wide: {
    gap: 19,
    gutter: 'auto',
    columnSize: 90,
    columns: 12,
    width: 1289,
    type: 'px',
  },
};

const SIX_COLUMNS = ['1', '2', '3', '4', '5', '6', 'full'];
const TWELVE_COLUMNS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'full'];
const SIX_OFFSETS = ['0', '1', '2', '3', '4', '5'];
const TWELVE_OFFSETS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

export const getWidthString = (colNumber, size) => {
  const width = colNumber * grid[size].columnSize + (colNumber - 1) * grid[size].gap + grid[size].gap;
  return `width: ${width + grid[size].type};`;
};

export const getOffset = (offset, size) => {
  const width = offset * grid[size].columnSize + offset * grid[size].gap;
  return `margin-left: ${width + grid[size].type};`;
};

export const getContainerStyles = size => {
  const marginValue = grid[size].gutter + grid[size].type;
  const margin =
    grid[size].gutter === 'auto'
      ? `margin-left: auto;margin-right: auto;`
      : `margin-left: ${marginValue};margin-right: ${marginValue};`;
  const width = grid[size].width ? `width: ${grid[size].width + grid[size].type};` : '';

  return `${margin}${width}`;
};

const getHalfGap = (size, negative = false) => {
  const { gap } = grid[size];
  return negative ? gap / -2 : gap / 2;
};

export const getColumnStyles = (colNumber, offset, size) => {
  const columns = colNumber === 'full' ? grid[size].columns : colNumber;
  const width = getWidthString(columns, size);
  const offsetStyle = getOffset(offset, size);
  const padding = `padding: 0 ${getHalfGap(size)}${grid[size].type};`;
  return `${width}${offsetStyle}${padding}`;
};

export const Container = styled.div`
  ${getContainerStyles('tiny')};

  ${breakpoints.small(css`
    ${getContainerStyles('small')};
  `)};

  ${breakpoints.medium(css`
    ${getContainerStyles('medium')};
  `)};

  ${breakpoints.large(css`
    ${getContainerStyles('large')};
  `)};

  ${breakpoints.wide(css`
    ${getContainerStyles('wide')};
  `)};
`;

const getSubContainerMargin = size => `margin: 0 ${getHalfGap(size, true)}${grid[size].type};`;

const StyledSubContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${getSubContainerMargin('tiny')}
  ${breakpoints.small(css`
    ${getSubContainerMargin('small')}
  `)};

  ${breakpoints.medium(css`
    ${getSubContainerMargin('medium')};
  `)};

  ${breakpoints.large(css`
    ${getSubContainerMargin('large')};
  `)};

  ${breakpoints.wide(css`
    ${getSubContainerMargin('wide')};
  `)};
`;

export const Row = ({ children, ...props }) => (
  <Container {...props}>
    <StyledSubContainer>{children}</StyledSubContainer>
  </Container>
);
Row.defaultProps = {
  children: null,
};
Row.propTypes = {
  children: PropTypes.node,
};

export const StyledColumn = styled.div`
  box-sizing: border-box;
  ${({ tiny, small, medium, large, wide, tinyOffset, smallOffset, mediumOffset, largeOffset, wideOffset }) => css`
    ${getColumnStyles(tiny, tinyOffset, 'tiny')};

    ${breakpoints.small(css`
      ${getColumnStyles(small, smallOffset, 'small')};
    `)};

    ${breakpoints.medium(css`
      ${getColumnStyles(medium, mediumOffset, 'medium')};
    `)};

    ${breakpoints.large(css`
      ${getColumnStyles(large, largeOffset, 'large')};
    `)};

    ${breakpoints.wide(css`
      ${getColumnStyles(wide, wideOffset, 'wide')};
    `)};
  `};
`;

export const Column = props => {
  const {
    children,
    tiny,
    small,
    medium,
    large,
    wide,
    tinyOffset,
    smallOffset,
    mediumOffset,
    largeOffset,
    wideOffset,
    ...rest
  } = props;

  const newProps = {
    tiny,
    tinyOffset,
  };

  newProps.small = small || newProps.tiny;
  newProps.medium = medium || newProps.small;
  newProps.large = large || newProps.medium;
  newProps.wide = wide || newProps.large;

  newProps.smallOffset = smallOffset || newProps.tinyOffset;
  newProps.mediumOffset = mediumOffset || newProps.smallOffset;
  newProps.largeOffset = largeOffset || newProps.mediumOffset;
  newProps.wideOffset = wideOffset || newProps.largeOffset;

  return (
    <StyledColumn {...newProps} {...rest}>
      {children}
    </StyledColumn>
  );
};

Column.defaultProps = {
  children: null,
  tiny: 'full',
  small: null,
  medium: null,
  large: null,
  wide: null,
  tinyOffset: '0',
  smallOffset: null,
  mediumOffset: null,
  largeOffset: null,
  wideOffset: null,
};

Column.propTypes = {
  children: PropTypes.node,
  tiny: PropTypes.oneOf(SIX_COLUMNS),
  small: PropTypes.oneOf(SIX_COLUMNS),
  medium: PropTypes.oneOf(TWELVE_COLUMNS),
  large: PropTypes.oneOf(TWELVE_COLUMNS),
  wide: PropTypes.oneOf(TWELVE_COLUMNS),
  tinyOffset: PropTypes.oneOf(SIX_OFFSETS),
  smallOffset: PropTypes.oneOf(SIX_OFFSETS),
  mediumOffset: PropTypes.oneOf(TWELVE_OFFSETS),
  largeOffset: PropTypes.oneOf(TWELVE_OFFSETS),
  wideOffset: PropTypes.oneOf(TWELVE_OFFSETS),
};

export default { Container, Row, Column, SIX_COLUMNS, TWELVE_COLUMNS, SIX_OFFSETS, TWELVE_OFFSETS, getOffset };
