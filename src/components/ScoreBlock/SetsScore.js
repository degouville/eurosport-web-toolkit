import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import * as colors from '../../colors';
import { fontAlphaHeadline, fontInterUi } from '../../typography';
import * as breakpoints from '../../breakpoints';

const StyledPlayers = styled.div`
  flex: 0 1 auto;
  min-width: 0;
`;

export const StyledPlayer = styled.div`
  display: flex;
  align-items: center;
  :not(:first-of-type) {
    margin-top: 0.25em;
  }
`;
const StyledPlayerInner = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const StyledPlayerImage = styled.img`
  margin-right: 0.5em;
  height: 0.75em;
`;

const StyledPlayerName = styled.span``;

const StyledTeamWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const StyledTeamMark = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 1em;
  ${fontInterUi};
  padding-left: 0.5em;
`;

export const StyledTeamName = styled.div`
  display: flex;
  justify-content: flex-start;
  color: ${props => (props.hasWon === false ? colors.manatee : colors.white)};
  ${fontAlphaHeadline};
  font-size: 1em;
  flex: 1 1 0;
  text-transform: uppercase;
  text-align: left;
  margin: 11px 0;
  min-width: 0;
  overflow: hidden; /* Fix for IE11 */
`;

export const StyledSetScoreWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 2em;
  ${props => props.highlight && `background-color: ${colors.dodgerBlue}`}
`;

export const StyledTeamSet = styled.div`
  color: ${props => (props.highlight === false ? colors.manatee : colors.white)};
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
  flex: 0 0 ${props => `${props.nbSets * 2}em`};
`;

const Player = ({ name, image }) => (
  <StyledPlayer>
    <StyledPlayerInner>
      {image && <StyledPlayerImage src={image} />}
      <StyledPlayerName>{name}</StyledPlayerName>
    </StyledPlayerInner>
  </StyledPlayer>
);
Player.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
};
Player.defaultProps = {
  name: null,
  image: null,
};

const Team = ({ teamData, isTeamMatch, highlightLastSet }) => {
  const { playerOneImage, playerTwoImage, sets, isServing, hasWon } = teamData;
  let { playerOneName = '', playerTwoName = '' } = teamData;

  // Set non-breaking space when a team is missing to keep the display ratio
  playerOneName = playerOneName === '' ? '\u00A0' : playerOneName;
  playerTwoName = playerTwoName === '' && isTeamMatch ? '\u00A0' : playerTwoName;

  const nbSets = sets?.length || 0;

  return (
    <StyledTeamWrapper>
      <StyledTeamName hasWon={hasWon}>
        <StyledPlayers>
          <Player name={playerOneName} image={playerOneImage} />
          {playerTwoName && <Player name={playerTwoName} image={playerTwoImage} />}
        </StyledPlayers>
        <StyledTeamMark>
          {hasWon && <>✓</>}
          {isServing && <>•</>}
        </StyledTeamMark>
      </StyledTeamName>
      <StyledTeamSets nbSets={nbSets}>
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
    font-size: 12px;
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
  border-top-color: ${colors.white};
  margin: 0;
`;

export const isTeam = team =>
  team.playerOneName != null && team.playerOneName !== '' && team.playerTwoName != null && team.playerTwoName !== '';

const SetsScore = ({ data, baseFontSize, highlightLastSet, className }) => {
  const isTeamMatch = isTeam(data.topTeam) || isTeam(data.bottomTeam);
  return (
    <StyledWrapper baseFontSize={baseFontSize} data-test="sets-score-wrapper" className={className}>
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
  className: undefined,
};

export const setsScoreType = PropTypes.shape({
  bottomTeam: teamDataType,
  topTeam: teamDataType,
});

SetsScore.propTypes = {
  data: setsScoreType.isRequired,
  baseFontSize: PropTypes.string,
  highlightLastSet: PropTypes.bool,
  className: PropTypes.string,
};

export default SetsScore;
