import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import facebook from 'src/assets/social-icons/facebook.svg';
import twitter from 'src/assets/social-icons/twitter.svg';
import whatsapp from 'src/assets/social-icons/whatsapp.svg';

const Wrapper = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${({ theme }) => css`rgba(${theme.shareIcons.background}, 0.05)`};
  border-radius: 50%;
  position: relative;
  border: 1px solid ${({ theme }) => theme.shareIcons.color};
  cursor: pointer;
`;

const BaseIcon = styled.span`
  position: absolute;
  ${({ size }) =>
    size &&
    css`
      background-size: ${size / 2}px ${size / 2}px;
    `}
  display: inline-block;
  vertical-align: middle;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.5;
  transition: opacity 0.2s linear;
  & :hover {
    opacity: 1;
  }
`;

export const SocialIcon = styled(BaseIcon)`
  position: relative;
  ${({ icon }) =>
    icon &&
    css`
      background-image: url(${icon});
    `}
`;

const ShareIcon = ({ icon, onClick, size }) => (
  <Wrapper size={size}>
    {icon === 'facebook' && <SocialIcon icon={facebook} size={size} onClick={onClick} />}
    {icon === 'twitter' && <SocialIcon icon={twitter} size={size} onClick={onClick} />}
    {icon === 'whatsapp' && <SocialIcon icon={whatsapp} size={size} onClick={onClick} />}
  </Wrapper>
);

ShareIcon.propTypes = {
  icon: PropTypes.oneOf(['facebook', 'twitter', 'whatsapp']).isRequired,
  size: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

ShareIcon.defaultProps = {
  onClick: null,
};

export default ShareIcon;
