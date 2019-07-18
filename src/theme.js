import {
  coreLightMinus1,
  featureOneMinus2,
  actionTwoDarkBase,
  coreDarkPlus1,
  coreNeutral4,
  coreNeutral8,
  coreLightBase,
  dodgerBlue2,
  actionTwoLightBase,
  melanzane,
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
  input: {
    backgroundColor: coreDarkPlus1,
    borderFocused: coreNeutral4,
    border: coreNeutral8,
    placeholder: {
      color: coreNeutral4,
      fontFamily: fontInterUi,
    },
    text: {
      color: coreLightBase,
      fontFamily: fontInterUi,
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
