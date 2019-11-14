import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import forward from 'src/assets/icon-jump-fwd.svg';
import * as breakpoints from 'src/breakpoints';

const LiveStatus = ({ rewindCounts, isLive, onSeek, seekMax }) => {
  const onClickBackToLive = useCallback(() => onSeek(seekMax), [onSeek, seekMax]);

  return (
    <LiveContainer>
      {isLive && (
        <BackToLiveAction rewindCounts={rewindCounts} onClick={onClickBackToLive}>
          {rewindCounts && <ForwardIcon src={forward} alt="Forward" />}
          <Icon isLive rewindCounts={rewindCounts}>
            <Text>LIVE</Text>
          </Icon>
        </BackToLiveAction>
      )}

      {rewindCounts && (
        <RewindText length={rewindCounts?.length} isLive>
          {rewindCounts}
        </RewindText>
      )}
    </LiveContainer>
  );
};

LiveStatus.defaultProps = {
  isLive: false,
  rewindCounts: undefined,
};

LiveStatus.propTypes = {
  isLive: PropTypes.bool,
  rewindCounts: PropTypes.string,
  onSeek: PropTypes.func.isRequired,
  seekMax: PropTypes.number.isRequired,
};

const LiveContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BackToLiveAction = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  user-select: none;
  cursor: pointer;
  pointer-events: ${({ rewindCounts }) => (rewindCounts ? 'initial' : 'none')};
`;

const ForwardIcon = styled.img`
  height: 13px;
  margin-left: -7px;
  ${breakpoints.small(css`
    height: 20px;
    margin-left: -12px;
  `)};
`;

const RewindText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.playerControls.liveIcon.color};
  font-family: ${({ theme }) => theme.playerControls.liveIcon.fontFamily};
  letter-spacing: 1px;
  ${({ length }) => `width: ${length}ch;`}
  line-height: 16px;
  text-align: center;
  user-select: none;
  flex: 1;
  border-top: ${({ theme, isLive }) => isLive && `1px solid ${theme.playerControls.separator}`};

  font-size: 11px;
  padding: 0 16px;
  ${breakpoints.small(css`
    font-size: 13px;
    padding: 5px 16px;
  `)};
`;

const Icon = styled.div`
  display: flex;
  width: 43px;
  margin: 0 16px;
  border-radius: 1px;
  background-color: ${({ theme, isLive, rewindCounts }) =>
    isLive && !rewindCounts ? theme.playerControls.liveIcon.backgroundColor : 'transparent'};
  justify-content: center;
  align-items: center;

  ${breakpoints.small(css`
    height: 20px;
  `)};
`;

const Text = styled.div`
  color: ${({ theme }) => theme.playerControls.liveIcon.color};
  font-family: ${({ theme }) => theme.playerControls.liveIcon.fontFamily};
  font-weight: bold;
  letter-spacing: 1px;
  line-height: 15px;
  text-align: center;

  font-size: 10px;
  ${breakpoints.small(css`
    font-size: 12px;
  `)};
`;

export default LiveStatus;
