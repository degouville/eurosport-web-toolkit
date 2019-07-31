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
  color: ${colors.coreLightMinus1};
  letter-spacing: 1px;
  line-height: 16px;
  width: ${props => props.width};
  max-width: 40px;
  min-width: 30px;
  ${breakpoints.small(css`
    padding: 0 4px;
  `)};
  ${breakpoints.medium(css`
    min-width: 58px;
    max-width: 86px;
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
  padding-right: 10px;
  ${props =>
    !props.hasLeftCircle &&
    css`
      padding-left: 20px;
    `};
  flex-basis: 400px;
  flex-grow: 1;
  background-color: ${rgba(colors.coreNeutral11, 0.5)};
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

export const ScoreButton = ({ properties }) => {
  const { hasButton, isLive, isWatchable, liveButtonText, matchInfoButtonText } = properties;
  if (!hasButton) return null;
  return isLive ? (
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
  isLive,
  isWatchable,
  displayLeftCircle,
  liveButtonText,
  matchInfoButtonText,
  hasButton,
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
      <ScoreButton properties={{ hasButton, isLive, isWatchable, liveButtonText, matchInfoButtonText }} />
    </StyledClickableWrapper>
  );
};

export const scoreBlockType = {
  matchUrl: PropTypes.string.isRequired,
  data: setsScoreType.isRequired,
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
