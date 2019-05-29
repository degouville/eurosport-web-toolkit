import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { fontAlphaHeadline, fontAlphaHeadlineBold, fontInterUi } from '../../typography';
import { coreNeutral9, coreLightMinus1, coreNeutral3 } from '../../colors';
import * as breakpoints from '../../breakpoints';

const StyledPlayerInfosBackground = styled.div`
  position: absolute;
  background: ${coreNeutral9};
  clip-path: polygon(0 11%, 101% 0%, 101% 89%, 0% 100%);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
`;

const StyledPlayerInfos = styled.div`
  position: relative;
  color: ${coreLightMinus1};
  ${fontInterUi};
  padding: 60px 20px 55px;
  margin-top: 48px;
`;

const StyledPlayerName = styled.div`
  ${fontAlphaHeadline};
  font-size: 38px;
  line-height: 46px;
  word-break: break-word;
  margin-bottom: 10px;
  transition: font-size ease-out 0.15s;
  max-width: calc(100% - 130px);

  ${props => props.textLength > 11 && `font-size: 25px;`};

  ${breakpoints.medium(css`
    font-size: 48px;
    line-height: 42px;
    max-width: 100%;
  `)};

  ${props =>
    props.textLength > 15 &&
    breakpoints.medium(
      css`
        font-size: 30px;
      `
    )};
`;

const StyledPicContainer = styled.div`
  border-radius: 50%;
  height: 100px;
  width: 100px;
  flex: 0 0 130px;
  flex-basis: auto;
  overflow: hidden;
  transition: all ease-out 0.15s;
  position: absolute;
  right: 0;
  top: -100px;
  ${breakpoints.medium(css`
    height: 130px;
    width: 130px;
    margin: 0 0 30px;
  `)};
  img {
    width: 100%;
  }
`;

const StyledCountryContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const StyledCountry = styled.span`
  font-size: 16px;
  text-transform: uppercase;
  line-height: 15px;
`;

const StyledFlag = styled.img`
  height: 16px;
  width: 24px;
  margin-right: 5px;
`;

const StyledListTitle = styled.div`
  font-size: 12px;
  ${fontInterUi};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: antialiased;
  font-weight: 600;
  color: ${coreNeutral3};
  text-transform: uppercase;
  margin-bottom: 10px;
  ${breakpoints.medium(css`
    letter-spacing: 1px;
  `)};
`;

const StyledListDescription = styled.li`
  ${fontAlphaHeadline};
  font-size: 32px;
  align-self: flex-end;
  list-style: none;
  ${breakpoints.wide(css`
    font-size: 42px;
  `)};
`;

const StyledRank = styled.span`
  ${fontAlphaHeadline};
  font-size: 72px;
  line-height: 60px;
  ${props => props.textLength > 2 && `font-size: 60px; line-height: 50px;`};
  ${breakpoints.medium(css`
    ${fontAlphaHeadlineBold};
  `)};
  ${breakpoints.wide(css`
    font-size: 92px;
  `)};
`;

const StyledFlex = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const StyledBlock = styled.div`
  flex-basis: calc(100% - 130px);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${breakpoints.medium(css`
    max-width: 357px;
  `)};
  &:last-child {
    position: absolute;
    right: 0;
    text-align: center;
    flex-basis: 100px;
    align-items: flex-end;

    ${breakpoints.medium(css`
      position: relative;
      margin-top: -80px;
    `)};
  }
`;

const StyledList = styled.ul`
  z-index: 1;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  width: calc(100% - 27px);
  transition: all ease-out 0.15s;
  ${breakpoints.medium(css`
    margin-top: 45px;
    width: 90%;
  `)};
`;

const StyledRanking = styled.div`
  position: relative;
  left: 3%;
  bottom: 0;
  min-width: 100px;
  margin-top: 12px;

  ${breakpoints.medium(css`
    position: absolute;
    left: auto;
    min-width: 130px;
    margin-top: 0;

    ${StyledListTitle} {
      margin-bottom: 18px;
    }
  `)};

  ${breakpoints.wide(css`
    bottom: 3px;
  `)};
`;

export const PlayerInfos = ({ player, heightText, weightText, ageText, rankingText }) => (
  <StyledPlayerInfos>
    <StyledFlex>
      <StyledPicContainer>
        {player.pictureUrl && (
          <img data-test="player-picture" src={player.pictureUrl} alt={`${player.firstName} ${player.lastName}`} />
        )}
      </StyledPicContainer>
      <StyledBlock>
        <>
          <StyledPlayerName
            data-test="player-name"
            textLength={
              player.firstName.length > player.lastName.length ? player.firstName.length : player.lastName.length
            }
          >
            {player.firstName}
            <br />
            {player.lastName}
          </StyledPlayerName>
          <StyledCountryContainer>
            <StyledFlag data-test="flag-picture" src={player.flagUrl} alt={player.country} />
            <StyledCountry data-test="player-country">{player.country}</StyledCountry>
          </StyledCountryContainer>
        </>
        <StyledList>
          <StyledListDescription data-test="player-height">
            <StyledListTitle>{heightText}</StyledListTitle>
            {player.height}
          </StyledListDescription>
          <StyledListDescription data-test="player-weight">
            <StyledListTitle>{weightText}</StyledListTitle>
            {player.weight}
          </StyledListDescription>
          <StyledListDescription data-test="player-age">
            <StyledListTitle>{ageText}</StyledListTitle>
            {player.age}
          </StyledListDescription>
        </StyledList>
      </StyledBlock>
      <StyledBlock>
        <StyledRanking>
          <StyledListTitle>{rankingText}</StyledListTitle>
          <StyledRank textLength={player.ranking.length} data-test="player-ranking">
            {player.ranking}
          </StyledRank>
        </StyledRanking>
      </StyledBlock>
    </StyledFlex>
    <StyledPlayerInfosBackground />
  </StyledPlayerInfos>
);

export const playerType = PropTypes.shape({
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  age: PropTypes.string,
  height: PropTypes.string,
  weight: PropTypes.string,
  country: PropTypes.string,
  flagUrl: PropTypes.string.isRequired,
  ranking: PropTypes.string,
  pictureUrl: PropTypes.string.isRequired,
});

PlayerInfos.defaultProps = {
  player: {
    firstName: '-',
    lastName: '-',
    age: '-',
    height: '-',
    weight: '-',
    country: '-',
    ranking: '-',
    competition: '-',
  },
  heightText: 'Height (m)',
  weightText: 'Weight (Kg)',
  ageText: 'Age',
  rankingText: 'Ranking',
};

PlayerInfos.propTypes = {
  heightText: PropTypes.string,
  weightText: PropTypes.string,
  ageText: PropTypes.string,
  rankingText: PropTypes.string,
  player: playerType,
};

export default PlayerInfos;
