import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import useInteraction from './useInteraction';
import Controls from '../Controls';

const PlayerSkin = ({ isPlaying, id, onPlay, onPause, ...props }) => {
  const { onKeyUp, active, handlePlayerInteraction } = useInteraction({ isPlaying });

  const onPlayKeepInteraction = useCallback(() => {
    handlePlayerInteraction();
    onPlay();
  }, [handlePlayerInteraction, onPlay]);

  const onPauseKeepInteraction = useCallback(() => {
    handlePlayerInteraction();
    onPause();
  }, [handlePlayerInteraction, onPause]);

  return (
    <MainContainer
      onKeyUp={onKeyUp}
      onMouseOver={handlePlayerInteraction}
      onFocus={handlePlayerInteraction}
      onMouseMove={handlePlayerInteraction}
      onTouchMove={handlePlayerInteraction}
      onTouchStart={handlePlayerInteraction}
    >
      <JWPlayerContainer id={id} />
      <Overlay active={isPlaying === false ? true : active}>
        <Controls isPlaying={isPlaying} onPlay={onPlayKeepInteraction} onPause={onPauseKeepInteraction} {...props} />
      </Overlay>
    </MainContainer>
  );
};

PlayerSkin.propTypes = {
  ...Controls.propTypes,
  id: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
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
