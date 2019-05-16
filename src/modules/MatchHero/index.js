import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import * as colors from '../../colors';
import * as breakpoints from '../../breakpoints';
import { fontAlphaHeadline, fontInterUi, H1, H4, H5 } from '../../typography';
import Labels, { labelsType } from '../../elements/Labels';
import SetsScore, { setsScoreType } from '../../components/ScoreBlock/SetsScore';
import Button from '../../elements/Button';
import PlayIconLink from '../../elements/PlayIconLink';

const StyledWrapper = styled.div`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 22px;

  ${breakpoints.small(css`
    padding: 30px 24px;
  `)};

  ${breakpoints.medium(css`
    padding: 30px 34px;
  `)};

  ${breakpoints.wide(css`
    padding: 30px 150px;
  `)};

  ${PlayIconLink} {
    position: relative;
    cursor: pointer;
  }
`;

const StyledScoreWrapper = styled.div`
  margin: 22px 0;
`;

const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  ${breakpoints.medium(css`
    margin-top: 24px;
  `)};
  color: ${colors.coreLightMinus1};
  flex-wrap: wrap;
  ${breakpoints.medium(css`
    flex-wrap: nowrap;
  `)};
`;

const StyledBasicInfo = styled.div`
  max-width: 700px;
`;

export const StyledTime = styled(H4)`
  ${fontAlphaHeadline};
  margin-top: 20px;
  margin-bottom: 43px;
  text-transform: uppercase;
  ${breakpoints.medium(css`
    font-size: 22px;
    display: flex;
    flex-direction: column;
  `)};
  ${breakpoints.large(css`
    font-size: 26px;
    margin-top: 29px;
    display: block;
  `)};
`;

export const StyledMarketingMessage = styled(H5)`
  margin-top: 20px;
  font-size: 11px;
  letter-spacing: 0.5px;
  line-height: 14px;
  text-transform: uppercase;
  text-align: left;
  ${breakpoints.medium(css`
    text-align: center;
  `)};
`;

export const StyledCTA = styled.div`
  width: 100%;
  min-width: 282px;
  max-width: 368px;
  ${breakpoints.medium(css`
    margin-bottom: 43px;
  `)};
  ${Button} {
    ${fontInterUi};
  }
`;

export const StyledDivider = styled.span`
  border-right: solid 2px ${colors.scarpaGrey};
  margin: 0 10px;
  ${breakpoints.medium(css`
    margin: 0 18px;
  `)};
`;

const MatchHero = ({ title, date, hour, labels, cTAText, cTALink, marketingMessage }) => (
  <StyledWrapper>
    <Labels labels={labels} />
    <StyledContent>
      <StyledBasicInfo>
        <H1>{title}</H1>
        <StyledTime>
          {date} {date && hour && <StyledDivider />}
          {hour}
        </StyledTime>
      </StyledBasicInfo>
      <StyledCTA>
        <Button href={cTALink}>{cTAText}</Button>
        {marketingMessage && <StyledMarketingMessage>{marketingMessage}</StyledMarketingMessage>}
      </StyledCTA>
    </StyledContent>
  </StyledWrapper>
);

MatchHero.defaultProps = {
  date: '',
  hour: '',
  marketingMessage: '',
};

MatchHero.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  hour: PropTypes.string,
  labels: labelsType.isRequired,
  cTAText: PropTypes.string.isRequired,
  cTALink: PropTypes.string.isRequired,
  marketingMessage: PropTypes.string,
};

export const MatchHeroWithScore = ({ scoreData, labels, displayWatchButton, watchButtonText, onWatchButtonClick }) => (
  <StyledWrapper>
    <Labels labels={labels} />
    <StyledScoreWrapper>
      <SetsScore data={scoreData} />
    </StyledScoreWrapper>
    {displayWatchButton && (
      <PlayIconLink bgColorIcon={colors.utahCrimson} bgColorText={colors.venetianRed} onClick={onWatchButtonClick}>
        {watchButtonText}
      </PlayIconLink>
    )}
  </StyledWrapper>
);

MatchHeroWithScore.defaultProps = {
  watchButtonText: 'WATCH',
};

MatchHeroWithScore.propTypes = {
  watchButtonText: PropTypes.string,
  labels: labelsType.isRequired,
  scoreData: setsScoreType.isRequired,
  displayWatchButton: PropTypes.bool.isRequired,
  onWatchButtonClick: PropTypes.func.isRequired,
};

export default MatchHero;
