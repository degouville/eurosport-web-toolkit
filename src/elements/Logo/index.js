import styled, { css } from 'react-emotion';
import React from 'react';
import PropTypes from 'prop-types';

import * as breakpoints from '../../breakpoints';
import eurosport from '../../assets/eurosport.svg';
import eurosportSmall from '../../assets/eurosport.small.svg';

const StyledLogo = styled.img`
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

const Logo = ({ small }) => <StyledLogo src={small ? eurosportSmall : eurosport} alt="Eurosport" />;

Logo.css = StyledLogo;

Logo.defaultProps = {
  small: false,
};

Logo.propTypes = {
  small: PropTypes.bool,
};

export default Logo;
