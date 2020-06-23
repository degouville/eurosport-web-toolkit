import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import PlayIcon from '../../elements/PlayIcon';
import * as breakpoints from '../../breakpoints';
import Labels, { labelsType } from '../../elements/Labels';
import { H1 } from '../../typography';
import { white, blueZodiac, blackPearl } from '../../colors';
import ProgramDetails from '../../elements/ProgramDetails';

const StyledLiveVideoHeroWrapper = styled.div`
  position: relative;

  & ::before,
  & ::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &::before {
    opacity: 0.5;
    background: radial-gradient(circle, transparent 0, ${blueZodiac} 100%);
    z-index: 1;
  }

  &::after {
    opacity: 0.8;
    background: linear-gradient(180deg, rgba(20, 27, 77, 0.03), ${blackPearl});
    z-index: 2;
  }

  ${props =>
    !props.videoPlayerMode &&
    css`min-height: 350px;
    ${breakpoints.small(css`
      min-height: 385px;
    `)}
    ${breakpoints.medium(css`
      min-height: 408px;
    `)}
    ${breakpoints.large(css`
      min-height: 450px;
    `)}
    ${breakpoints.wide(css`
      min-height: 580px;
    `)}
  `}
`;

const StyledProgramDetails = styled(ProgramDetails)`
  padding-bottom: 20px;
  ${breakpoints.medium(css`
    padding-bottom: 30px;
  `)}
  ${breakpoints.large(css`
    padding-bottom: 45px;
  `)}
`;

export const StyledBackground = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background-image: ${props => `url(${props.backgroundImageUrl})`};
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  transition: opacity 0.5s;
  opacity: ${props => (props.hideBackground ? '0' : '1')};
`;

const StyledDetails = styled.div`
  position: relative;
  margin: 0 auto;
  z-index: 3;

  width: 83%;

  > :nth-last-child(3) {
    padding-top: 20px;
    margin-bottom: 7px;
  }

  ${breakpoints.large(css`
    width: 800px;
  `)}
  ${breakpoints.wide(css`
    width: 965px;
  `)}

  ${props =>
    props.videoPlayerMode
      ? css`
          padding-top: 0;
        `
      : css`padding-top: 100px;
      ${breakpoints.small(css`
        padding-top: 120px;
      `)}
      ${breakpoints.large(css`
        padding-top: 138px;
      `)}
      ${breakpoints.wide(css`
        padding-top: 270px;
      `)}
  `}
`;

const StyledH1 = styled(H1)`
  color: ${white};
  overflow-wrap: break-word;
  margin-top: 0.2em;
  ${breakpoints.large(css`
    padding-bottom: 18px;
  `)}
`;

export const StyledPlayIcon = styled(PlayIcon)`
  cursor: pointer;
`;

const LiveVideoHero = ({
  backgroundImageUrl,
  onPlayIconClick,
  labels,
  title,
  programCallSign,
  programDetails,
  isPlayerLoading,
  videoPlayerMode,
}) => (
  <StyledLiveVideoHeroWrapper videoPlayerMode={videoPlayerMode}>
    <StyledBackground backgroundImageUrl={backgroundImageUrl} hideBackground={videoPlayerMode} />
    <div id="video-player-container" />
    <StyledDetails videoPlayerMode={videoPlayerMode}>
      {!videoPlayerMode && <StyledPlayIcon height={84} onClick={onPlayIconClick} isLoading={isPlayerLoading} />}
      <Labels labels={labels} />
      <StyledH1>{title}</StyledH1>
      <StyledProgramDetails callsign={programCallSign} textDetail={programDetails} />
    </StyledDetails>
  </StyledLiveVideoHeroWrapper>
);

LiveVideoHero.defaultProps = {
  title: '',
  programDetails: '',
  isPlayerLoading: false,
  videoPlayerMode: false,
};

LiveVideoHero.propTypes = {
  backgroundImageUrl: PropTypes.string.isRequired,
  onPlayIconClick: PropTypes.func.isRequired,
  labels: labelsType.isRequired,
  title: PropTypes.string,
  programCallSign: PropTypes.string.isRequired,
  programDetails: PropTypes.string,
  isPlayerLoading: PropTypes.bool,
  videoPlayerMode: PropTypes.bool,
};

export default LiveVideoHero;
