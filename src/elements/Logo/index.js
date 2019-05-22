import styled, { css } from 'react-emotion';
import React from 'react';
import PropTypes from 'prop-types';

import * as breakpoints from '../../breakpoints';
import Eurosport from '../icons/eurosport';
import EurosportSmall from '../icons/eurosport.small';

const StyledSmallLogo = styled(EurosportSmall)`
  box-sizing: border-box;
  width: 20px;
  height: 23px;
`;

const StyledLogo = styled(Eurosport)`
  box-sizing: border-box;
  width: 147px;
  height: 17px;

  ${breakpoints.medium(css`
    width: 213px;
    height: 26px;
  `)};
`;

// eslint-disable-next-line react/prop-types
const Logo = ({ small, className }) =>
  small ? <StyledSmallLogo className={className} /> : <StyledLogo className={className} />;

Logo.defaultProps = {
  small: false,
};

Logo.propTypes = {
  small: PropTypes.bool,
};

export default Logo;
