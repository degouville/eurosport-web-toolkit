import { transparentize, rgba } from 'polished';
import {
  plausibleViolet,
  crashingAmber,
  coreLightMinus1,
  significantAzure,
  featureOneMinus2,
  actionTwoDarkBase,
  coreDarkPlus1,
  coreNeutral2,
  coreNeutral4,
  coreNeutral8,
  coreLightBase,
  dodgerBlue2,
  actionTwoLightBase,
  melanzane,
  coreDarkBase,
  hydroelectricTar,
  coreNeutral6,
  coreNeutral1,
  actionOneDarkMinus1,
  actionOneDarkBase,
  ebonyClay,
  martinique,
  suitGray,
  blackPearl,
} from './colors';
import { fontAlphaHeadline, fontInterUi } from './typography';

export default {
  underlineLink: {
    fontFamily: fontInterUi,
    color: coreNeutral4,
    hoverColor: coreNeutral2,
  },
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
  login: {
    separator: {
      primary: coreLightBase,
      secondary: coreNeutral8,
    },
    text: {
      color: coreLightBase,
      fontFamily: fontInterUi,
    },
    title: {
      color: coreLightMinus1,
      fontFamily: fontAlphaHeadline,
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
  tab: {
    active: {
      color: coreLightMinus1,
      borderColor: featureOneMinus2,
    },
    borderColor: transparentize(0.5, coreLightMinus1),
  },
  typo: {
    primary: {
      color: coreLightMinus1,
    },
  },
  playerControls: {
    dropdown: {
      background: transparentize(0.1, coreDarkBase),
      border: transparentize(0.2, coreNeutral6),
    },
    seek: {
      trackColor: dodgerBlue2,
      handleSize: 20,
      handleColor: coreLightBase,
      railColor: rgba(coreNeutral1, 0.3),
      railThickness: 5,
      vertical: false,
    },
    volume: {
      trackColor: dodgerBlue2,
      handleSize: 20,
      handleColor: coreLightBase,
      railColor: rgba(coreNeutral1, 0.3),
      railThickness: 5,
      vertical: true,
    },
    bar: {
      backgroundColor: transparentize(0.4, coreDarkBase),
    },
    separator: transparentize(0.5, coreNeutral4),
    liveIcon: {
      fontFamily: fontAlphaHeadline,
      backgroundColor: actionTwoDarkBase,
      color: coreLightBase,
    },
    text: {
      fontFamily: fontAlphaHeadline,
      color: coreLightBase,
    },
  },
  dropdown: {
    label: {
      color: coreLightMinus1,
    },
    list: {
      default: {
        color: coreNeutral2,
      },
      selected: {
        color: coreLightMinus1,
      },
    },
    checkMark: {
      color: significantAzure,
    },
    background: hydroelectricTar,
    border: transparentize(0.2, coreNeutral6),
  },
  scrollbar: {
    color: plausibleViolet,
    background: crashingAmber,
  },
  statistics: {
    comparison: {
      colorOne: actionOneDarkMinus1,
      colorTwo: actionOneDarkBase,
      background: rgba(coreLightMinus1, 0.1),
    },
    background: {
      one: ebonyClay,
      two: martinique,
    },
    fringe: rgba(coreLightMinus1, 0.05),
  },
  marketingChecklist: {
    title: {
      color: coreLightMinus1,
    },
    subtitle: {
      color: suitGray,
    },
    check: {
      color: coreLightMinus1,
    },
  },
  videoPlayerModal: {
    closeIcon: {
      fill: coreLightMinus1,
    },
  },
  loginWithMarketing: {
    mobileBackground: blackPearl,
  },
};
