import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import ShareIcon from 'src/elements/ShareIcon';
import { isMobile } from 'react-device-detect';

const ShareIconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ShareIconsWrapper = styled.div`
  width: ${({ size, numberIcons }) => size * numberIcons + numberIcons * 10}px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ShareLabel = styled.div`
  color: ${({ theme }) => theme.shareIcons.color};
`;

const ShareIcons = ({ size, label, whatsappCTA, facebookCTA, twitterCTA }) => {
  const CTA = [whatsappCTA, facebookCTA, twitterCTA];
  const numberIcons = CTA.filter(el => el !== undefined).length;
  return (
    <ShareIconsContainer>
      <ShareLabel>{label}</ShareLabel>
      <ShareIconsWrapper size={size} numberIcons={isMobile ? numberIcons : numberIcons - 1}>
        {whatsappCTA && isMobile && <ShareIcon size={size} icon="whatsapp" onClick={whatsappCTA} />}
        {facebookCTA && <ShareIcon size={size} icon="facebook" onClick={facebookCTA} />}
        {twitterCTA && <ShareIcon size={size} icon="twitter" onClick={twitterCTA} />}
      </ShareIconsWrapper>
    </ShareIconsContainer>
  );
};

ShareIcons.propTypes = {
  size: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  whatsappCTA: PropTypes.func.isRequired,
  facebookCTA: PropTypes.func.isRequired,
  twitterCTA: PropTypes.func.isRequired,
};

export default ShareIcons;
