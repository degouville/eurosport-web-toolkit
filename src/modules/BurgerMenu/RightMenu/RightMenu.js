import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';

import RightMenuSection from './RightMenuSection';
import { large } from '../../../breakpoints';
import * as types from './sectionTypes';

const StyledWrapper = styled.div`
  flex-grow: 1;
  min-width: 79px;
  box-sizing: border-box;
  height: 100%;

  ${large(css`
    width: calc(100% - 195px);
  `)};
`;

const StyledContainer = styled.div`
  padding: 0 0 0 15px;
  height: 100%;

  ${props =>
    props.menuType === types.MENU.SPORTS &&
    css`
      display: flex;
    `};
  ${props =>
    props.menuType !== types.MENU.SPORTS &&
    css`
      overflow-y: auto;
    `};

  ${large(css`
    padding: 0 0 0 20px;
  `)};
`;

class RightMenu extends Component {
  state = {
    selectedMobileMenuItem: -1,
    isSubMenuOpen: false,
  };

  onSubMenuOpen = item => {
    this.setState({ selectedMobileMenuItem: item, isSubMenuOpen: true });
  };

  onSubMenuClose = () => {
    this.setState({ isSubMenuOpen: false });
  };

  render() {
    const { items, isMobileMenu, selectedMenuId } = this.props;
    const selectedMenu = items && items.find(item => item.id === selectedMenuId);
    const { selectedMobileMenuItem, isSubMenuOpen } = this.state;
    if (!selectedMenu) return null;
    return (
      <StyledWrapper>
        <RightMenuSection
          selectedMobileMenuItem={selectedMobileMenuItem}
          subMenuMobile
          isSubMenuOpen={isSubMenuOpen}
          onSubMenuClose={this.onSubMenuClose}
        />
        <StyledContainer menuType={selectedMenu.menuType}>
          {selectedMenu.sections &&
            selectedMenu.sections.map(section => (
              <RightMenuSection
                isMobileMenu={isMobileMenu}
                menuId={selectedMenu.id}
                key={section.name}
                columnType={section.columnType}
                menuType={selectedMenu.menuType}
                items={section.items}
                name={section.name}
                onSubMenuOpen={this.onSubMenuOpen}
              />
            ))}
        </StyledContainer>
      </StyledWrapper>
    );
  }
}

RightMenu.defaultProps = {
  items: [],
  isMobileMenu: false,
  selectedMenuId: null,
};

RightMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      sections: PropTypes.arrayOf(
        PropTypes.shape({
          items: PropTypes.arrayOf(
            PropTypes.shape({
              url: PropTypes.string,
              blank: PropTypes.bool,
              name: PropTypes.string,
              icon: PropTypes.string,
            })
          ),
        })
      ),
    })
  ),
  isMobileMenu: PropTypes.bool,
  selectedMenuId: PropTypes.number,
};

RightMenu.displayName = 'RightMenu';

export default RightMenu;
