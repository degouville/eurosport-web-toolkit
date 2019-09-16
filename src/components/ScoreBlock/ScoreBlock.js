import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { rgba } from 'polished';
import circleWithCross from 'src/assets/circle-with-cross.svg';
import greenCircle from 'src/assets/green-circle.svg';
import * as colors from '../../colors';
import * as breakpoints from '../../breakpoints';
import SetsScore, { StyledSpacer, setsScoreType } from './SetsScore';
import { fontInterUi } from '../../typography';
import SetsSchedule, { setsScheduleType } from './SetsSchedule';
import Link from '../../elements/Link';

const StyledClickableWrapper = styled(Link)`
  width: 100%;
  display: flex;
  align-items: stretch;
  text-decoration: none;
  font-size: 14px;
  color: inherit;
`;

export const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => colors[props.color]};
  ${fontInterUi};
  font-size: 11px;
  text-align: center;
  text-transform: uppercase;
  color: ${colors.white};
  letter-spacing: 1px;
  line-height: 16px;
  word-break: break-word;
  padding: 0 4px;
  min-width: 0;
  flex: 0 0 32px;
  ${breakpoints.medium(css`
    flex: 0 0 66px;
  `)};
  ${props =>
    css`
      &:after {
        content: '\u2192';
      }
      ${breakpoints.medium(css`
        &:after {
          content: ${props.contentText};
        }
      `)};
    `}
`;

const StyledScoreWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-right: 10px;
  ${props =>
    !props.hasLeftCircle &&
    css`
      padding-left: 20px;
    `};
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  background-color: ${rgba(colors.comet, 0.5)};
  ${StyledSpacer} {
    border-top-color: ${colors.mirage};
  }
`;

const StyledPlayButton = styled(StyledButton)`
  font-size: 14px;
  display: none;
  ${breakpoints.small(css`
    display: inherit;
  `)};
  ${breakpoints.medium(css`
    font-size: 20px;
  `)};
  &:after {
    content: none;
  }
`;

const StyledBigDot = styled.div`
  display: flex;
  align-items: center;
  ${fontInterUi};
  color: ${colors.lima};
  margin: 0 11px;
  font-size: 72px;
  width: 19px;

  ${breakpoints.medium(css`
    margin: 0 29px;
    width: 26px;
  `)};
  ${breakpoints.large(css`
    font-size: 78px;
  `)};

  img {
    max-width: 100%;
    max-height: 26px;
  }
`;

const StyledSetsScore = styled(SetsScore)`
  flex: 1 1 0;
  min-width: 0;
`;
const StyledSetsSchedule = styled(SetsSchedule)`
  flex: 0 0 auto;
`;

export const ScoreButton = ({ properties }) => {
  const { hasButton, isLive, isWatchable, liveButtonText, matchInfoButtonText } = properties;
  if (!hasButton) return null;
  return isLive ? (
    <>
      {isWatchable && <StyledPlayButton color="monza">&#9658;</StyledPlayButton>}
      <StyledButton color="venetianRed" contentText={`'${liveButtonText}'`} />
    </>
  ) : (
    <StyledButton color="dodgerBlue" contentText={`'${matchInfoButtonText}'`} />
  );
};

ScoreButton.propTypes = {
  properties: PropTypes.shape({
    hasButton: PropTypes.bool.isRequired,
    isLive: PropTypes.bool.isRequired,
    isWatchable: PropTypes.bool.isRequired,
    liveButtonText: PropTypes.string.isRequired,
    matchInfoButtonText: PropTypes.string.isRequired,
  }).isRequired,
};

export const ScoreBlock = ({
  matchUrl,
  data,
  schedule,
  isLive,
  isWatchable,
  displayLeftCircle,
  liveButtonText,
  matchInfoButtonText,
  hasButton,
}) => {
  const hasLeftCircle = ['won', 'lost'].includes(displayLeftCircle);
  const hasSchedule = !!schedule && !data?.topTeam?.sets?.length && !data?.bottomTeam?.sets?.length;
  return (
    <StyledClickableWrapper href={matchUrl} data-test="clickable-scoreblock-wrapper">
      <StyledScoreWrapper hasLeftCircle={hasLeftCircle}>
        {hasLeftCircle && (
          <StyledBigDot>
            {displayLeftCircle === 'won' ? (
              <img src={greenCircle} alt="won match icon" />
            ) : (
              <img src={circleWithCross} alt="lost match icon" />
            )}
          </StyledBigDot>
        )}
        <StyledSetsScore data={data} baseFontSize="14px" highlightLastSet={isLive} />
        {hasSchedule && <StyledSetsSchedule schedule={schedule} />}
      </StyledScoreWrapper>
      <ScoreButton properties={{ hasButton, isLive, isWatchable, liveButtonText, matchInfoButtonText }} />
    </StyledClickableWrapper>
  );
};

export const scoreBlockType = {
  matchUrl: PropTypes.string.isRequired,
  data: setsScoreType.isRequired,
  schedule: setsScheduleType,
  isLive: PropTypes.bool,
  isWatchable: PropTypes.bool,
  displayLeftCircle: PropTypes.oneOf(['won', 'lost', false]),
  hasButton: PropTypes.bool,
};

ScoreBlock.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  displayLeftCircle: false,
  // eslint-disable-next-line react/default-props-match-prop-types
  isLive: false,
  // eslint-disable-next-line react/default-props-match-prop-types
  isWatchable: false,
  liveButtonText: 'Live',
  // eslint-disable-next-line react/default-props-match-prop-types
  schedule: null,
  matchInfoButtonText: 'Match Info',
  // eslint-disable-next-line react/default-props-match-prop-types
  hasButton: true,
};

ScoreBlock.propTypes = {
  ...scoreBlockType,
  liveButtonText: PropTypes.string,
  matchInfoButtonText: PropTypes.string,
};

export default ScoreBlock;
