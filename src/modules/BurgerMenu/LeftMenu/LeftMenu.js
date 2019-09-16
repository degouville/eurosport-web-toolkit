import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';

import LeftMenuItem, { LeftMenuItemPropType } from './LeftMenuItem';
import Logo from '../../../elements/Logo';

import { large } from '../../../breakpoints';
import { cerulean, ebony, gunPowder } from '../../../colors';

const StyledTabs = styled.ul`
  width: 21.25%;
  min-width: 100px;
  background: ${ebony};

  ${large(css`
    width: 195px;
  `)};
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  list-style: none;
  height: 100%;
  text-align: center;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const StyledTabLogo = styled.a`
  box-sizing: border-box;
  padding: 0 25px 0 17px;
  min-height: 53px;
  width: 100%;
  display: flex;
  flex-shrink: 1;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${gunPowder};
  &:hover {
    background-color: ${cerulean};
  }
  ${large(css`
    height: 157px;
  `)};

  &&& ${Logo.css} {
    width: 20px;
    height: 23px;
    margin: 0;
  }

  ${large(css`
    padding: 0;
    &&& ${Logo.css} {
      width: 140px;
      margin: 0;
    }
  `)}
`;

const LeftMenu = ({ items, selectedMenuId, onMenuSelected, isMobileMenu, homePageUrl }) => (
  <StyledTabs>
    <StyledTabLogo href={homePageUrl} data-test="burger-logo">
      <Logo small={isMobileMenu} />
    </StyledTabLogo>
    {items &&
      items.map(item => (
        <LeftMenuItem
          isMobileMenu={isMobileMenu}
          selectedMenuId={selectedMenuId}
          onMenuSelected={onMenuSelected}
          key={item.id}
          item={item}
        />
      ))}
  </StyledTabs>
);

LeftMenu.defaultProps = {
  homePageUrl: '#',
  items: [],
};

LeftMenu.propTypes = {
  items: PropTypes.arrayOf(LeftMenuItemPropType),
  selectedMenuId: PropTypes.number.isRequired,
  onMenuSelected: PropTypes.func.isRequired,
  isMobileMenu: PropTypes.bool.isRequired,
  homePageUrl: PropTypes.string,
};

LeftMenu.displayName = 'LeftMenu';

export default LeftMenu;
