import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { rgba } from 'polished';
import Icon from '../../elements/Icon';
import PlayIcon from '../../elements/PlayIcon';
import * as colors from '../../colors';

const StyledImage = styled.img`
  width: 100%;
  display: block;
`;

const StyledHeader = styled.div`
  position: relative;

  :before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background: radial-gradient(circle, rgba(14, 20, 61, 0) 0, #0e143d 100%);
    opacity: 0.5;
  }
`;

export const StyledPlayIcon = styled(PlayIcon)`
  position: absolute;
  bottom: 17px;
  left: 16px;
`;

const StyledCard = styled.a`
  border-radius: 2px;
  box-shadow: 0 1px 0 0 ${rgba(colors.mirage, 0.75)}};
  overflow: hidden;
  display: block;
  text-decoration: none;

  &:hover {
    ${StyledHeader}:before {
      opacity: 0.1;
    }

    ${StyledPlayIcon} {
      border-color: white;
    }
  }
`;

const StyledContent = styled.div`
  padding: 6px 10px;
  line-height: 1.3;
  background-color: ${colors.bunting};
`;

const StyledCategory = styled.p`
  text-transform: uppercase;
  color: ${colors.turquoiseBlue};
  font-size: 12px;
  letter-spacing: 1px;
`;

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  border-top: 1px solid ${colors.whiteLilac};
  color: ${colors.santasGray};
  font-size: 14px;

  * :nth-child(2) {
    margin-left: 10px;
    padding-left: 10px;
    border-left: 1px solid ${colors.whiteLilac};
    padding: 8px;
  }
`;

const StyledTitle = styled.p`
  font-weight: bold;
  color: ${colors.whiteLilac};
`;

const StyledDescription = styled.p`
  color: ${colors.whiteLilac};
`;

export const StyledLiveLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  border-radius: 2px;
  background-color: ${colors.utahCrimson};
  color: ${colors.white};
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 1.2px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const StyledTimeStamp = styled.p`
  padding: 8px 0;
`;

const ContentCard = ({ card, type }) => {
  const { img, url, category, title, description, timestamp, channel } = card;
  const isLive = type === 'live';
  const isPlayable = isLive || type === 'vod';

  return (
    <StyledCard href={url}>
      <StyledHeader>
        <StyledImage src={img} alt={title} />
        {isPlayable && <StyledPlayIcon height={64} />}
        {isLive && <StyledLiveLabel>Live</StyledLiveLabel>}
      </StyledHeader>
      <StyledContent>
        <StyledCategory>{category}</StyledCategory>
        <StyledTitle>{title}</StyledTitle>
        {description && <StyledDescription>{description}</StyledDescription>}
        <StyledFooter>
          {isLive && <Icon height={15} type={channel} />}
          <StyledTimeStamp>{timestamp}</StyledTimeStamp>
        </StyledFooter>
      </StyledContent>
    </StyledCard>
  );
};

ContentCard.propTypes = {
  card: PropTypes.shape({
    img: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    timestamp: PropTypes.string,
    channel: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf(['vod', 'article', 'live']).isRequired,
};

export default ContentCard;
