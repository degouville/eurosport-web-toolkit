import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import * as colors from '../../colors';
import * as breakpoints from '../../breakpoints';
import { fontInterUi } from '../../typography';
import PlayerInfos, { playerType } from '../../components/PlayerInfos';
import Labels, { labelsType } from '../../elements/Labels';
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
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 18px;
  color: ${colors.coreNeutral3};
  text-transform: uppercase;
  margin: 21px 40px 0 40px;
  ${breakpoints.medium(css`
    margin: 21px 80px 0 80px;
  `)};
`;

export const StyledScoreBlock = styled.div`
  display: inherit;
`;

const StyledMatches = styled.div`
  text-align: center;
  padding-bottom: 40px;
  ${breakpoints.medium(css`
    padding-bottom: 50px;
    text-align: left;
  `)};
  ul {
    margin-bottom: 40px;
  }
  ${StyledViewMoreButton} {
    ${breakpoints.medium(css`
      margin-left: 70px;
    `)};
  }
`;

export const StyledLabels = styled.div`
  margin: auto 40px;
  padding: 20px 0 10px 0;
  ${breakpoints.medium(css`
    margin: auto 80px;
    padding: 30px 0 20px 0;
  `)};
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
  onViewMoreClick,
  isViewMoreOpen,
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
          <ViewMore
            showLessText={showLessMatchesText}
            showMoreText={showMoreMatchesText}
            onClick={onViewMoreClick}
            forceToggle={isViewMoreOpen}
          >
            {previousMatches.map(({ id, matchUrl, data, hasWon, labels }) => (
              <StyledScoreBlock key={id}>
                <StyledLabels>
                  <Labels labels={labels} isSimpleMode />
                </StyledLabels>

                <ScoreBlock.ScoreBlock
                  matchUrl={matchUrl}
                  data={data}
                  isLive={false}
                  isWatchable={false}
                  displayLeftCircle={hasWon ? 'won' : 'lost'}
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

const scoreBlockWithLabelsType = {
  ...scoreBlockType,
  labels: labelsType.isRequired,
};

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
  previousMatches: PropTypes.arrayOf(PropTypes.shape(scoreBlockWithLabelsType)).isRequired,
  className: PropTypes.string,
  onViewMoreClick: PropTypes.func,
  isViewMoreOpen: PropTypes.bool,
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
  onViewMoreClick: null,
  isViewMoreOpen: false,
};

export default PlayerCard;
