import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import Spinner from 'src/elements/Spinner';
import ErrorMessage from '../Controls/ErrorMessage';
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
  title,
  isAdPlaying,
  ...props
}) => {
  const { onKeyUp, active, handlePlayerInteraction } = useInteraction({
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
    <MainContainer innerRef={MainContainerRef} onKeyUp={onKeyUp} onMouseMove={handlePlayerInteraction}>
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
              title={isFullscreen || isAdPlaying ? title : undefined}
              isAdPlaying={isAdPlaying}
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
          <ErrorMessage message={errorMessage} />
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
  isAdPlaying: PropTypes.bool.isRequired,
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
  opacity: 1;
  transition: opacity 300ms ease-in-out;
`;

export const ControlsOverlay = styled.div`
  ${CommonOverlay}
  ${({ active }) => active && Visible}
  opacity: 0;
  transition: opacity 300ms ease-in-out, visibility 300ms;
`;

export const ErrorOverlay = styled.div`
  ${CommonOverlay}
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
  .jw-error-msg {
    display: none !important;
  }
`;

const JWPlayerContainer = styled.div``;

export default PlayerSkin;
