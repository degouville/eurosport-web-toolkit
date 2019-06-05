import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import get from 'lodash/get';
import * as breakpoints from '../../breakpoints';
import { brandBase, coreLightMinus1, loftySilver } from '../../colors';
import shopIcon from '../../assets/shop-icon.svg';
import Carousel, { StyledArrow, StyledArrowLeft, StyledContainer } from '../../components/Carousel';
import { LegacyHideOnMobile } from '../../hocs/withMatchMedia';

const StyledArrowCSS = css`
  height: 100%;
  background: transparent;
  padding: 0 6px;
  border-left: solid 1px ${loftySilver};
`;

export const StyledNavWrapper = styled.nav`
  display: flex;
  background: ${brandBase};
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  height: 50px;

  ${StyledArrow} {
    ${StyledArrowCSS}
    margin-right: 20px;
  }
  ${StyledArrowLeft} {
    ${StyledArrowCSS}
  }
  ${StyledContainer} {
    display: flex;
    align-items: center;
  }
`;

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  margin-right: 35px;
  list-style-type: none;
  font-size: 14px;

  ${props => (props.type === 'shop' ? 'margin-left: auto;' : '')}
  ${breakpoints.medium(css`
    font-size: 16px;
  `)};

  &:first-of-type {
    margin-left: 14px;
  }
`;

const StyledLink = styled.a`
  color: ${coreLightMinus1};
  text-decoration: none;
`;

const StyledShopLink = styled.a`
  display: flex;
  align-items: center;
  color: ${coreLightMinus1};
  text-decoration: none;
`;

export const StyledShopIcon = styled.img`
  margin-left: auto;
  margin-right: 10px;
`;

const getShop = items => items.find(item => item.type && item.type === 'shop');

const getItemsWithoutShop = items => items.filter(item => !item.type || (item.type && item.type !== 'shop'));

const SubNavigation = ({ items, ...props }) => {
  const itemsWithoutShop = getItemsWithoutShop(items);
  const shopItem = getShop(items);
  const shopItemLink = get(shopItem, 'linkProps.href', null);

  return (
    <LegacyHideOnMobile>
      <StyledNavWrapper {...props}>
        <Carousel slideMargin={0}>
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
            <StyledItem key={shopItem.name}>
              <StyledShopLink href={shopItemLink}>
                <StyledShopIcon src={shopIcon} />
                {shopItem.name}
              </StyledShopLink>
            </StyledItem>
          </>
        )}
      </StyledNavWrapper>
    </LegacyHideOnMobile>
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
