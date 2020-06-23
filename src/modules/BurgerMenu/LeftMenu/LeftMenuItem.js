import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { rgba } from 'polished';
import { large } from '../../../breakpoints';
import { cerulean, white, utahCrimson } from '../../../colors';

export const StyledItemLink = styled.a`
  display: block;
  color: ${white};
  width: 100%;
  text-decoration: none;
  text-align: center;
  border-bottom: 1px solid ${rgba(white, 0.15)};
  cursor: pointer;
`;

const StyledItem = styled.li`
  padding: 0 10px;

  ${StyledItemLink} {
    font-size: 12px;
    line-height: 14px;
    padding: 18px 0;

    ${large(css`
      padding: 22px 0;
      font-size: 14px;
      line-height: 17px;
    `)};
  }

  &:hover {
    background: ${cerulean};
  }

  ${props =>
    props.isActive &&
    css`
      background: ${cerulean};
    `};

  ${props =>
    props.isBottom &&
    css`
      margin-top: auto;
      ${StyledItemLink} {
        font-size: 10px;
      }
    `};

  ${props =>
    props.isWatch &&
    css`
      background: ${utahCrimson};
      text-transform: uppercase;

      &:hover {
        background: ${utahCrimson};
      }
    `};
`;

const LeftMenuItem = ({ item, selectedMenuId, onMenuSelected, isMobileMenu, ...props }) => (
  <StyledItem isActive={item.id === selectedMenuId} isBottom={item.isBottom} isWatch={item.isWatch} {...props}>
    <StyledItemLink
      href={item.link ? item.link.url : '#'}
      onClick={e => {
        if (!item.link) {
          e.preventDefault();
          if (item.sections) onMenuSelected(item.id);
        }
      }}
    >
      {isMobileMenu ? item.shortName || item.name : item.name}
    </StyledItemLink>
  </StyledItem>
);

export const LeftMenuItemPropType = PropTypes.shape({
  id: PropTypes.number,
  isBottom: PropTypes.bool,
  isWatch: PropTypes.bool,
  item: PropTypes.shape({
    link: PropTypes.shape({
      url: PropTypes.string,
    }),
    shortName: PropTypes.string,
    name: PropTypes.string,
  }),
  sections: PropTypes.arrayOf(PropTypes.object),
});

LeftMenuItem.propTypes = {
  item: LeftMenuItemPropType.isRequired,
  selectedMenuId: PropTypes.number.isRequired,
  onMenuSelected: PropTypes.func.isRequired,
  isMobileMenu: PropTypes.bool.isRequired,
};

export default LeftMenuItem;
