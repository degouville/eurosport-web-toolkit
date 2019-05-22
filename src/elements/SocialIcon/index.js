import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import { BaseImage, BaseText } from './baseIconStyles';

import FacebookIcon from '../icons/social-icons/facebook';
import SnapchatIcon from '../icons/social-icons/snapchat';
import InstagramIcon from '../icons/social-icons/instagram';
import TwitterIcon from '../icons/social-icons/twitter';

export const StyledFacebook = styled(BaseImage)`
  background-color: #3d5a98;
`;

export const StyledSnapchat = styled(BaseImage)`
  background-color: #fffc00;
`;

export const StyledInstagram = styled(BaseImage)`
  padding: 0;
`;

export const StyledTwitter = styled(BaseImage)`
  background-color: #0090fe;
`;

const SocialIcon = ({ iconType, iconText }) => (
  <React.Fragment>
    {iconType === 'facebook' && (
      <StyledFacebook>
        <FacebookIcon />
      </StyledFacebook>
    )}
    {iconType === 'twitter' && (
      <StyledTwitter>
        <TwitterIcon />
      </StyledTwitter>
    )}
    {iconType === 'instagram' && (
      <StyledInstagram>
        <InstagramIcon />
      </StyledInstagram>
    )}
    {iconType === 'snapchat' && (
      <StyledSnapchat>
        <SnapchatIcon />
      </StyledSnapchat>
    )}
    {iconText && <BaseText>{iconText}</BaseText>}
  </React.Fragment>
);

SocialIcon.propTypes = {
  iconType: PropTypes.oneOf(['facebook', 'twitter', 'snapchat', 'instagram']).isRequired,
  iconText: PropTypes.string,
};

SocialIcon.defaultProps = {
  iconText: '',
};

export default SocialIcon;
