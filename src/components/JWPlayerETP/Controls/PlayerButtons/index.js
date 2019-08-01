import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import * as breakpoints from 'src/breakpoints';
import pause from 'src/assets/icon-pause.svg';
import play from 'src/assets/icon-play.svg';
import forward from 'src/assets/icon-jump-fwd.svg';
import rewind from 'src/assets/icon-jump-rwd.svg';

const PlayerButtons = ({ isPlaying, onForward, onRewind, onPlay, onPause }) => (
  <MainContainer>
    <SecondIcon src={rewind} alt="Rewind" onClick={onRewind} />
    <Label>15</Label>
    {isPlaying ? (
      <MainIcon src={pause} alt="Pause" onClick={onPause} />
    ) : (
      <MainIcon src={play} alt="Play" onClick={onPlay} />
    )}
    <Label>15</Label>
    <SecondIcon src={forward} alt="Forward" onClick={onForward} />
  </MainContainer>
);

PlayerButtons.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onForward: PropTypes.func.isRequired,
  onRewind: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Label = styled.p`
  color: ${({ theme }) => theme.playerControls.text.color};
  font-family: ${({ theme }) => theme.playerControls.text.fontFamily};
  font-size: 24px;
  line-height: 29px;
  text-align: center;
`;

const SecondIcon = styled.img`
  height: 44px;
`;

const MainIcon = styled.img`
  height: 64px;

  margin-left: 20px;
  margin-right: 20px;
  ${breakpoints.small(`
    margin-left: 88px;
    margin-right: 88px;
  `)};
`;

export default PlayerButtons;
