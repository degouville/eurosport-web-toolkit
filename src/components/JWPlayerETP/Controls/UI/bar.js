import { css } from 'emotion';
import * as breakpoints from 'src/breakpoints';

const BarContainer = css`
  height: 45px;
  ${breakpoints.small(`
    height: 72px;
  `)};

  width: 100%;
  display: flex;
`;

export default BarContainer;
