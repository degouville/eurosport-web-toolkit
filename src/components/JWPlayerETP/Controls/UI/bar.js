import { css } from 'emotion';
import * as breakpoints from 'src/breakpoints';
import { BOTTOM_BAR_HEIGHT_DESKTOP, BOTTOM_BAR_HEIGHT_MOBILE } from '../constants';

const BarContainer = css`
  height: ${BOTTOM_BAR_HEIGHT_MOBILE}px;
  ${breakpoints.small(`
    height: ${BOTTOM_BAR_HEIGHT_DESKTOP}px;
  `)};

  width: 100%;
  display: flex;
`;

export default BarContainer;
