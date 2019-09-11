import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import * as colors from '../../colors';
import * as breakpoints from '../../breakpoints';
import { fontHelvetica, fontAlphaHeadline, fontInterUi, H1, H4, H5 } from '../../typography';
import Labels, { labelsType } from '../../elements/Labels';
import SetsScore, { setsScoreType } from '../../components/ScoreBlock/SetsScore';
import Button from '../../elements/Button';
import ArrowLink from '../../elements/ArrowLink';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledScoreWrapper = styled.div`
  margin: 19px 0;
`;

const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  ${breakpoints.medium(css`
    margin-top: 30px;
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
  ${props => (props.hasCourtInfo ? 'margin-bottom: 20px;' : 'margin-bottom: 30px;')}
  text-transform: uppercase;
  ${breakpoints.medium(css`
    font-size: 22px;
    display: flex;
    flex-direction: column;
  `)};
  ${breakpoints.large(css`
    font-size: 26px;
    margin-top: 15px;
    display: block;
  `)};
`;

export const StyledCourtInfo = styled.div`
  font-size: 13px;
  opacity: 0.75;
  margin-bottom: 20px;
  ${breakpoints.medium(css`
    margin-bottom: 0;
  `)};
`;

const StyledMessageWrapper = styled.div`
  text-align: center;
`;

export const StyledMarketingMessage = styled(H5)`
  margin: 20px 5px 0;
  font-size: 14px;
  letter-spacing: 0.5px;
  line-height: 14px;
  text-align: left;
  display: inline-block;
  ${breakpoints.medium(css`
    text-align: center;
  `)};
`;

export const StyledArrowLink = styled(ArrowLink)`
  margin: 0 5px;
  display: inline-block;
  font-size: 14px;
`;

export const StyledCTA = styled.div`
  width: 100%;
  min-width: 282px;
  max-width: 368px;
  ${breakpoints.large(css`
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

export const StyledWatchButton = styled(Button)`
  ${fontHelvetica};
  font-size: 12px;
  max-width: 320px;
  ${breakpoints.medium(css`
    font-size: 16px;
    letter-spacing: 2.18px;
  `)};
`;

export const StyledSmallDivider = styled.span`
  border-right: solid 1px ${colors.coreLightMinus1};
  opacity: 0.25;
  margin: 0 10px;
  ${breakpoints.medium(css`
    margin: 0 13px;
  `)};
`;

export const StyledMatchInfo = styled(StyledCourtInfo)`
  color: ${colors.coreLightMinus1};
  margin-bottom: 24px;
  ${breakpoints.medium(css`
    margin-bottom: 24px;
  `)};
`;

const MatchHero = ({
  className,
  title,
  date,
  hour,
  courtInfo,
  labels,
  cTAText,
  cTALink,
  marketingMessage,
  marketingLink,
  marketingLinkText,
  displayCTA,
}) => (
  <StyledWrapper className={className}>
    <Labels labels={labels} />
    <StyledContent>
      <StyledBasicInfo>
        <H1>{title}</H1>
        <StyledTime hasCourtInfo={courtInfo}>
          {date} {date && hour && <StyledDivider />}
          {hour}
        </StyledTime>
        {courtInfo && <StyledCourtInfo>{courtInfo}</StyledCourtInfo>}
      </StyledBasicInfo>
      {displayCTA && (
        <StyledCTA>
          <Button href={cTALink}>{cTAText}</Button>
          {(marketingMessage || marketingLink) && (
            <StyledMessageWrapper>
              {marketingMessage && <StyledMarketingMessage>{marketingMessage}</StyledMarketingMessage>}
              {marketingLink && <StyledArrowLink href={marketingLink}>{marketingLinkText}</StyledArrowLink>}
            </StyledMessageWrapper>
          )}
        </StyledCTA>
      )}
    </StyledContent>
  </StyledWrapper>
);

MatchHero.defaultProps = {
  className: undefined,
  date: '',
  hour: '',
  courtInfo: '',
  marketingMessage: '',
  marketingLink: '',
  marketingLinkText: '',
  displayCTA: false,
};

MatchHero.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node.isRequired,
  date: PropTypes.string,
  hour: PropTypes.string,
  courtInfo: PropTypes.string,
  labels: labelsType.isRequired,
  cTAText: PropTypes.string.isRequired,
  cTALink: PropTypes.string.isRequired,
  marketingMessage: PropTypes.string,
  marketingLink: PropTypes.string,
  marketingLinkText: PropTypes.string,
  displayCTA: PropTypes.bool,
};

export const MatchHeroWithScore = ({
  className,
  scoreData,
  labels,
  date,
  courtInfo,
  displayWatchButton,
  watchButtonLinkProps,
  watchButtonText,
  onWatchButtonClick,
  highlightLastSet,
}) => (
  <StyledWrapper className={className}>
    <Labels labels={labels} />
    <StyledScoreWrapper>
      <SetsScore data={scoreData} highlightLastSet={highlightLastSet} />
    </StyledScoreWrapper>
    {(courtInfo || date) && (
      <StyledMatchInfo>
        {date}
        {date && courtInfo && <StyledSmallDivider />}
        {courtInfo}
      </StyledMatchInfo>
    )}
    {displayWatchButton && (
      <StyledWatchButton onClick={onWatchButtonClick} {...watchButtonLinkProps}>
        {watchButtonText}
      </StyledWatchButton>
    )}
  </StyledWrapper>
);

MatchHeroWithScore.defaultProps = {
  className: undefined,
  watchButtonText: 'WATCH',
  watchButtonLinkProps: null,
  highlightLastSet: false,
  date: '',
  courtInfo: '',
};

MatchHeroWithScore.propTypes = {
  className: PropTypes.string,
  watchButtonText: PropTypes.string,
  watchButtonLinkProps: PropTypes.shape({
    href: PropTypes.string.isRequired,
  }),
  date: PropTypes.string,
  courtInfo: PropTypes.string,
  labels: labelsType.isRequired,
  scoreData: setsScoreType.isRequired,
  displayWatchButton: PropTypes.bool.isRequired,
  onWatchButtonClick: PropTypes.func.isRequired,
  highlightLastSet: PropTypes.bool,
};

export default MatchHero;
