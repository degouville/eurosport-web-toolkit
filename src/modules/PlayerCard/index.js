import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import * as colors from '../../colors';
import * as breakpoints from '../../breakpoints';
import { fontInterUi } from '../../typography';
import PlayerInfos, { playerType } from '../../components/PlayerInfos';
import ScoreBlock, { scoreBlockType } from '../../components/ScoreBlock';
import ViewMore, { StyledViewMoreButton } from '../ViewMore';

const StyledContainer = styled.div`
  background-color: ${colors.ebonyClay};
  padding-top: 1px;
  position: relative;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.6);
`;

export const StyledBackground = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  ${props => `background-image: url(${props.backgroundImageUrl});`}
`;

const StyledPlayerInfos = styled(PlayerInfos)`
  margin-top: 30px;
`;

const StyledPreviousMatches = styled.div`
  ${fontInterUi};
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
    width: 23px;
    ${breakpoints.medium(css`
      width: 41px;
    `)};
    height: 20px;
    border-right: 2px solid ${colors.coreLightMinus1};
    display: block;
  }
`;

const StyledMatches = styled.div`
  text-align: center;
  padding-bottom: 45px;
  ${breakpoints.medium(css`
    text-align: left;
  `)};
  ul {
    margin-bottom: 45px;
  }
  ${StyledViewMoreButton} {
    ${breakpoints.medium(css`
      margin-left: 70px;
    `)};
  }
`;

export const PlayerCard = ({
  playerInfo,
  backgroundImageUrl,
  previousMatches,
  className,
  previousMatchesText,
  showLessMatchesText,
  showMoreMatchesText,
  heightText,
  weightText,
  ageText,
  rankingText,
  liveButtonText,
  matchInfoButtonText,
}) => (
  <StyledContainer className={className}>
    <StyledBackground backgroundImageUrl={backgroundImageUrl} />
    <StyledPlayerInfos
      player={playerInfo}
      heightText={heightText}
      weightText={weightText}
      ageText={ageText}
      rankingText={rankingText}
    />

    {previousMatches && previousMatches.length > 0 && (
      <>
        <StyledPreviousMatches>{previousMatchesText}</StyledPreviousMatches>
        <StyledMatches>
          <ViewMore showLessText={showLessMatchesText} showMoreText={showMoreMatchesText}>
            {previousMatches.map((match, index) => (
              <StyledScoreBlock key={match.id}>
                {index > 0 && <StyledBefore />}
                <ScoreBlock.ScoreBlock
                  matchUrl={match.matchUrl}
                  data={match.data}
                  isLive={false}
                  isWatchable={false}
                  displayLeftCircle={match.hasWon ? 'won' : 'lost'}
                  liveButtonText={liveButtonText}
                  matchInfoButtonText={matchInfoButtonText}
                />
              </StyledScoreBlock>
            ))}
          </ViewMore>
        </StyledMatches>
      </>
    )}
  </StyledContainer>
);

PlayerCard.propTypes = {
  previousMatchesText: PropTypes.string,
  showLessMatchesText: PropTypes.string,
  showMoreMatchesText: PropTypes.string,
  heightText: PropTypes.string,
  weightText: PropTypes.string,
  ageText: PropTypes.string,
  rankingText: PropTypes.string,
  liveButtonText: PropTypes.string,
  matchInfoButtonText: PropTypes.string,
  playerInfo: playerType.isRequired,
  backgroundImageUrl: PropTypes.string.isRequired,
  previousMatches: PropTypes.arrayOf(PropTypes.shape(scoreBlockType)).isRequired,
  className: PropTypes.string,
};

PlayerCard.defaultProps = {
  className: '',
  previousMatchesText: 'Previous matches',
  showLessMatchesText: 'Show less matches',
  showMoreMatchesText: 'Show more matches',
  heightText: 'Height (m)',
  weightText: 'Weight (Kg)',
  ageText: 'Age',
  rankingText: 'Ranking',
  liveButtonText: 'Live',
  matchInfoButtonText: 'Match Info',
};

export default PlayerCard;
