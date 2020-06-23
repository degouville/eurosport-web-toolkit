import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { withTheme } from 'emotion-theming';
import Spinner from 'src/elements/Spinner';
import SkipIcon from 'src/assets/icon-skipadvert.component.svg';
import * as breakpoints from 'src/breakpoints';
import { HorizontalSeparator, VerticalSeparator } from '../UI/separators';
import BarControlWrapper from '../UI/barControlWrapper';
import LiveStatus from '../LiveStatus';
import BarContainer from '../UI/bar';
import Slider from '../Slider';
import Volume from '../Volume';
import useSkipTime from './hooks';

export const BottomBar = ({
  isLive,
  rewindCounts,
  children,
  theme,
  onSeek,
  seekMin,
  seekMax,
  seekPosition,
  volume,
  onVolume,
  mute,
  onMute,
  onSkipAd,
  isAdPlaying,
  skipEnabled,
  skipTime,
}) => {
  const skipOffset = useSkipTime({ seekPosition, skipTime });
  const onClickSkip = useCallback(() => !skipOffset && onSkipAd(), [skipOffset, onSkipAd]);

  return (
    <BottomBarContainer>
      <HorizontalSeparator />

      <BarElementsContainer>
        <VideoTimeContainer>
          <Slider
            max={seekMax}
            onChange={onSeek}
            min={seekMin}
            value={seekPosition}
            defaultValue={0}
            {...theme.playerControls.seek}
          />
        </VideoTimeContainer>

        <BarActionsContainer>
          <VerticalSeparator />

          <BarControlWrapper>
            <LiveStatus isLive={isLive} rewindCounts={rewindCounts} onSeek={onSeek} seekMax={seekMax} />
          </BarControlWrapper>

          <VerticalSeparator />

          <Volume volume={volume} mute={mute} onVolume={onVolume} onMute={onMute} />

          <VerticalSeparator />

          {isAdPlaying && skipEnabled && (
            <SkipContainer onClick={onClickSkip} skipOffset={skipOffset}>
              <SkipLabel skipOffset={skipOffset}>SKIP</SkipLabel>

              <SkipTimerContainer skipOffset={skipOffset}>
                {skipOffset ? (
                  <>
                    <StyledSpinner width="28px" />
                    <SkipTimer>{skipOffset <= skipTime && skipOffset}</SkipTimer>
                  </>
                ) : (
                  <StyledSkipIcon />
                )}
              </SkipTimerContainer>
            </SkipContainer>
          )}

          {children}
        </BarActionsContainer>
      </BarElementsContainer>
    </BottomBarContainer>
  );
};

BottomBar.defaultProps = {
  isLive: false,
  rewindCounts: undefined,
};

BottomBar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  isLive: PropTypes.bool,
  rewindCounts: PropTypes.string,
  onSeek: PropTypes.func.isRequired,
  seekMin: PropTypes.number.isRequired,
  seekMax: PropTypes.number.isRequired,
  seekPosition: PropTypes.number.isRequired,
  ...Volume.propTypes,
};

const BottomBarContainer = styled.div`
  ${BarContainer}

  background-color: ${({ theme }) => theme.playerControls.bar.backgroundColor};
  flex-direction: column;
  justify-content: space-between;
`;

const BarElementsContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BarActionsContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
`;

const VideoTimeContainer = styled.div`
  display: flex;
  flex: 1;
  margin-left: 24px;
  margin-right: 24px;
`;

export const SkipContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 5px;
  position: relative;
  cursor: ${({ skipOffset }) => (skipOffset ? 'not-allowed' : 'pointer')};
  ${breakpoints.small(css`
    padding: 0 10px;
  `)};
`;

export const SkipLabel = styled.p`
  color: ${({ theme }) => theme.playerControls.text.color};
  opacity: ${({ skipOffset }) => (skipOffset ? 0.3 : 1)};
  font-size: 12px;
  margin-right: 5px;
  ${breakpoints.small(css`
    font-size: 14px;
  `)};
`;

const StyledSpinner = styled(Spinner)`
  margin: 0;
  position: absolute;
`;

export const SkipTimer = styled.p`
  position: absolute;
  color: ${({ theme }) => theme.playerControls.text.color};
  font-size: 14px;
`;

const SkipTimerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ skipOffset }) => (skipOffset ? '0 15px' : 'O 5px')};
`;

export const StyledSkipIcon = styled(SkipIcon)`
  width: 28px;
  height: 25px;
`;

export default withTheme(BottomBar);
