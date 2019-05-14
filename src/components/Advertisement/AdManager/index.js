import customEventPolyfill from '../AdInit/utilities/customEventPolyfill';
import createEvent from './createEvent';
import defaultSlotsConfig from './defaultSlotsConfig';
import * as events from './ad-events';
import * as adTypes from './ad-types';
import * as pageTypes from './page-types';

typeof window !== 'undefined' && customEventPolyfill();

const getGooglePublisherTagInstance = () => {
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];

  return window.googletag;
};

const injectAdSlot = (adSlotType, placementId, isNoMobile, isNoTablet, isNoDesktop) => {
  createEvent(getGooglePublisherTagInstance(), events.INJECT_AD_SLOT, {
    adSlotType,
    placementId,
    isNoMobile,
    isNoTablet,
    isNoDesktop,
  });
};

const refreshAdSlot = slotId => {
  createEvent(getGooglePublisherTagInstance(), events.REFRESH_AD_SLOT, { slotId });
};

const registerInjectAdEvent = cb => {
  window.addEventListener(events.INJECT_AD_SLOT, cb);
};

const registerRefreshAdEvent = cb => {
  window.addEventListener(events.REFRESH_AD_SLOT, cb);
};

export default {
  enums: {
    adTypes,
    pageTypes,
    events,
  },
  registerEvents: {
    injectAd: registerInjectAdEvent,
    refreshAd: registerRefreshAdEvent,
  },
  manageAds: {
    injectAdSlot,
    refreshAdSlot,
  },

  googlePublisherTag: {
    getInstance: getGooglePublisherTagInstance,
  },
  defaultSlotsConfig,
};
