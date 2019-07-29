import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import useInteraction from './useInteraction';

const PlayerWrapper = ({ children, isPlaying }) => {
  const { onKeyUp, active, handlePlayerInteraction } = useInteraction({ isPlaying });
  return (
    <MainContainer
      onKeyUp={onKeyUp}
      onMouseOver={handlePlayerInteraction}
      onFocus={handlePlayerInteraction}
      onMouseMove={handlePlayerInteraction}
      onTouchMove={handlePlayerInteraction}
      onTouchStart={handlePlayerInteraction}
    >
      {children({ active })}
    </MainContainer>
  );
};

PlayerWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

const MainContainer = styled.div``;

export default PlayerWrapper;
