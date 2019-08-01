import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Volume from 'src/assets/icon-volume.svg';
import { HorizontalSeparator, VerticalSeparator } from '../UI/separators';
import BarControlWrapper from '../UI/barControlWrapper';
import LiveStatus from '../LiveStatus';
import Icon from '../UI/icon';
import BarContainer from '../UI/bar';

const BottomBar = ({ isLive, rewindCounts, children }) => (
  <BottomBarContainer>
    <HorizontalSeparator />
    <BarElementsContainer>
      {/* replace VideoTimeContainer by the future implementation */}
      <VideoTimeContainer />
      <BarActionsContainer>
        <VerticalSeparator />
        <BarControlWrapper>
          <LiveStatus isLive={isLive} rewindCounts={rewindCounts} />
        </BarControlWrapper>
        <VerticalSeparator />
        <BarControlWrapper>
          <Icon src={Volume} alt="Volume" />
        </BarControlWrapper>
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
  children: PropTypes.element.isRequired,
  isLive: PropTypes.bool,
  rewindCounts: PropTypes.string,
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
`;

export default BottomBar;
