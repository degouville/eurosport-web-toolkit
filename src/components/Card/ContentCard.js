import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import ChannelIcon from 'src/elements/ChannelIcon';
import CardPlaceholder from 'src/assets/card-placeholder.jpg';
import PlayIcon, { hoverStyles as playIconHoverStyle } from '../../elements/PlayIcon';
import * as colors from '../../colors';
import Link from '../../elements/Link';
import LiveLabel from '../../elements/LiveLabel';
import CardDetails from './CardDetails';

export const StyledImage = styled.div`
  height: 180px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: 50% 0;
  display: block;
`;

const StyledHeader = styled.div`
  position: relative;
  overflow: hidden;

  :before {
    content: '';
    position: absolute;
    height: 100%;
    width: 101%;
    background: radial-gradient(circle, transparent, ${colors.brandPlus2} 100%);
    opacity: 0.5;
  }
`;

export const StyledPlayIcon = styled(PlayIcon)`
  position: absolute;
  bottom: 17px;
  left: 16px;
`;

const StyledCard = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 2px;
  text-decoration: none;
  overflow: hidden;
  background-color: ${colors.brandBase};

  &:hover {
    ${StyledHeader}:before {
      opacity: 0.1;
    }

    ${playIconHoverStyle}
  }
`;

export const StyledLiveLabel = styled(LiveLabel)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ContentCard = ({ card, type, ...props }) => {
  const { url, liveLabel, ...cardDetails } = card;
  const isLive = type === 'live';
  const isPlayable = isLive || type === 'vod';
  const icon = isLive ? <ChannelIcon height={15} type={card.channel} /> : null;

  return (
    <StyledCard {...props} href={url} data-test="content-card">
      <StyledHeader>
        <StyledImage src={card?.img || CardPlaceholder} />
        {isPlayable && <StyledPlayIcon height={50} />}
        {isLive && <StyledLiveLabel>● {liveLabel}</StyledLiveLabel>}
      </StyledHeader>
      <CardDetails card={cardDetails} icon={icon} />
    </StyledCard>
  );
};

ContentCard.defaultProps = {
  linkComponent: undefined,
};

ContentCard.propTypes = {
  card: PropTypes.shape({
    img: PropTypes.string,
    url: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    timestamp: PropTypes.string,
    channel: PropTypes.string,
    liveLabel: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf(['vod', 'article', 'live']).isRequired,
  linkComponent: PropTypes.func,
};

ContentCard.displayName = 'Cards.Content';

export default ContentCard;
