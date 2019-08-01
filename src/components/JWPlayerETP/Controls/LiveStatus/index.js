import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const LiveStatus = ({ rewindCounts, isLive }) => (
  <LiveContainer>
    {!rewindCounts && (
      <Icon isLive={isLive}>
        <Text>LIVE</Text>
      </Icon>
    )}
    {rewindCounts && <RewindText>{rewindCounts}</RewindText>}
  </LiveContainer>
);

LiveStatus.defaultProps = {
  isLive: false,
  rewindCounts: undefined,
};

LiveStatus.propTypes = {
  isLive: PropTypes.bool,
  rewindCounts: PropTypes.string,
};

const LiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RewindText = styled.p`
  color: ${({ theme }) => theme.playerControls.liveIcon.color};
  font-family: ${({ theme }) => theme.playerControls.liveIcon.fontFamily};
  font-size: 13px;
  letter-spacing: 1px;
  line-height: 16px;
  text-align: center;
`;

const Icon = styled.div`
  display: flex;
  height: 20px;
  width: 43px;
  border-radius: 1px;
  background-color: ${({ theme, isLive }) => (isLive ? theme.playerControls.liveIcon.backgroundColor : 'transparent')};
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.playerControls.liveIcon.color};
  font-family: ${({ theme }) => theme.playerControls.liveIcon.fontFamily};
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  line-height: 15px;
  text-align: center;
`;

export default LiveStatus;
