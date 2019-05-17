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
    width: 41px;
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

const PlayerCard = ({ playerInfo, backgroundImageUrl, previousMatches, className }) => (
  <StyledContainer className={className}>
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

PlayerCard.propTypes = {
  playerInfo: playerType.isRequired,
  backgroundImageUrl: PropTypes.string.isRequired,
  previousMatches: PropTypes.arrayOf(PropTypes.shape(scoreBlockType)).isRequired,
  className: PropTypes.string,
};

PlayerCard.defaultProps = {
  className: '',
};

export default PlayerCard;
