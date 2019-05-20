import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import * as colors from '../../colors';
import * as breakpoints from '../../breakpoints';
import SetsScore, { StyledSpacer, setsScoreType } from './SetsScore';
import { fontInterUi } from '../../typography';
import circleWithCross from '../../assets/circle-with-cross.svg';
import greenCircle from '../../assets/green-circle.svg';
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
  text-align: center;
  text-transform: uppercase;
  color: ${colors.coreLightMinus1};
  letter-spacing: 1px;
  line-height: 16px;
  width: ${props => props.width};
  min-width: 58px;
  ${breakpoints.small(css`
    padding: 0 4px;
  `)};
  ${props =>
    css`
      &:after {
        content: '\u2192';
      }
      ${breakpoints.large(css`
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
  padding-right: 16px;
  ${props =>
    !props.hasLeftCircle &&
    css`
      padding-left: 16px;
    `};
  padding-top: 16px;
  padding-bottom: 16px;
  flex-basis: 400px;
  flex-grow: 1;
  background-color: rgba(79, 82, 106, 0.5);
  ${StyledSpacer} {
    border-top-color: ${colors.midnightExpress2};
  }
`;

const StyledPlayButton = styled(StyledButton)`
  font-size: 24px;
  display: none;
  ${breakpoints.large(css`
    display: inherit;
  `)};
  &:after {
    content: none;
  }
`;

const StyledBigDot = styled.div`
  display: flex;
  align-items: center;
  ${fontInterUi};
  color: ${colors.featureThreeBase};
  margin: 0 11px;
  font-size: 72px;
  ${breakpoints.medium(css`
    margin: 0 29px;
  `)};
  ${breakpoints.large(css`
    font-size: 78px;
  `)};
`;

export const ScoreBlock = ({
  matchUrl,
  data,
  isLive,
  isWatchable,
  displayLeftCircle,
  liveButtonText,
  matchInfoButtonText,
}) => {
  const hasLeftCircle = ['won', 'lost'].includes(displayLeftCircle);
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
        <SetsScore data={data} baseFontSize="14px" highlightLastSet={isLive} />
      </StyledScoreWrapper>
      {isLive ? (
        <>
          {isWatchable && (
            <StyledPlayButton color="actionTwoLightPlus1" width="68px">
              &#9658;
            </StyledPlayButton>
          )}
          <StyledButton color="venetianRed" contentText={`'${liveButtonText}'`} width="68px" />
        </>
      ) : (
        <StyledButton color="actionOneDarkBase" contentText={`'${matchInfoButtonText}'`} width="144px" />
      )}
    </StyledClickableWrapper>
  );
};

export const scoreBlockType = {
  matchUrl: PropTypes.string.isRequired,
  data: setsScoreType.isRequired,
  isLive: PropTypes.bool,
  isWatchable: PropTypes.bool,
  displayLeftCircle: PropTypes.oneOf(['won', 'lost', false]),
};

ScoreBlock.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  displayLeftCircle: false,
  // eslint-disable-next-line react/default-props-match-prop-types
  isLive: false,
  // eslint-disable-next-line react/default-props-match-prop-types
  isWatchable: false,
  liveButtonText: 'Live',
  matchInfoButtonText: 'Match Info',
};

ScoreBlock.propTypes = {
  ...scoreBlockType,
  liveButtonText: PropTypes.string,
  matchInfoButtonText: PropTypes.string,
};

export default ScoreBlock;
