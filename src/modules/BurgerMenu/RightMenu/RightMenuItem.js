/* eslint-disable react/prop-types */
import React from 'react';
import styled, { css } from 'react-emotion';
import kebabCase from 'lodash/kebabCase';
import { medium, large } from '../../../breakpoints';
import { arsenic, cerulean, regentGray, turquoiseBlue, whiteLilac } from '../../../colors';
import * as types from './sectionTypes';

const StyledItem = styled.li`
  list-style-type: none;
  padding: 0;
  margin: 0;
  line-height: 50px;
`;

const StyledItemLink = styled.a`
  color: ${arsenic};
  font-weight: bold;
  text-decoration: none;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;

  ${medium(css`
    font-size: 18px;
  `)};

  ${large(css`
    font-size: 24px;
  `)}

  &:hover {
    color: ${regentGray};
  }

  ${props =>
    props.columnType === types.COLUMN.POPULAR_SPORTS &&
    css`
      color: ${cerulean};
      &:hover {
        color: ${turquoiseBlue};
      }
    `};

  ${({ columnType, item }) =>
    columnType === types.COLUMN.ALL_SPORTS &&
    item.items &&
    item.items.length > 0 &&
    css`
      display: flex;
      justify-content: space-between;
      &::after {
        content: '>';
        color: ${whiteLilac};
        margin-right: 10px;
      }
      ${large(css`
        &::after {
          display: none;
        }
      `)};
    `};
`;

const RightMenuItem = ({ item, menuType, columnType, isMobileMenu, onSubMenuOpen }) => (
  <StyledItem>
    <StyledItemLink
      onClick={e => {
        if (menuType === types.MENU.SPORTS && isMobileMenu && item.items && item.items.length) {
          e.preventDefault();
          onSubMenuOpen(item);
        }
      }}
      href={item.link ? item.link.url : '#'}
      item={item}
      columnType={columnType}
      data-test={kebabCase(
        `${menuType === types.MENU.SPORTS && isMobileMenu && item.items && item.items.length ? 'mobile' : 'desktop'}-${
          item.name
        }`
      )}
    >
      {item.name}
    </StyledItemLink>
  </StyledItem>
);

export default RightMenuItem;
