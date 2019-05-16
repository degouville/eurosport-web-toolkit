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
  align-items: center;
`;

export const StyledTeamName = styled.div`
  color: ${props => (props.hasWon === false ? colors.coreNeutral4 : colors.coreLightMinus1)};
  ${fontAlphaHeadline};
  font-size: 1em;
  flex-basis: 60%;
  text-transform: uppercase;
  text-align: left;
  span {
    ${fontInterUi};
    font-size: 1em;
  }
`;

export const StyledTeamSet = styled.span`
  color: ${props => (props.won ? colors.coreLightMinus1 : colors.coreNeutral4)};
  ${fontAlphaHeadline};
  font-weight: bold;
  font-size: 1em;
  margin: 0 0.4em;
  &:last-child {
    margin-right: 0px;
  }
  sup {
    font-size: 0.55em;
    vertical-align: super;
    position: relative;
    top: -0.4em;
    right: -0.2em;
  }
  ${breakpoints.small(css`
    margin: 0 0.8em;
  `)};
`;

const StyledTeamSets = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Team = ({ teamData }) => {
  const { playerOneName = '', playerTwoName, sets, isServing, hasWon } = teamData;
  return (
    <StyledTeamWrapper>
      <StyledTeamName hasWon={hasWon}>
        <div>
          {playerOneName}
          {hasWon && <span> ✓</span>}
          {isServing && <span> •</span>}
        </div>
        <div>{playerTwoName}</div>
      </StyledTeamName>
      <StyledTeamSets>
        {sets &&
          sets.map(({ set, score, tie, ...props }) => (
            <StyledTeamSet key={`set-${set}`} {...props}>
              {score}
              {tie && <sup>{tie}</sup>}
            </StyledTeamSet>
          ))}
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
  height: 1px;
  border: 0;
  border-top: 1px solid;
  padding: 0;
  border-top-color: ${colors.coreLightMinus1};
`;

const SetsScore = ({ data, baseFontSize }) => (
  <StyledWrapper baseFontSize={baseFontSize} data-test="sets-score-wrapper">
    <Team teamData={data.topTeam} />
    <StyledSpacer />
    <Team teamData={data.bottomTeam} />
  </StyledWrapper>
);

const teamDataType = PropTypes.shape({
  hasWon: PropTypes.bool,
  isServing: PropTypes.bool,
  playerOneName: PropTypes.string,
  playerTwoName: PropTypes.string,
  sets: PropTypes.arrayOf(
    PropTypes.shape({
      set: PropTypes.number,
      score: PropTypes.number,
      tie: PropTypes.number,
      won: PropTypes.bool,
    })
  ),
});

Team.propTypes = {
  teamData: teamDataType.isRequired,
};

SetsScore.defaultProps = {
  baseFontSize: null,
};

export const setsScoreType = PropTypes.shape({
  bottomTeam: teamDataType,
  topTeam: teamDataType,
});

SetsScore.propTypes = {
  data: setsScoreType.isRequired,
  baseFontSize: PropTypes.string,
};

export default SetsScore;
