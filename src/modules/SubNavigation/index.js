import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import get from 'lodash/get';
import { rgba } from 'polished';
import * as breakpoints from '../../breakpoints';
import { bunting, white } from '../../colors';
import shopIcon from '../../assets/shop-icon.svg';
import Carousel, { StyledArrow, StyledArrowLeft, StyledContainer } from '../../components/Carousel';
import { LegacyHideOnMobile } from '../../hocs/withMatchMedia';

const StyledArrowCSS = css`
  height: 100%;
  background: transparent;
  padding: 0 6px;
  border-left: solid 1px ${rgba(white, 0.1)};
`;

export const StyledNavWrapper = styled.nav`
  display: flex;
  background: ${bunting};
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
    &:first-child {
      margin-left: 20px;
    }
  }
`;

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  margin-right: 35px;
  list-style-type: none;
  font-size: 14px;
  ${props =>
    props.withBorders &&
    css`
      border-right: 1px solid rgba(255, 255, 255, 0.15);
      border-left: 1px solid rgba(255, 255, 255, 0.15);
      padding: 0 18px 0 18px;
      margin-right: 18px;
    `}
  ${props => (props.type === 'shop' ? 'margin-left: auto;' : '')}
  ${breakpoints.medium(css`
    font-size: 16px;
  `)};
`;

const StyledLink = styled.a`
  color: ${white};
  text-decoration: none;
  cursor: pointer;
  position: relative;
  &:hover {
    opacity: 0.5;
  }
  ${props =>
    props.withArrow &&
    css`
      &:before,
      &:after {
        content: '';
        display: block;
        height: 9px;
        margin-top: -6px;
        position: absolute;
        transform: rotate(220deg);
        right: -15px;
        top: 10px;
        width: 0px;
        border-radius: 22px;
        width: 3px;
        background: white;
      }
      &:after {
        transform: rotate(135deg);
        top: 10px;
        right: -10px;
      }
    `}
`;

const StyledShopLink = styled.a`
  display: flex;
  align-items: center;
  color: ${white};
  text-decoration: none;
`;

export const StyledShopIcon = styled.img`
  margin-right: 10px;
  padding-bottom: 4px;
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
          {itemsWithoutShop.map(({ name, linkProps: { href, withArrow, withBorders, ...otherLinkProps } }) => (
            <StyledItem key={name} withBorders={withBorders}>
              <StyledLink href={href} {...otherLinkProps} withArrow={withArrow}>
                {name}
              </StyledLink>
            </StyledItem>
          ))}
        </Carousel>
        {shopItem && (
          <StyledItem key={shopItem.name} css={{ marginLeft: 'auto' }}>
            <StyledShopLink href={shopItemLink} target="_blank">
              <StyledShopIcon src={shopIcon} />
              {shopItem.name}
            </StyledShopLink>
          </StyledItem>
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
  withArrow: PropTypes.bool,
  withBorders: PropTypes.bool,
};

SubNavigation.defaultProps = {
  withArrow: false,
  withBorders: false,
};

SubNavigation.displayName = 'SubNavigation';

export default SubNavigation;
