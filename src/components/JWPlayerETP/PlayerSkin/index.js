import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import Spinner from 'src/elements/Spinner';
import ErrorBanner from 'src/elements/ErrorBanner';
import useInteraction from './useInteraction';
import useFullscreen from './useFullscreen';
import Controls from '../Controls';

const useKeepInteraction = (action, handleInteraction) =>
  useCallback(
    props => {
      handleInteraction();
      action(props);
    },
    [action, handleInteraction]
  );

const PlayerSkin = ({
  isBuffering,
  isPlaying,
  id,
  onPlay,
  onPause,
  onForward,
  onRewind,
  onSeek,
  onVolume,
  onMute,
  controls,
  errorMessage,
  ...props
}) => {
  const { onKeyUp, active, handlePlayerInteraction, lockInteraction, unLockInteraction } = useInteraction({
    isPlaying,
  });
  const MainContainerRef = useRef();

  const [isFullscreen, onFullscreenChange] = useFullscreen(MainContainerRef.current);

  const onPlayKeepInteraction = useKeepInteraction(onPlay, handlePlayerInteraction);
  const onPauseKeepInteraction = useKeepInteraction(onPause, handlePlayerInteraction);
  const onFullscreenChangeKeepInteraction = useKeepInteraction(onFullscreenChange, handlePlayerInteraction);
  const onForwardKeepInteraction = useKeepInteraction(onForward, handlePlayerInteraction);
  const onRewindKeepInteraction = useKeepInteraction(onRewind, handlePlayerInteraction);
  const onSeekKeepInteraction = useKeepInteraction(onSeek, handlePlayerInteraction);
  const onVolumeKeepInteraction = useKeepInteraction(onVolume, handlePlayerInteraction);
  const onMuteKeepInteraction = useKeepInteraction(onMute, handlePlayerInteraction);

  const showSpinner = !active && isBuffering;
  const showControls = showSpinner === false && (!isPlaying || active);

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <MainContainer
      innerRef={MainContainerRef}
      onKeyUp={onKeyUp}
      onMouseOver={lockInteraction}
      onMouseOut={unLockInteraction}
      onFocus={handlePlayerInteraction}
      onTouchMove={handlePlayerInteraction}
      onTouchStart={handlePlayerInteraction}
    >
      <JWPlayerContainer id={id} />
      {controls === false && (
        <>
          <ControlsOverlay active={showControls}>
            <Controls
              isPlaying={isPlaying}
              isBuffering={isBuffering}
              onPlay={onPlayKeepInteraction}
              onPause={onPauseKeepInteraction}
              isFullscreen={isFullscreen}
              onFullscreenChange={onFullscreenChangeKeepInteraction}
              onForward={onForwardKeepInteraction}
              onRewind={onRewindKeepInteraction}
              onSeek={onSeekKeepInteraction}
              onVolume={onVolumeKeepInteraction}
              onMute={onMuteKeepInteraction}
              {...props}
            />
          </ControlsOverlay>
          {showSpinner && (
            <SpinnerOverlay>
              <SpinnerContainer>
                <Spinner width="90px" />
              </SpinnerContainer>
            </SpinnerOverlay>
          )}
        </>
      )}
      {errorMessage && (
        <ErrorOverlay>
          <ErrorBanner message={errorMessage} />
        </ErrorOverlay>
      )}
    </MainContainer>
  );
};

PlayerSkin.defaultProps = {
  errorMessage: null,
};

// eslint-disable-next-line react/forbid-foreign-prop-types
const { onFullscreenChange: _, ...ControlsPropTypes } = Controls.propTypes;
PlayerSkin.propTypes = {
  ...ControlsPropTypes,
  id: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  controls: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

const CommonOverlay = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  opacity: 1;
  flex-direction: column;
  justify-content: center;
`;

const Visible = styled.css`
  visibility: visible;
  transform: translateY(0%);
  transition: transform 300ms ease-in-out;
`;

export const ControlsOverlay = styled.div`
  ${CommonOverlay}
  ${({ active }) => active && Visible}
  transform: translateY(100%);
  transition: transform 300ms ease-in-out, visibility 300ms;
`;

export const ErrorOverlay = styled.div`
  ${CommonOverlay}
  height: auto;
`;

export const SpinnerOverlay = styled.div`
  ${CommonOverlay}
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const JWPlayerContainer = styled.div``;

export default PlayerSkin;
