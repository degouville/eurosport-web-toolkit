import React from 'react';
import PropTypes from 'prop-types';
import ScriptInjector from '../../ScriptInjector';
import getDevice from './utilities/getDevice';
import defineAllSlots from './utilities/defineAllSlots';
import getAdSlotParams from './utilities/getAdSlotParams';
import initKeyValues from './utilities/initKeyValues';
import AdManager from '../AdManager';

class AdInit extends React.Component {
  constructor(props) {
    super(props);
    this.gptInstance = null;
    this.device = null;
    this.availableSlots = null;
    this.adUnitPath = null;
    this.slotsConfigPerDevice = null;
    this.availableSlotsPerCreativeInjection = null;
  }

  componentDidMount() {
    this.createAdSlots();
    AdManager.registerEvents.injectAd(({ detail }) => this.handleInjectAd(detail));
    AdManager.registerEvents.refreshAd(({ detail }) => this.handleAdRefresh(detail));
  }

  handleAdRefresh = ({ slotId }) => {
    this.refreshSlot(slotId);
  };

  handleInjectAd = ({ adSlotType, placementId, isNoMobile, isNoTablet, isNoDesktop }) => {
    const adConfig = this.availableSlotsPerCreativeInjection[adSlotType] || null;

    let slotId;

    if (adConfig === null) return;

    if (
      (isNoMobile && this.device === 'mobile-web') ||
      (isNoTablet && this.device === 'tablet-web') ||
      (isNoDesktop && this.device === 'desktop')
    )
      return;

    const buildAdSlotId = (slotType, advertisementConfig, device) => {
      const slotIndex = `${advertisementConfig.totalCount > 1 ? `-${advertisementConfig.currentCount}` : ''}-${
        device[0]
      }`;

      return `ad-${adSlotType}${slotIndex}`;
    };

    if (adConfig.currentCount > adConfig.totalCount) {
      for (let i = 0; i < adConfig.totalCount; i += 1) {
        const adSlotId = buildAdSlotId(adSlotType, adConfig, this.device);
        if (document.getElementById(adSlotId) === null) {
          slotId = adSlotId;
          break;
        }
      }

      if (slotId) {
        this.initAdPlaceholder({ placementId, slotId, refresh: true });
      }
    } else {
      slotId = buildAdSlotId(adSlotType, adConfig, this.device);
      adConfig.currentCount += 1;

      this.initAdPlaceholder({ placementId, slotId });
    }
  };

  createAdSlots = () => {
    const { domain, pageType, advertisementSlotId, keyValues, personalizeAds, slotsConfig } = this.props;
    const { getInstance } = AdManager.googlePublisherTag;
    const { INTERSTITIEL } = AdManager.enums.adTypes;

    this.device = getDevice();
    this.availableSlots = {};
    this.adUnitPath = `${domain}/${this.device}/${pageType}`;
    this.slotsConfigPerDevice = slotsConfig[this.device][pageType];
    this.availableSlotsPerCreativeInjection = Object.keys(this.slotsConfigPerDevice).reduce((acc, curr) => {
      const entity = this.slotsConfigPerDevice[curr];
      acc[entity.creative.name] = acc[entity.creative.name] || { totalCount: entity.count, currentCount: 1 };
      return acc;
    }, {});

    this.gptInstance = getInstance();

    this.gptInstance.cmd.push(() => {
      const slotParams = getAdSlotParams(this.slotsConfigPerDevice, advertisementSlotId, this.adUnitPath, this.device);
      const slots = defineAllSlots(this.gptInstance, slotParams, AdManager.enums.adTypes.INTERSTITIEL);

      slots.reduce((acc, curr) => {
        acc[curr.key] = acc[curr.key] || curr.slot;
        return acc;
      }, this.availableSlots);

      initKeyValues(this.gptInstance, keyValues);

      if (personalizeAds) {
        this.gptInstance.pubads().setRequestNonPersonalizedAds(1);
      } else {
        this.gptInstance.pubads().setRequestNonPersonalizedAds(0);
      }

      this.gptInstance.pubads().enableLazyLoad({
        fetchMarginPercent: 50,
        renderMarginPercent: 20,
      });
      this.gptInstance.enableServices();

      this.gptInstance.pubads().addEventListener('slotOnload', event => {
        if (event.slot.getSlotElementId().indexOf(INTERSTITIEL) !== -1) {
          document.getElementById(event.slot.getSlotElementId()).style.position = 'static';
        }
      });

      this.gptInstance.pubads().addEventListener('slotRenderEnded', event => {
        const emptyClassName = 'slot-empty';
        const slot = document.getElementById(event.slot.getSlotElementId());
        const slotName = event.slot.getAdUnitPath();

        if (slotName.indexOf(INTERSTITIEL) !== -1) return;

        if (event.isEmpty) {
          slot.style.display = 'none';
          slot.classList.add(emptyClassName);
        } else {
          slot.style.display = '';
          slot.classList.remove(emptyClassName);
        }
      });
    });
  };

  initAdPlaceholder = ({ slotId, refresh, placementId }) => {
    if (!Object.keys(this.availableSlots).includes(slotId)) return;

    const el = document.querySelector(`[data-adplacement-id='${placementId}']`);

    if (el === null) return;

    el.className = el.getAttribute('data-class');
    el.id = slotId;

    if (refresh) {
      this.refreshSlot(slotId);
    } else {
      this.gptInstance.cmd.push(() => {
        this.gptInstance.display(slotId);
      });
    }
  };

  refreshSlot = slotId => {
    const slot = this.availableSlots[slotId];
    if (typeof this.gptInstance.pubads !== 'undefined' && slot) {
      slot.setTargeting('autorefresh', 'on');
      this.gptInstance.pubads().refresh([slot]);
    }
  };

  render() {
    const { src } = this.props;

    return <ScriptInjector isServer={false} src={src} async />;
  }
}

AdInit.defaultProps = {
  src: '//www.googletagservices.com/tag/js/gpt.js',
  advertisementSlotId: -1,
  keyValues: {},
  slotsConfig: AdManager.defaultSlotsConfig,
};

AdInit.propTypes = {
  domain: PropTypes.string.isRequired,
  personalizeAds: PropTypes.bool.isRequired,
  pageType: PropTypes.oneOf(Object.values(AdManager.enums.pageTypes)).isRequired,
  src: PropTypes.string,
  advertisementSlotId: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  keyValues: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  slotsConfig: PropTypes.object,
};

export default AdInit;
