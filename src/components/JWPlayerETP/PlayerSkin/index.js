import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
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

const PlayerSkin = ({ isPlaying, id, onPlay, onPause, onForward, onRewind, onSeek, onVolume, controls, ...props }) => {
  const { onKeyUp, active, handlePlayerInteraction } = useInteraction({ isPlaying });
  const MainContainerRef = useRef();

  const [isFullscreen, onFullscreenChange] = useFullscreen(MainContainerRef.current);

  const onPlayKeepInteraction = useKeepInteraction(onPlay, handlePlayerInteraction);
  const onPauseKeepInteraction = useKeepInteraction(onPause, handlePlayerInteraction);
  const onFullscreenChangeKeepInteraction = useKeepInteraction(onFullscreenChange, handlePlayerInteraction);
  const onForwardKeepInteraction = useKeepInteraction(onForward, handlePlayerInteraction);
  const onRewindKeepInteraction = useKeepInteraction(onRewind, handlePlayerInteraction);
  const onSeekKeepInteraction = useKeepInteraction(onSeek, handlePlayerInteraction);
  const onVolumeKeepInteraction = useKeepInteraction(onVolume, handlePlayerInteraction);

  return (
    <MainContainer
      innerRef={MainContainerRef}
      onKeyUp={onKeyUp}
      onMouseOver={handlePlayerInteraction}
      onFocus={handlePlayerInteraction}
      onMouseMove={handlePlayerInteraction}
      onTouchMove={handlePlayerInteraction}
      onTouchStart={handlePlayerInteraction}
    >
      <JWPlayerContainer id={id} />
      {controls === false && (
        <Overlay active={isPlaying === false ? true : active}>
          <Controls
            isPlaying={isPlaying}
            onPlay={onPlayKeepInteraction}
            onPause={onPauseKeepInteraction}
            isFullscreen={isFullscreen}
            onFullscreenChange={onFullscreenChangeKeepInteraction}
            onForward={onForwardKeepInteraction}
            onRewind={onRewindKeepInteraction}
            onSeek={onSeekKeepInteraction}
            onVolume={onVolumeKeepInteraction}
            {...props}
          />
        </Overlay>
      )}
    </MainContainer>
  );
};

// eslint-disable-next-line react/forbid-foreign-prop-types
const { onFullscreenChange: _, ...ControlsPropTypes } = Controls.propTypes;
PlayerSkin.propTypes = {
  ...ControlsPropTypes,
  id: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  controls: PropTypes.bool.isRequired,
};

const Visible = styled.css`
  visibility: visible;
  transform: translateY(0%);
  transition: transform 300ms ease-in-out;
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  opacity: 1;
  flex-direction: column;
  justify-content: center;

  ${({ active }) => active && Visible}

  transform: translateY(100%);
  transition: transform 300ms ease-in-out, visibility 300ms;
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
