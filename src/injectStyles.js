import { injectGlobal } from 'react-emotion';
import RcSliderStyles from 'rc-slider/assets/index.css';
import globalResetStyles from './globalReset';
import { styles as typographyStyles } from './typography';

export default () => {
  injectGlobal(globalResetStyles);
  injectGlobal(typographyStyles);
  injectGlobal(RcSliderStyles);
};
