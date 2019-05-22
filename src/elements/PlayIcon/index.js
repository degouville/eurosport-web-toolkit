import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'react-emotion';
import { rgba } from 'polished';
import { coreLightMinus1, brandPlus2 } from '../../colors';
import PlayImg from '../icons/play';

const spin = keyframes`
  from 0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const StyledBorder = styled.div`
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  border-radius: 50%;
  border: 2px solid ${rgba(coreLightMinus1, 0.5)};
  border-right-color: ${({ isLoading }) => isLoading && `transparent`};
  animation: ${({ isLoading }) => isLoading && `${spin} 1s linear infinite`};
`;

export const hoverStyles = css`
  ${StyledBorder} {
    border-color: ${coreLightMinus1};
  }
`;

const StyledWrapper = styled.div`
  position: relative;
  display: inline-block;
  height: ${({ iconHeight }) => `${iconHeight}px`};
  width: ${({ iconHeight }) => `${iconHeight}px`};
  padding: ${({ iconHeight }) => `${(iconHeight * 0.45) / 2}px`};
  box-sizing: border-box;
  border-radius: 50%;
  background: ${rgba(brandPlus2, 0.2)};
  overflow: hidden;

  :hover {
    ${({ isLoading }) => !isLoading && hoverStyles}
  }
`;

const StyledPlayImageSmall = styled(PlayImg)`
  width: 38%;
  height: 38%;
  display: inline-block;
  vertical-align: middle;
`;

const StyledPlayImageBig = styled(PlayImg)`
  width: 100%;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
`;

const PlayIcon = ({ alt, height, isLoading, isRounded, ...props }) =>
  isRounded ? (
    <StyledWrapper {...props} isLoading={isLoading} iconHeight={height}>
      <StyledBorder isLoading={isLoading} />
      <StyledPlayImageBig />
    </StyledWrapper>
  ) : (
    <StyledPlayImageSmall {...props} />
  );

PlayIcon.defaultProps = {
  alt: 'play',
  className: '',
  isLoading: false,
  isRounded: true,
  height: 20,
};

PlayIcon.propTypes = {
  alt: PropTypes.string,
  height: PropTypes.number,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  isRounded: PropTypes.bool,
};

export default PlayIcon;
