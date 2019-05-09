import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { fontFamilies } from '../../typography';
import { coreNeutral9, coreLightMinus1, coreNeutral3 } from '../../colors';
import * as breakpoints from '../../breakpoints';

const StyledPlayerInfosBackground = styled.div`
  position: absolute;
  background: ${coreNeutral9};
  clip-path: polygon(0 11%, 100% 0%, 100% 89%, 0% 100%);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
`;

const StyledPlayerInfos = styled.div`
  position: relative;
  color: ${coreLightMinus1};
  font-family: ${fontFamilies.interUi};
  padding: 60px 20px 55px;
  margin-top: 17px;
`;

const StyledPlayerName = styled.div`
  font-family: ${fontFamilies.alphaHeadline};
  font-size: 38px;
  line-height: 42px;
  word-break: break-word;
  margin-bottom: 10px;
  transition: cubic-bezier(0.75, -0.5, 0, 1.75) 0.35s font-size;
  ${breakpoints.medium(css`
    font-size: 48px;
    line-height: 42px;
  `)};
`;

const StyledPicContainer = styled.div`
  border-radius: 50%;
  height: 100px;
  width: 100px;
  flex: 0 0 130px;
  flex-basis: auto;
  overflow: hidden;
  transition: cubic-bezier(0.75, -0.5, 0, 1.75) 0.35s all;
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
  align-items: center;
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
  color: ${coreNeutral3};
  text-transform: uppercase;
`;

const StyledListDescription = styled.li`
  font-family: ${fontFamilies.alphaHeadline};
  font-size: 32px;
  align-self: flex-end;
  text-align: center;
  list-style: none;
`;

const StyledRank = styled.span`
  font-family: ${fontFamilies.alphaHeadline};
  font-size: 72px;
  line-height: 60px;
`;

const StyledFlex = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  z-index: 1;
`;

const StyledCol = styled.div`
  flex-basis: calc(100% - 130px);
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  &:last-child {
    text-align: center;
    flex-basis: 100px;
    position: relative;
    top: -104px;
    transition: cubic-bezier(0.75, -0.5, 0, 1.75) 0.35s top;
    ${breakpoints.medium(css`
      top: 0;
      margin-top: -80px;
    `)};
  }
`;

const StyledList = styled.ul`
  z-index: 1;
  display: flex;
  justify-content: space-between;
  width: initial;
  margin-top: 30px;
  width: calc(100% + 100px);
  transition: cubic-bezier(0.75, -0.5, 0, 1.75) 0.35s all;
  ${breakpoints.medium(css`
    margin-top: 45px;
    width: 90%;
  `)};
`;

const StyledRanking = styled.div`
  margin-top: 15px;
`;

const PlayerInfos = ({ player }) => (
  <StyledPlayerInfos>
    <StyledFlex>
      <StyledCol>
        <>
          <StyledPlayerName>
            {player.firstName} {player.lastName}
          </StyledPlayerName>
          <StyledCountryContainer>
            <StyledFlag data-test="flag-picture" src={player.flagUrl} alt={player.country} />
            <StyledCountry>{player.country}</StyledCountry>
          </StyledCountryContainer>
        </>
        <StyledList>
          <StyledListDescription>
            <StyledListTitle>height (m)</StyledListTitle>
            {player.height}
          </StyledListDescription>
          <StyledListDescription>
            <StyledListTitle>weight (kg)</StyledListTitle>
            {player.weight}
          </StyledListDescription>
          <StyledListDescription>
            <StyledListTitle>age</StyledListTitle>
            {player.age}
          </StyledListDescription>
        </StyledList>
      </StyledCol>
      <StyledCol>
        <StyledPicContainer>
          <img data-test="player-picture" src={player.pictureUrl} alt={`${player.firstName} ${player.lastName}`} />
        </StyledPicContainer>
        <StyledRanking>
          <StyledListTitle>{player.competition} ranking</StyledListTitle>
          <StyledRank>{player.ranking}</StyledRank>
        </StyledRanking>
      </StyledCol>
    </StyledFlex>
    <StyledPlayerInfosBackground />
  </StyledPlayerInfos>
);

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
};

PlayerInfos.propTypes = {
  player: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.string,
    height: PropTypes.string,
    weight: PropTypes.string,
    country: PropTypes.string,
    flagUrl: PropTypes.string.isRequired,
    ranking: PropTypes.string,
    competition: PropTypes.string,
    pictureUrl: PropTypes.string.isRequired,
  }),
};

export default PlayerInfos;
