import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import { white } from '../../colors';
import { medium } from '../../breakpoints';

const StyledBurger = styled.a`
  outline: none;
  display: inline-block;
  position: relative;
  overflow: hidden;
  padding: 0;
  width: 20px;
  height: 14px;
  font-size: 0;
  box-shadow: none;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  background-color: transparent;
  vertical-align: middle;
  margin: 2px 12px 0 16px;

  ${medium(`
    width: 27px;
    height: 26px;
    margin: 0 2px 0 27px ;
  `)};
`;

const StyledBurgerIcon = styled.div`
  display: block;
  position: absolute;
  top: 6px;
  left: 0;
  right: 0;
  height: 2px;
  background: ${white};
  border-radius: 3px;
  &:before,
  &:after {
    position: absolute;
    display: block;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${white};
    border-radius: 3px;
    content: '';
  }
  &:before {
    top: -5px;
  }
  &:after {
    bottom: -5px;
  }

  ${medium(`
    top: 11px;
    height: 4px;
    border-radius: 2px;
    &:before,
    &:after {
      height: 4px;
      border-radius: 2px;
    }
    &:before {
      top: -8px;
    }
    &:after {
      bottom: -8px;
    }
  `)};
`;

const BurgerIcon = ({ onClick }) => (
  <StyledBurger data-test="burger-menu" onClick={onClick}>
    <StyledBurgerIcon />
  </StyledBurger>
);

BurgerIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BurgerIcon;
