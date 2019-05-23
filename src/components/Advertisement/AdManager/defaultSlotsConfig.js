import * as adTypes from './ad-types';
import { RESULT, ARTICLE, LIVESTREAM, VIDEO, HP_SECTION, HP_MAIN, LIVE, OTHER } from './page-types';

const getSizes = (desktop, tablet, mobile) => ({
  desktop,
  'tablet-web': tablet,
  'mobile-web': mobile,
});

const multiple = (creative, times) => ({
  custom: creative,
  count: times,
});

const buildBannerObj = (...args) => {
  const banner = {};

  args.forEach(creativeObj => {
    let creative = creativeObj;

    let count = 1;

    if (creativeObj.custom) {
      creative = creativeObj.custom;
      // eslint-disable-next-line prefer-destructuring
      count = creativeObj.count;
    }

    if (banner[creative.name]) return;

    banner[creative.name] = {
      creative,
      count,
    };
  });

  return banner;
};

const creatives = {
  BANNER: {
    name: adTypes.BANNER,
    sizes: getSizes(null, null, [320, 50]),
  },

  BANNER_SPONSORSHIP: {
    name: adTypes.BANNER_SPONSORSHIP,
    sizes: getSizes([[970, 250], [970, 90], [728, 90]], [728, 90], [320, 50]),
  },

  MPU: {
    name: adTypes.MPU,
    sizes: getSizes([[300, 250], 'fluid'], [[300, 250], 'fluid'], [[300, 250], 'fluid']),
  },

  BETTING_BOX: {
    name: adTypes.BETTING_BOX,
    sizes: getSizes([[300, 170], 'fluid'], [[300, 170], 'fluid'], null),
  },

  INTERSTITIAL: {
    name: adTypes.INTERSTITIEL,
    sizes: getSizes(['out-of-page'], ['out-of-page'], ['out-of-page']),
  },

  OUTSTREAM: {
    name: adTypes.OUTSTREAM,
    sizes: getSizes([[1, 1], 'fluid'], [[1, 1], 'fluid'], [[1, 1], 'fluid']),
  },
};

const config = {
  desktop: {
    [HP_MAIN]: buildBannerObj(
      creatives.BANNER_SPONSORSHIP,
      multiple(creatives.MPU, 3),
      creatives.BETTING_BOX,
      creatives.INTERSTITIAL
    ),
    [HP_SECTION]: buildBannerObj(
      creatives.BANNER_SPONSORSHIP,
      multiple(creatives.MPU, 3),
      creatives.BETTING_BOX,
      creatives.INTERSTITIAL
    ),
    [VIDEO]: buildBannerObj(creatives.BANNER_SPONSORSHIP, creatives.MPU, creatives.BETTING_BOX, creatives.INTERSTITIAL),
    [LIVESTREAM]: buildBannerObj(creatives.BANNER_SPONSORSHIP, creatives.MPU, creatives.INTERSTITIAL),
    [ARTICLE]: buildBannerObj(
      creatives.BANNER_SPONSORSHIP,
      creatives.MPU,
      creatives.BETTING_BOX,
      creatives.INTERSTITIAL,
      creatives.OUTSTREAM
    ),
    [LIVE]: buildBannerObj(
      creatives.BANNER_SPONSORSHIP,
      multiple(creatives.MPU, 5),
      creatives.BETTING_BOX,
      creatives.INTERSTITIAL,
      multiple(creatives.OUTSTREAM, 10)
    ),
    [RESULT]: buildBannerObj(
      creatives.BANNER_SPONSORSHIP,
      creatives.MPU,
      creatives.BETTING_BOX,
      creatives.INTERSTITIAL
    ),
    [OTHER]: buildBannerObj(creatives.BANNER_SPONSORSHIP, creatives.MPU, creatives.BETTING_BOX, creatives.INTERSTITIAL),
  },
  'tablet-web': {
    [HP_MAIN]: buildBannerObj(
      creatives.BANNER_SPONSORSHIP,
      multiple(creatives.MPU, 3),
      creatives.BETTING_BOX,
      creatives.INTERSTITIAL
    ),
    [HP_SECTION]: buildBannerObj(
      creatives.BANNER_SPONSORSHIP,
      multiple(creatives.MPU, 3),
      creatives.BETTING_BOX,
      creatives.INTERSTITIAL
    ),
    [VIDEO]: buildBannerObj(creatives.BANNER_SPONSORSHIP, creatives.MPU, creatives.BETTING_BOX, creatives.INTERSTITIAL),
    [LIVESTREAM]: buildBannerObj(creatives.BANNER_SPONSORSHIP, creatives.MPU, creatives.INTERSTITIAL),
    [ARTICLE]: buildBannerObj(
      creatives.BANNER_SPONSORSHIP,
      creatives.MPU,
      creatives.BETTING_BOX,
      creatives.INTERSTITIAL,
      creatives.OUTSTREAM
    ),
    [LIVE]: buildBannerObj(
      creatives.BANNER_SPONSORSHIP,
      multiple(creatives.MPU, 5),
      creatives.BETTING_BOX,
      creatives.INTERSTITIAL,
      multiple(creatives.OUTSTREAM, 10)
    ),
    [RESULT]: buildBannerObj(creatives.BANNER_SPONSORSHIP, creatives.MPU, creatives.INTERSTITIAL),
    [OTHER]: buildBannerObj(creatives.BANNER_SPONSORSHIP, creatives.MPU, creatives.INTERSTITIAL),
  },
  'mobile-web': {
    [HP_MAIN]: buildBannerObj(
      creatives.BANNER_SPONSORSHIP,
      multiple(creatives.BANNER, 3),
      multiple(creatives.MPU, 3),
      creatives.INTERSTITIAL
    ),
    [HP_SECTION]: buildBannerObj(
      creatives.BANNER_SPONSORSHIP,
      multiple(creatives.BANNER, 3),
      multiple(creatives.MPU, 3),
      creatives.INTERSTITIAL
    ),
    [VIDEO]: buildBannerObj(creatives.BANNER_SPONSORSHIP, creatives.MPU, creatives.INTERSTITIAL),
    [LIVESTREAM]: buildBannerObj(creatives.BANNER_SPONSORSHIP, creatives.MPU, creatives.INTERSTITIAL),
    [ARTICLE]: buildBannerObj(creatives.BANNER_SPONSORSHIP, creatives.MPU, creatives.INTERSTITIAL, creatives.OUTSTREAM),
    [LIVE]: buildBannerObj(
      creatives.BANNER_SPONSORSHIP,
      multiple(creatives.BANNER, 10),
      multiple(creatives.MPU, 5),
      creatives.INTERSTITIAL,
      multiple(creatives.OUTSTREAM, 10)
    ),
    [RESULT]: buildBannerObj(creatives.BANNER_SPONSORSHIP, creatives.BANNER, creatives.INTERSTITIAL),
    [OTHER]: buildBannerObj(creatives.BANNER_SPONSORSHIP, creatives.BANNER, creatives.INTERSTITIAL),
  },
};

export default config;
