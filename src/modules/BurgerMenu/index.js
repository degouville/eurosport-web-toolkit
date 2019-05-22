/* eslint-disable react/forbid-prop-types */
import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';

import Cross from '../../elements/icons/close-cross';
import LeftMenu from './LeftMenu/LeftMenu';
import RightMenu from './RightMenu/RightMenu';
import BottomMenu from './BottomMenu/BottomMenu';

import { points, large } from '../../breakpoints';
import withMatchMedia from '../../hocs/withMatchMedia';
import { BOTTOM_MENU_LINKS_IDS, BOTTOM_MENU_SOCIAL_ID, ALL_SPORTS_MENU_ID, MORE_MENU_ID } from './constants';

const StyledModal = styled.div`
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: white;
  color: black;
  z-index: 10;
  ${props =>
    props.isOpen &&
    css`
      display: block;
    `};
`;

const StyledButtonClosed = styled.a`
  box-sizing: border-box;
  position: absolute;
  right: 25px;
  top: 15px;
  width: 20px;
  height: 20px;
  z-index: 10;
  background-size: 20px 20px;
  &:hover {
    cursor: pointer;
  }

  ${large(css`
    right: 35px;
    top: 35px;
  `)}
`;

const StyledMenu = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: stretch;
`;

const StyledMenuTop = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  min-height: 20px;
  height: 100%;
`;

export class BurgerMenu extends React.Component {
  constructor(props) {
    super(props);
    const { items } = this.props;
    this.topMenu = items.filter(({ id }) => BOTTOM_MENU_LINKS_IDS.indexOf(id) === -1 && id !== BOTTOM_MENU_SOCIAL_ID);
    const hasAllSportsMenu = this.topMenu.filter(i => i.id === ALL_SPORTS_MENU_ID).length > 0;
    const selectedMenuId = hasAllSportsMenu ? ALL_SPORTS_MENU_ID : MORE_MENU_ID;
    this.state = {
      selectedMenuId,
    };
  }

  onMenuSelected = id => {
    this.setState({ selectedMenuId: id });
  };

  render() {
    const { items, onClose, isOpen, isMobileMenu, homePageUrl } = this.props;
    const { selectedMenuId } = this.state;
    const bottomMenu = {
      links: items.filter(i => BOTTOM_MENU_LINKS_IDS.indexOf(i.id) !== -1),
      socials: items.find(i => i.id === BOTTOM_MENU_SOCIAL_ID),
    };

    return (
      <StyledModal data-test="modal-container" isOpen={isOpen}>
        <StyledButtonClosed onClick={onClose} data-test="burger-menu-close" href="#">
          <Cross />
        </StyledButtonClosed>
        <StyledMenu>
          <StyledMenuTop>
            <LeftMenu
              isMobileMenu={isMobileMenu}
              items={this.topMenu}
              selectedMenuId={selectedMenuId}
              onMenuSelected={this.onMenuSelected}
              homePageUrl={homePageUrl}
            />
            <RightMenu isMobileMenu={isMobileMenu} items={this.topMenu} selectedMenuId={selectedMenuId} />
          </StyledMenuTop>
          <BottomMenu isMobileMenu={isMobileMenu} links={bottomMenu.links} socials={bottomMenu.socials} />
        </StyledMenu>
      </StyledModal>
    );
  }
}

BurgerMenu.propTypes = {
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
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isMobileMenu: PropTypes.bool.isRequired,
  homePageUrl: PropTypes.string.isRequired,
};

BurgerMenu.displayName = 'BurgerMenu';

const BurgerMenuWithMatchMedia = withMatchMedia(`(max-width: ${points.large - 1}px)`, 'isMobileMenu')(BurgerMenu);

BurgerMenuWithMatchMedia.propTypes = {
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
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  homePageUrl: PropTypes.string.isRequired,
};

export default BurgerMenuWithMatchMedia;
