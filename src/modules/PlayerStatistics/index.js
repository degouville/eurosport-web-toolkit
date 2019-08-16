import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { H3 } from 'src/typography';
import { Grid } from 'src';
import * as breakpoints from 'src/breakpoints';
import ibmLogo from '../../assets/ibm-logo.svg';

import Comparison from './Comparison';

const { Container } = Grid;

const PlayerStatistics = ({ names, comparisonPoints, isSponsored }) => {
  const { playerOne, playerTwo } = names;

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>{playerOne}</StyledTitle>
        <StyledTitle>{playerTwo}</StyledTitle>
      </StyledHeader>

      <StyledStats>{!!comparisonPoints.length && comparisonPoints.map(Comparison)}</StyledStats>
      {isSponsored && <StyledSponsored src={ibmLogo} />}
    </StyledContainer>
  );
};

PlayerStatistics.defaultProps = {
  isSponsored: false,
};

PlayerStatistics.propTypes = {
  names: PropTypes.shape({
    playerOne: PropTypes.string.isRequired,
    playerTwo: PropTypes.string.isRequired,
  }).isRequired,
  comparisonPoints: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      currentValues: PropTypes.shape({
        one: PropTypes.number.isRequired,
        two: PropTypes.number.isRequired,
      }).isRequired,
      maximumValue: PropTypes.number.isRequired,
      isPercent: PropTypes.bool,
    })
  ).isRequired,
  isSponsored: PropTypes.bool,
};

const StyledContainer = styled(Container)`
  margin: 16px;
  color: ${({ theme }) => theme.typo.primary.color};
  background: ${({ theme }) => theme.statistics.background.one};
  background-image: linear-gradient(
    to right,
    ${({ theme }) => theme.statistics.background.one} 0%,
    ${({ theme }) => theme.statistics.background.one} 50%,
    ${({ theme }) => theme.statistics.background.two} 50%,
    ${({ theme }) => theme.statistics.background.two} 100%
  );
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    display: block;
    width: 110%;
    height: 30px;
    ${breakpoints.medium(css`
      height: 60px;
    `)}
    background-image: linear-gradient(
      -183deg,
      ${({ theme }) => theme.statistics.fringe} 0%,
      ${({ theme }) => theme.statistics.fringe} 50%,
      transparent 50%,
      transparent 100%
    );
  }
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledTitle = styled(H3)`
  text-align: center;
  padding: 30px 10px;
  flex: 0 0 calc(50% - 20px);
  word-break: break-word;
  font-size: 18px;
  ${breakpoints.medium(css`
    padding: 50px;
    flex: 0 0 calc(50% - 100px);
    font-size: 24px;
  `)}
`;

const StyledStats = styled.ul`
  padding: 0 15px 15px 15px;
  ${breakpoints.medium(css`
    padding: 0 45px 20px 45px;
  `)}
`;

const StyledSponsored = styled.img`
  height: 26px;
  width: 60px;
  display: block;
  float: right;
  margin: 0 15px 15px 0;
  ${breakpoints.medium(css`
    height: 35px;
    width: 84px;
    margin: 0 45px 20px 0;
  `)}
`;

export default PlayerStatistics;
