import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import * as breakpoints from '../../breakpoints';
import * as colors from '../../colors';
import shopIcon from '../../assets/shop-icon.svg';

const StyledWrapper = styled.nav`
  background: ${colors.brandBase};
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding: 12px 18px;

  ${breakpoints.medium(css`
    padding: 16px 32px;
  `)};
`;

const StyledItems = styled.ul`
  display: flex;
  align-items: center;
`;

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  margin-right: 30px;
  list-style-type: none;
  font-size: 14px;
  ${props => (props.type === 'shop' ? 'margin-left: auto;' : '')}
  ${breakpoints.medium(css`
    font-size: 16px;
  `)};

  &:last-of-type {
    margin-right: 0;
  }
`;

const StyledLink = styled.a`
  color: ${colors.coreLightMinus1};
  text-decoration: none;
`;

const StyledShopIcon = styled.img`
  margin-right: 10px;
`;

const SubNavigation = ({ items, ...props }) => (
  <StyledWrapper {...props}>
    <StyledItems>
      {items.map(({ name, type, linkProps: { href, ...otherLinkProps } }) => (
        <StyledItem key={name} type={type}>
          {type && type === 'shop' && <StyledShopIcon src={shopIcon} />}
          <StyledLink href={href} {...otherLinkProps}>
            {name}
          </StyledLink>
        </StyledItem>
      ))}
    </StyledItems>
  </StyledWrapper>
);

SubNavigation.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      linkProps: PropTypes.shape({
        href: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

SubNavigation.displayName = 'SubNavigation';

export default SubNavigation;
