import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import * as breakpoints from 'src/breakpoints';
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
  title,
  isAdPlaying,
}) => {
  const { isMobile } = useScreenInformation();

  return (
    <>
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
            isAdPlaying={isAdPlaying}
          />
        </PlayerButtonContainer>

        <TitleContainer>{title}</TitleContainer>
      </MainContainer>

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
    </>
  );
};

Controls.defaultProps = {
  isLive: false,
  rewindCounts: null,
  title: undefined,
  // eslint-disable-next-line react/default-props-match-prop-types
  isAdPlaying: false,
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
  title: PropTypes.string,
};

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  background: rgba(6, 8, 37, 0.4);
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

export const TitleContainer = styled.div`
  padding: 5px 16px 10px;
  color: #efeff4;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  text-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.1);

  ${breakpoints.small(css`
    padding: 30px 25px;
    font-size: 16px;
    line-height: 19px;
  `)};
`;

export default Controls;
