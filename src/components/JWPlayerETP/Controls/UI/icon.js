import styled from 'react-emotion';
import * as breakpoints from 'src/breakpoints';

const Icon = styled.img`
  height: 26px;
  width: 26px;
  ${breakpoints.small(`
  height: 36px;
  width: 36px;
  `)};
  user-select: none;
`;

export default Icon;
