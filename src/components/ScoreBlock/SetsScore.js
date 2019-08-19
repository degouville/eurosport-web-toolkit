import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import * as colors from '../../colors';
import { fontAlphaHeadline, fontInterUi } from '../../typography';
import * as breakpoints from '../../breakpoints';

const StyledTeamWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

export const StyledTeamImage = styled.img`
  margin: auto;
  margin-right: 12px;
`;

export const StyledPlayer = styled.div`
  display: flex;
  align-items: center;
  :not(:first-of-type) {
    margin-top: 6px;
  }
`;

const StyledPlayerName = styled.div`
  display: block;
`;

const StyledMark = styled.span`
  margin-left: 10px;
`;

export const StyledTeamName = styled.div`
  color: ${props => (props.hasWon === false ? colors.coreNeutral4 : colors.coreLightMinus1)};
  ${fontAlphaHeadline};
  font-size: 1em;
  flex-basis: ${({ hasScore }) => (hasScore ? '60' : '100')}%;
  text-transform: uppercase;
  text-align: left;
  margin: 11px 0;
  span {
    ${fontInterUi};
    font-size: 1em;
  }
`;

export const StyledSetScoreWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 2em;
  ${props => props.highlight && `background-color: ${colors.actionOneDarkBase}`}
`;

export const StyledTeamSet = styled.div`
  color: ${props => (props.highlight === false ? colors.coreNeutral4 : colors.coreLightMinus1)};
  ${fontAlphaHeadline};
  font-weight: bold;
  font-size: 1em;
  margin: auto;
  sup {
    font-size: 0.55em;
    vertical-align: super;
    position: relative;
    top: -0.4em;
    right: -0.2em;
  }
`;

const StyledTeamSets = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
`;

const Team = ({ teamData, isTeamMatch, highlightLastSet }) => {
  const { playerOneImage, playerTwoImage, sets, isServing, hasWon } = teamData;
  let { playerOneName = '', playerTwoName = '' } = teamData;

  // Set non-breaking space when a team is missing to keep the display ratio
  playerOneName = playerOneName === '' ? '\u00A0' : playerOneName;
  playerTwoName = playerTwoName === '' && isTeamMatch ? '\u00A0' : playerTwoName;

  const hasScore = !!sets?.length;

  return (
    <StyledTeamWrapper>
      <StyledTeamName hasWon={hasWon} hasScore={hasScore}>
        <StyledPlayer>
          <div>{playerOneImage && <StyledTeamImage src={playerOneImage} />}</div>
          <StyledPlayerName>
            {playerOneName}
            {hasWon && <StyledMark>✓</StyledMark>}
            {isServing && <StyledMark>•</StyledMark>}
          </StyledPlayerName>
        </StyledPlayer>
        {playerTwoName && (
          <StyledPlayer>
            <div>{playerTwoImage && <StyledTeamImage src={playerTwoImage} />}</div>
            <div>{playerTwoName}</div>
          </StyledPlayer>
        )}
      </StyledTeamName>
      <StyledTeamSets>
        {sets &&
          sets.map(({ set, score, tie, won, ...props }, index) => {
            const isLast = index === sets.length - 1;
            const highlightBackground = isLast && highlightLastSet;
            const highlightValue = won || highlightBackground;
            return (
              <StyledSetScoreWrapper key={`set-${set}`} highlight={highlightBackground} {...props}>
                <StyledTeamSet highlight={highlightValue}>
                  {score}
                  {tie != null && <sup>{tie}</sup>}
                </StyledTeamSet>
              </StyledSetScoreWrapper>
            );
          })}
      </StyledTeamSets>
    </StyledTeamWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  ${props =>
    props.baseFontSize
      ? css`
          font-size: ${props.baseFontSize};
        `
      : css`
    font-size: 8px
    ${breakpoints.small(css`
      font-size: 14px;
    `)};
    ${breakpoints.medium(css`
      font-size: 24px;
    `)};
    ${breakpoints.large(css`
      font-size: 32px;
    `)};
    };
  `}
`;

export const StyledSpacer = styled.hr`
  display: block;
  border: 0;
  border-top: 1px solid;
  padding: 0;
  border-top-color: ${colors.coreLightMinus1};
  margin: 0;
`;

export const isTeam = team =>
  team.playerOneName != null && team.playerOneName !== '' && team.playerTwoName != null && team.playerTwoName !== '';

const SetsScore = ({ data, baseFontSize, highlightLastSet }) => {
  const isTeamMatch = isTeam(data.topTeam) || isTeam(data.bottomTeam);
  return (
    <StyledWrapper baseFontSize={baseFontSize} data-test="sets-score-wrapper">
      <Team teamData={data.topTeam} isTeamMatch={isTeamMatch} highlightLastSet={highlightLastSet} />
      <StyledSpacer />
      <Team teamData={data.bottomTeam} isTeamMatch={isTeamMatch} highlightLastSet={highlightLastSet} />
    </StyledWrapper>
  );
};

const teamDataType = PropTypes.shape({
  hasWon: PropTypes.bool,
  isServing: PropTypes.bool,
  playerOneName: PropTypes.string,
  playerTwoName: PropTypes.string,
  playerOneImage: PropTypes.string,
  playerTwoImage: PropTypes.string,
  sets: PropTypes.arrayOf(
    PropTypes.shape({
      set: PropTypes.number,
      score: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      tie: PropTypes.number,
      won: PropTypes.bool,
    })
  ),
});

Team.propTypes = {
  teamData: teamDataType.isRequired,
  isTeamMatch: PropTypes.bool,
  highlightLastSet: PropTypes.bool,
};
Team.defaultProps = {
  isTeamMatch: false,
  highlightLastSet: false,
};

SetsScore.defaultProps = {
  baseFontSize: null,
  highlightLastSet: false,
};

export const setsScoreType = PropTypes.shape({
  bottomTeam: teamDataType,
  topTeam: teamDataType,
});

SetsScore.propTypes = {
  data: setsScoreType.isRequired,
  baseFontSize: PropTypes.string,
  highlightLastSet: PropTypes.bool,
};

export default SetsScore;
