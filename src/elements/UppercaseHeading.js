import React from 'react';
import styled from 'react-emotion';

import Heading from './Heading';
import { regentGray } from '../colors';

const StyledHeading = styled(Heading)`
  text-transform: uppercase;
  color: ${regentGray};
`;

const UppercaseHeading  = (props) => {
  return <StyledHeading {...props}>{props.children}</StyledHeading>
};

export default UppercaseHeading;
