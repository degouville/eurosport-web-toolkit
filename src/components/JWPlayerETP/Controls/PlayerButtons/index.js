import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import * as breakpoints from 'src/breakpoints';
import pause from 'src/assets/icon-pause.svg';
import play from 'src/assets/icon-play.svg';
import Spinner from 'src/elements/Spinner';
import forward from 'src/assets/icon-jump-fwd.svg';
import rewind from 'src/assets/icon-jump-rwd.svg';

const PlayerButtons = ({ isPlaying, onForward, onRewind, onPlay, onPause, isBuffering }) => (
  <MainContainer>
    <SecondIcon src={rewind} alt="Rewind" onClick={onRewind} />
    <Label>15</Label>
    <CentralContainer isBuffering={isBuffering}>
      {isBuffering && <SpinnerStyled width="90px" />}
      <MainIcon hidden={!isPlaying} src={pause} alt="Pause" onClick={onPause} />
      <MainIcon hidden={isPlaying} src={play} alt="Play" onClick={onPlay} />
    </CentralContainer>
    <Label>15</Label>
    <SecondIcon src={forward} alt="Forward" onClick={onForward} />
  </MainContainer>
);

PlayerButtons.propTypes = {
  isBuffering: PropTypes.bool.isRequired,
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
  user-select: none;
  cursor: pointer;
`;

const SecondIcon = styled.img`
  height: 44px;
  user-select: none;
  cursor: pointer;
`;

export const SpinnerStyled = styled(Spinner)`
  position: absolute;
  margin: 0;
`;

const CentralContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 100px;

  margin-left: 20px;
  margin-right: 20px;
  ${breakpoints.small(`
    margin-left: 88px;
    margin-right: 88px;
  `)};
`;

const MainIcon = styled.img`
  height: 64px;
  user-select: none;
  cursor: pointer;
`;

export default PlayerButtons;
