import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import LinesEllipsis from 'react-lines-ellipsis';
import LinesEllipsisResponsive from 'react-lines-ellipsis/lib/responsiveHOC';
import CardPlaceholder from 'src/assets/card-placeholder.jpg';
import * as colors from '../../colors';
import PlayIcon, { hoverStyles as playIconHoverStyle } from '../../elements/PlayIcon';
import ChannelIcon from '../../elements/ChannelIcon';
import Link from '../../elements/Link';
import LiveLabel from '../../elements/LiveLabel';
import { fontHelvetica } from '../../typography';

const ResponsiveEllipsis = LinesEllipsisResponsive()(LinesEllipsis);

export const StyledImage = styled.div`
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: 50% 0;
  height: 100%;
`;

const StyledHeader = styled.div`
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  flex: 0 0 139px;

  @media (min-width: 900px) {
    flex: 0 0 159px;
  }

  :before {
    content: '';
    position: absolute;
    height: 100%;
    width: 101%;
    background: radial-gradient(circle, transparent, ${colors.brandPlus2} 100%);
    opacity: 0.5;
  }
`;

export const StyledLiveLabel = styled(LiveLabel)`
  position: absolute;
  top: 9px;
  right: 10px;
  font-size: 11px;
  padding: 3px 6px;
  font-weight: bold;
  letter-spacing: inherit;
`;

const StyledPlayIcon = styled(PlayIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

const StyledCard = styled(Link)`
  ${fontHelvetica};
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  display: flex;
  border-radius: 2px;
  text-decoration: none;
  overflow: hidden;
  background-color: ${colors.brandBase};
  white-space: normal;

  width: 288px;
  height: 76px;

  @media (min-width: 900px) {
    width: 335px;
    height: 88px;
  }

  &:hover {
    ${StyledHeader}:before {
      opacity: 0.1;
    }

    ${playIconHoverStyle}
  }
`;

const StyledChannelIcon = styled(ChannelIcon)`
  top: 10px;
  left: 10px;
  position: absolute;
  &:before {
    position: absolute;
    display: block;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    content: '';
    background: hsla(100%, 100%, 0%, 1);
  }
  path {
    fill: white;
  }
`;

const StyledContent = styled.div`
  box-sizing: border-box;
  padding: 8px 16px;
  line-height: 1.3;
  flex: 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${colors.actionTwoDarkBase};
  font-size: 13px;
  flex-basis: 0;
`;

const StyledFooter = styled.div`
  box-sizing: border-box;
  color: rgba(251, 251, 255, 0.8);
  font-size: 11px;
  border-top: 1px solid rgba(242, 243, 245, 0.4);
  padding-top: 8px;
`;

const StyledTitle = styled.div`
  box-sizing: border-box;
  font-weight: bold;
  color: ${colors.coreLightBase};
  margin: 0 0 10px;
`;

const WatchbarCard = ({ card, trackingPosition, ...props }) => {
  const { img, url, playerChannelNameAnalytics, titleAnalytics, isLive, liveLabel, title, startTime, endTime } = card;

  const dataTracking = `what-to-watch-bar:block-${trackingPosition +
    1}:${playerChannelNameAnalytics}:${titleAnalytics}`;

  return (
    <StyledCard {...props} href={url} data-aa-livetowatch={dataTracking}>
      <StyledHeader>
        <StyledImage src={img || CardPlaceholder} />
        <StyledChannelIcon height={15} type={card.channel} />
        <StyledPlayIcon height={32} />
        {isLive && <StyledLiveLabel>{liveLabel}</StyledLiveLabel>}
      </StyledHeader>
      <StyledContent {...props}>
        <StyledTitle>
          <ResponsiveEllipsis text={title} maxLine={2} ellipsis="..." trimRight basedOn="letters" />
        </StyledTitle>
        <StyledFooter>
          {startTime} - {endTime}
        </StyledFooter>
      </StyledContent>
    </StyledCard>
  );
};

WatchbarCard.defaultProps = {
  linkComponent: undefined,
};

WatchbarCard.propTypes = {
  card: PropTypes.shape({
    img: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isLive: PropTypes.bool,
    title: PropTypes.string.isRequired,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    channel: PropTypes.string,
    liveLabel: PropTypes.string,
    playerChannelNameAnalytics: PropTypes.string.isRequired,
    titleAnalytics: PropTypes.string.isRequired,
  }).isRequired,
  linkComponent: PropTypes.func,
  trackingPosition: PropTypes.number.isRequired,
};

WatchbarCard.displayName = 'Cards.Content';

export default WatchbarCard;
