import { transparentize, rgba } from 'polished';
import {
  dodgerBlue,
  mako,
  white,
  malibu,
  monza,
  ebony,
  frenchGray,
  manatee,
  gunPowder,
  comet,
  athensGray,
  plausibleViolet,
  torchRed,
  melanzane,
  mirage,
  stormGray,
  iron,
  ebonyClay,
  martinique,
  suitGray,
  blackPearl,
  utahCrimson,
} from './colors';
import { fontAlphaHeadline, fontInterUi } from './typography';

export default {
  underlineLink: {
    fontFamily: fontInterUi,
    color: manatee,
    hoverColor: frenchGray,
  },
  link: {
    color: malibu,
  },
  button: {
    primary: {
      color: white,
      backgroundColor: utahCrimson,
    },
    secondary: {
      color: malibu,
    },
    form: {
      color: white,
      backgroundColor: dodgerBlue,
    },
    secondaryForm: {
      color: white,
      backgroundColor: martinique,
    },
  },
  input: {
    backgroundColor: ebony,
    borderFocused: manatee,
    border: gunPowder,
    placeholder: {
      color: manatee,
      fontFamily: fontInterUi,
    },
    text: {
      color: athensGray,
      fontFamily: fontInterUi,
    },
  },
  login: {
    separator: {
      primary: athensGray,
      secondary: gunPowder,
    },
    text: {
      color: athensGray,
      fontFamily: fontInterUi,
    },
    title: {
      color: white,
      fontFamily: fontAlphaHeadline,
    },
  },
  banner: {
    error: {
      borderColor: torchRed,
      backgroundColor: melanzane,
      textColor: athensGray,
      fontFamily: fontInterUi,
    },
  },
  tab: {
    active: {
      color: white,
      borderColor: malibu,
    },
    borderColor: transparentize(0.5, white),
  },
  typo: {
    primary: {
      color: white,
    },
  },
  playerControls: {
    dropdown: {
      background: transparentize(0.1, mirage),
      border: transparentize(0.2, stormGray),
    },
    seek: {
      trackColor: dodgerBlue,
      handleSize: 20,
      handleColor: athensGray,
      railColor: rgba(iron, 0.3),
      railThickness: 5,
      vertical: false,
    },
    volume: {
      trackColor: dodgerBlue,
      handleSize: 20,
      handleColor: athensGray,
      railColor: rgba(iron, 0.3),
      railThickness: 5,
      vertical: true,
    },
    bar: {
      backgroundColor: transparentize(0.4, mirage),
    },
    separator: transparentize(0.5, manatee),
    liveIcon: {
      fontFamily: fontAlphaHeadline,
      backgroundColor: monza,
      color: athensGray,
    },
    text: {
      fontFamily: fontAlphaHeadline,
      color: athensGray,
    },
  },
  dropdown: {
    label: {
      color: white,
    },
    list: {
      default: {
        color: frenchGray,
      },
      selected: {
        color: white,
      },
    },
    checkMark: {
      color: plausibleViolet,
    },
    background: mirage,
    border: transparentize(0.2, stormGray),
  },
  scrollbar: {
    color: plausibleViolet,
    background: mako,
  },
  statistics: {
    comparison: {
      colorOne: malibu,
      colorTwo: dodgerBlue,
      background: rgba(white, 0.1),
    },
    background: {
      one: ebonyClay,
      two: martinique,
    },
    fringe: rgba(white, 0.05),
  },
  marketingChecklist: {
    title: {
      color: white,
    },
    subtitle: {
      color: suitGray,
    },
    check: {
      color: white,
    },
  },
  videoPlayerModal: {
    closeIcon: {
      fill: white,
    },
  },
  loginWithMarketing: {
    mobileBackground: blackPearl,
  },
  shareIcons: {
    color: comet,
    background: white,
  },
};
