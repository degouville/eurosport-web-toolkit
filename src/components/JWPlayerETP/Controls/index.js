import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { VerticalSeparator } from './UI/separators';
import useScreenInformation from './useScreenInformation';
import PlayerButtons from './PlayerButtons';
import BarContainer from './UI/bar';
import BottomBar from './BottomBar';
import ActionList from './ActionList';

const Controls = ({
  isPlaying,
  isBuffering,
  isLive,
  rewindCounts,
  isFullscreen,
  onFullscreenChange,
  onForward,
  onRewind,
  onPlay,
  onPause,
  onSeek,
  seekMin,
  seekMax,
  seekPosition,
  volume,
  onVolume,
  mute,
  onMute,
}) => {
  const { isMobile } = useScreenInformation();

  return (
    <MainContainer>
      <TopBarContainer>
        {isMobile && <ActionList isFullscreen={isFullscreen} onFullscreenChange={onFullscreenChange} />}
      </TopBarContainer>
      <PlayerButtonContainer>
        <PlayerButtons
          isBuffering={isBuffering}
          isPlaying={isPlaying}
          onForward={onForward}
          onRewind={onRewind}
          onPlay={onPlay}
          onPause={onPause}
        />
      </PlayerButtonContainer>
      <BottomBar
        isMobile={isMobile}
        isLive={isLive}
        rewindCounts={rewindCounts}
        isFullscreen={isFullscreen}
        onFullscreenChange={onFullscreenChange}
        onSeek={onSeek}
        seekMin={seekMin}
        seekMax={seekMax}
        seekPosition={seekPosition}
        onVolume={onVolume}
        volume={volume}
        onMute={onMute}
        mute={mute}
      >
        {!isMobile && (
          <>
            <VerticalSeparator />
            <ActionList isFullscreen={isFullscreen} onFullscreenChange={onFullscreenChange} />
          </>
        )}
      </BottomBar>
    </MainContainer>
  );
};

Controls.defaultProps = {
  isLive: false,
  rewindCounts: null,
};

Controls.propTypes = {
  ...PlayerButtons.propTypes,
  isFullscreen: PropTypes.bool.isRequired,
  onFullscreenChange: PropTypes.func.isRequired,
  isLive: PropTypes.bool,
  rewindCounts: PropTypes.string,
  onSeek: PropTypes.func.isRequired,
  seekMin: PropTypes.number.isRequired,
  seekMax: PropTypes.number.isRequired,
  seekPosition: PropTypes.number.isRequired,
  onVolume: PropTypes.func.isRequired,
  onMute: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  mute: PropTypes.bool.isRequired,
};

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
`;

const PlayerButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const TopBarContainer = styled.div`
  ${BarContainer}
  flex-direction: row;
  justify-content: flex-end;
`;

export default Controls;
