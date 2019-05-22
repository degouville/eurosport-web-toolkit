import styled, { css } from 'react-emotion';
import React from 'react';
import PropTypes from 'prop-types';

import * as breakpoints from '../../breakpoints';
import eurosport from '../icons/eurosport';
import eurosportSmall from '../icons/eurosport.small';

const StyledLogo = styled.div`
  box-sizing: border-box;
  width: 147px;
  height: 17px;

  ${breakpoints.medium(css`
    width: 213px;
    height: 26px;
  `)};

  ${props =>
    props.small &&
    css`
      width: 20px;
      height: 23px;
    `}
`;

const Logo = ({ small }) => {
  const Element = small ? eurosportSmall : eurosport;
  return (
    <StyledLogo>
      <Element />
    </StyledLogo>
  );
};

Logo.css = StyledLogo;

Logo.defaultProps = {
  small: false,
};

Logo.propTypes = {
  small: PropTypes.bool,
};

export default Logo;
