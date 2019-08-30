/* eslint-disable react/prop-types */
import React from 'react';
import styled, { css } from 'react-emotion';
import { rgba } from 'polished';
import sortBy from 'lodash/sortBy';
import RightMenuItem from './RightMenuItem';
import { large } from '../../../breakpoints';
import { arsenic, cerulean, gunPowder } from '../../../colors';
import * as types from './sectionTypes';

const StyledColumn = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;

  ${props =>
    props.subMenuMobile &&
    css`
      position: fixed;
      bottom: 0;
      right: 0;
      top: 0;
      background: white;
      z-index: 1;
      padding: 20px;
      left: 100%;
      opacity: 0;
      transition: left 0.3s, opacity 0.3s;
    `};

  ${props =>
    props.isSubMenuOpen &&
    css`
      left: 0;
      opacity: 1;
      transition: left 0.3s, opacity 0.3s;
    `};

  ${props =>
    props.menuType === types.MENU.SPORTS &&
    css`
      height: 100%;
      padding-right: 20px;
      &:last-of-type {
        padding-right: 0;
      }

      ${props.columnType === types.COLUMN.ALL_SPORTS &&
        css`
          flex-basis: 100%;
        `};

      ${props.columnType === types.COLUMN.POPULAR_SPORTS &&
        css`
          flex-basis: 20%;
          display: none;
        `};
    `};

  ${props =>
    props.columnType === types.COLUMN.ABOUT_US &&
    css`
      flex-grow: 14;
    `};

  ${props =>
    large(css`
    ${props.columnType === types.COLUMN.POPULAR_SPORTS &&
      css`
        display: block;
      `};
     
    ${props.subMenuMobile &&
      css`
        display: none;
      `};
    };
  `)};
`;

const StyledItems = styled.ul`
  margin: 0;
  padding: 0;

  ${props =>
    large(css`
      ${props.columnType === types.COLUMN.ALL_SPORTS &&
        css`
          display: flex;
          flex-flow: wrap column;
          height: 385px;
          overflow-x: hidden;
        `};

      ${props.columnType === types.COLUMN.ABOUT_US &&
        css`
          columns: 150px 3;
          max-height: 200px;
          display: flex;
          flex-direction: column;
          flex-flow: wrap column;
        `};
    `)};
`;

const StyledArrowContainer = styled.div`
  font-size: 30px;
  position: absolute;
  top: 28px;
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

const StyledArrow = styled.span`
  background: ${cerulean};
  height: 2px;
  display: block;
  width: 20px;
  position: relative;
  top: 15px;
  &:before,
  &:after {
    position: absolute;
    display: block;
    left: 0;
    border-top: 2px solid ${cerulean};
    content: '';
    width: 10px;
    transform-origin: left;
    transform: rotate(45deg);
  }
  &:before {
    transform: rotate(-45deg);
  }
`;

const StyledTitle = styled.div`
  ${props =>
    props.subMenuMobile &&
    css`
      border-bottom: 1px solid ${rgba(gunPowder, 0.15)};
      margin-top: 0;
      padding: 0 0 0 30px;
      line-height: 50px;
      font-size: 20px;
    `};

  ${props =>
    !props.subMenuMobile &&
    css`
      color: ${rgba(arsenic, 0.5)};
      border-bottom: 1px solid ${rgba(arsenic, 0.15)};
      width: 100%;
      display: inline-block;
      text-transform: uppercase;
      font-weight: bold;
      padding: 15px 0;
      font-size: 16px;
      white-space: nowrap;
    `};

  ${large(css`
    font-size: 14px;
    line-height: 17px;
    margin: 50px 0 19px 0;
  `)};
`;

const sortIfNecessary = (items, columnType, isMobileMenu) => {
  if (columnType === types.COLUMN.ALL_SPORTS && !isMobileMenu) {
    return sortBy(items, item => item.name.toLowerCase());
  }
  return items;
};

const RightMenuSection = ({
  items = [],
  name,
  columnType,
  menuType,
  isMobileMenu,
  onSubMenuOpen,
  onSubMenuClose,
  subMenuMobile,
  isSubMenuOpen,
  selectedMobileMenuItem,
}) => {
  const title = (selectedMobileMenuItem && selectedMobileMenuItem.name) || name;
  const listItems = (selectedMobileMenuItem && selectedMobileMenuItem.items) || items;

  return (
    <StyledColumn
      menuType={menuType}
      columnType={columnType}
      subMenuMobile={subMenuMobile}
      isSubMenuOpen={isSubMenuOpen}
      data-test={subMenuMobile && `subnav-sports-mobile`}
    >
      {subMenuMobile && (
        <StyledArrowContainer onClick={() => onSubMenuClose()}>
          <StyledArrow />
        </StyledArrowContainer>
      )}
      <StyledTitle subMenuMobile={subMenuMobile}>{title}</StyledTitle>
      <StyledItems data-test={subMenuMobile && 'mobile-menu-list'} columnType={columnType}>
        {listItems &&
          sortIfNecessary(listItems, columnType, isMobileMenu).map(item => (
            <RightMenuItem
              subMenuMobile={subMenuMobile}
              isMobileMenu={isMobileMenu}
              key={item.name}
              item={item}
              menuType={menuType}
              columnType={columnType}
              onSubMenuOpen={onSubMenuOpen}
            />
          ))}
      </StyledItems>
    </StyledColumn>
  );
};

export default RightMenuSection;
