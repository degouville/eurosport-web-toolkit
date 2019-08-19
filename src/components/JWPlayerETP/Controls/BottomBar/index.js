import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { withTheme } from 'emotion-theming';
import { HorizontalSeparator, VerticalSeparator } from '../UI/separators';
import BarControlWrapper from '../UI/barControlWrapper';
import LiveStatus from '../LiveStatus';
import BarContainer from '../UI/bar';
import Slider from '../Slider';
import Volume from '../Volume';

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
}) => (
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
          <LiveStatus isLive={isLive} rewindCounts={rewindCounts} />
        </BarControlWrapper>
        <VerticalSeparator />
        <Volume volume={volume} mute={mute} onVolume={onVolume} />
        {children}
      </BarActionsContainer>
    </BarElementsContainer>
  </BottomBarContainer>
);

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

export default withTheme(BottomBar);
