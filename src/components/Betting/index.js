import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { rgba } from 'polished';
import { coreNeutral9, coreLightMinus1, martinique, manatee } from '../../colors';
import { fontAlphaHeadlineBold } from '../../typography';
import Link from '../../elements/Link';
import * as breakpoints from '../../breakpoints';

const StyledCard = styled(Link)`
  background-color: ${coreNeutral9};
  color: ${coreLightMinus1};
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  text-decoration: inherit;
  &::before {
    content: '';
    position: absolute;
    top: -35px;
    left: 0;
    right: 0;
    display: block;
    height: 60px;
    background-color: ${martinique};
    transform: skew(0, -5deg);
    z-index: 1;
  }
`;

const StyledBettingName = styled.div`
  background-color: ${props => props.background};
  color: ${props => props.text};
  padding: 13px;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1px;
  z-index: 2;
`;

const StyledBettingSentence = styled.div`
  ${fontAlphaHeadlineBold};
  text-transform: uppercase;
  font-weight: 500;
  font-size: 18px;
  margin-top: 22px;
  margin-bottom: 4px;
`;

const StyledBetting = styled.div`
  display: flex;
  align-items: flex-start;
  ${fontAlphaHeadlineBold};
  line-height: 30px;
  margin-bottom: 35px;
  justify-content: left;
`;

const StyledChoiceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const StyledChoiceNumber = styled.div`
  font-size: 13px;
  color: ${manatee};
`;

const StyledChoiceOdds = styled.div`
  text-decoration: inherit;
  color: inherit;
  padding: 6px 20px 4px 20px;
  font-size: 24px;
  background-color: ${rgba(coreLightMinus1, 0.2)};
  margin: 0 8px;
  border-radius: 3px;
  ${breakpoints.medium(css`
    margin: 0 3px;
  `)}
`;

const StyledTeamName = styled.div`
  text-transform: uppercase;
  font-weight: normal;
  max-width: 120px;
  line-height: 20px;
  text-align: center;
  ${breakpoints.medium(css`
    line-height: 42px;
    position: absolute;
    top: 30px;
    white-space: nowrap;
    max-width: inherit;
    text-align: inherit;
  `)};
  ${StyledChoiceWrapper}:first-child & {
    ${breakpoints.medium(css`
      right: 100%;
      margin-right: 12px;
    `)}
  }

  ${StyledChoiceWrapper}:last-child & {
    ${breakpoints.medium(css`
      left: 100%;
      margin-left: 12px;
    `)}
  }
  ${props =>
    props.textLength > 15 &&
    css`
      font-size: 14px;
    `}
`;

export const getRandomSentence = sentences => sentences[Math.floor(Math.random() * sentences.length)];

const Betting = ({ link, sponsor, sentences, choices, className, customAttr }) => (
  <StyledCard className={className} href={link} target="_blank" {...customAttr}>
    <StyledBettingName background={sponsor.backgroundColor} text={sponsor.textColor}>
      {sponsor.name}
    </StyledBettingName>
    <StyledBettingSentence>{getRandomSentence(sentences)}</StyledBettingSentence>
    <StyledBetting>
      {choices.map(choice => (
        <StyledChoiceWrapper key={choice.number}>
          <StyledChoiceNumber>{choice.number}</StyledChoiceNumber>
          <StyledChoiceOdds>{choice.odds}</StyledChoiceOdds>
          {choice.label && <StyledTeamName textLength={choice.label.length}>{choice.label}</StyledTeamName>}
        </StyledChoiceWrapper>
      ))}
    </StyledBetting>
  </StyledCard>
);

Betting.defaultProps = {
  className: undefined,
  customAttr: {},
};

Betting.propTypes = {
  link: PropTypes.string.isRequired,
  sponsor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
  }).isRequired,
  sentences: PropTypes.arrayOf(PropTypes.string).isRequired,
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number.isRequired,
      odds: PropTypes.string.isRequired,
      label: PropTypes.string,
    })
  ).isRequired,
  className: PropTypes.string,
  customAttr: PropTypes.shape({
    [PropTypes.string.isRequired]: PropTypes.string,
  }),
};

export default Betting;
