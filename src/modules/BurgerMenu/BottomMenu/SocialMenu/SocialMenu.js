import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';

import SocialIcon from '../../../../elements/SocialIcon';
import Link from '../../../../elements/Link';
import { white } from '../../../../colors';
import { large, medium } from '../../../../breakpoints';

const StyledWrapper = styled.div`
  color: ${white};
  display: flex;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  height: auto;
  padding-top: 15px;

  ${medium(css`
    padding-top: 0;
  `)}
`;
const StyledTitle = styled.div`
  font-size: 12px;
  font-weight: bold;
`;
const StyledSocialItems = styled.ul`
  margin: 0;
  padding-left: 10px;
  list-style-type: none;
  display: flex;
  align-items: center;

  ${large(css`
    padding-left: 20px;
  `)}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${white};
  vertical-align: middle;
  margin-right: 10px;
  font-size: 12px;

  ${large(css`
    margin-right: 20px;
  `)}
`;

const SocialMenu = ({ name, items, isMobile }) => {
  if (items.length === 0) return null;

  return (
    <StyledWrapper>
      <StyledTitle>{name}</StyledTitle>
      <StyledSocialItems>
        {items &&
          items.map(({ name: itemName, link, icon }) => (
            <li key={itemName}>
              <StyledLink href={link.url} target={link.blank ? '_blank' : '_self'}>
                <SocialIcon iconText={isMobile ? '' : itemName} iconType={icon} />
              </StyledLink>
            </li>
          ))}
      </StyledSocialItems>
    </StyledWrapper>
  );
};

SocialMenu.defaultProps = {
  isMobile: false,
};

SocialMenu.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      blank: PropTypes.bool,
      name: PropTypes.string,
      icon: PropTypes.string,
    })
  ).isRequired,
  isMobile: PropTypes.bool,
};

SocialMenu.displayName = 'SocialMenu';

export default SocialMenu;
