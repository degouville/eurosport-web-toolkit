import {
  coreLightMinus1,
  featureOneMinus2,
  actionTwoDarkBase,
  dodgerBlue2,
  actionTwoLightBase,
  melanzane,
  coreLightBase,
} from './colors';
import { fontInterUi } from './typography';

export default {
  link: {
    color: featureOneMinus2,
  },
  button: {
    primary: {
      color: coreLightMinus1,
      backgroundColor: actionTwoDarkBase,
    },
    secondary: {
      color: featureOneMinus2,
    },
    form: {
      color: coreLightMinus1,
      backgroundColor: dodgerBlue2,
    },
  },
  banner: {
    error: {
      borderColor: actionTwoLightBase,
      backgroundColor: melanzane,
      textColor: coreLightBase,
      fontFamily: fontInterUi,
    },
  },
};
