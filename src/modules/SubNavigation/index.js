import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import * as breakpoints from '../../breakpoints';
import * as colors from '../../colors';
import shopIcon from '../../assets/shop-icon.svg';
import Carousel from '../../components/Carousel';

const StyledWrapper = styled.nav`
  display: flex;
  background: ${colors.brandBase};
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding: 12px 18px;

  ${breakpoints.medium(css`
    padding: 16px 32px;
  `)};
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
  margin-left: auto;
  margin-right: 10px;
`;

const getShop = items => items.find(item => item.type && item.type === 'shop');

const getItemsWithoutShop = items => items.filter(item => !item.type || (item.type && item.type !== 'shop'));

const SubNavigation = ({ items, ...props }) => {
  const itemsWithoutShop = getItemsWithoutShop(items);
  const shopItem = getShop(items);
  return (
    <StyledWrapper {...props}>
      <Carousel>
        {itemsWithoutShop.map(({ name, linkProps: { href, ...otherLinkProps } }) => (
          <StyledItem key={name}>
            <StyledLink href={href} {...otherLinkProps}>
              {name}
            </StyledLink>
          </StyledItem>
        ))}
      </Carousel>
      {shopItem && (
        <>
          <StyledShopIcon src={shopIcon} />
          <StyledItem key={shopItem.name}>
            <StyledLink href={shopItem.href}>{shopItem.name}</StyledLink>
          </StyledItem>
        </>
      )}
    </StyledWrapper>
  );
};

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
