import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import * as colors from '../../colors';
import * as breakpoints from '../../breakpoints';
import { fontFamilies } from '../../typography';
import PlayerInfos, { playerType } from '../../components/PlayerInfos';
import ScoreBlock, { teamDataType } from '../../components/ScoreBlock';
import ViewMore, { StyledButton } from '../ViewMore';

const StyledContainer = styled.div`
  background-color: ${colors.ebonyClay};
  padding-bottom: 45px;
`;

export const StyledBackground = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: -45px;
  max-height: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  ${props => `background-image: url(${props.backgroundImageUrl});`}
`;

const StyledPlayerInfos = styled(PlayerInfos)`
  margin-top: 30px;
`;

const StyledPreviousMatches = styled.div`
  font-family: ${fontFamilies.interUi};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 18px;
  color: ${colors.coreNeutral3};
  text-transform: uppercase;
  margin: 21px 31px;
`;

export const StyledScoreBlock = styled.div`
  display: inherit;
`;

const StyledBefore = styled.div`
  :before {
    content: '';
    width: 41px;
    height: 20px;
    border-right: 2px solid ${colors.coreLightMinus1};
    display: block;
  }
`;

const StyledMatches = styled.div`
  text-align: center;
  ${breakpoints.medium(css`
    text-align: left;
  `)};
  ul {
    margin-bottom: 45px;
  }
  ${StyledButton} {
    ${breakpoints.medium(css`
      margin-left: 70px;
    `)};
  }
`;

const PlayerCard = ({ playerInfo, backgroundImageUrl, previousMatches }) => (
  <StyledContainer>
    <StyledBackground backgroundImageUrl={backgroundImageUrl} />
    <StyledPlayerInfos player={playerInfo} />

    {previousMatches && previousMatches.length > 0 && (
      <>
        <StyledPreviousMatches>PREVIOUS MATCHES</StyledPreviousMatches>
        <StyledMatches>
          <ViewMore showLessText="View Less Matches" showMoreText="View More Matches">
            {previousMatches.map((match, index) => (
              <StyledScoreBlock key={match.id}>
                {index > 0 && <StyledBefore />}
                <ScoreBlock.ScoreBlock
                  matchUrl={match.matchUrl}
                  data={match.data}
                  isLive={false}
                  isWatchable={false}
                  displayLeftCircle={match.hasWon ? 'won' : 'lost'}
                />
              </StyledScoreBlock>
            ))}
          </ViewMore>
        </StyledMatches>
      </>
    )}
  </StyledContainer>
);

const matchType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  matchUrl: PropTypes.string.isRequired,
  data: PropTypes.shape({
    bottomTeam: teamDataType,
    topTeam: teamDataType,
  }).isRequired,
  hasWon: PropTypes.bool,
});

PlayerCard.propTypes = {
  playerInfo: playerType.isRequired,
  backgroundImageUrl: PropTypes.string.isRequired,
  previousMatches: PropTypes.arrayOf(matchType).isRequired,
};

export default PlayerCard;
