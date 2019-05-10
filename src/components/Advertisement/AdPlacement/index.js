import React from 'react';
import PropTypes from 'prop-types';
import AdManager from '../AdManager';

const AdPlacement = React.forwardRef(({ adType, isNoDesktop, isNoTablet, isNoMobile }, ref) => {
  const randomId = `adId${Date.now() + Math.floor(Math.random() * 1000)}`;

  return (
    <div data-adplacement-id={randomId} data-class="ad" ref={ref}>
      {AdManager.manageAds.injectAdSlot(adType, randomId, isNoMobile, isNoTablet, isNoDesktop)}
    </div>
  );
});

AdPlacement.defaultProps = {
  isNoTablet: false,
  isNoDesktop: false,
  isNoMobile: false,
};

AdPlacement.propTypes = {
  adType: PropTypes.oneOf([
    AdManager.enums.adTypes.MPU,
    AdManager.enums.adTypes.BETTING_BOX,
    AdManager.enums.adTypes.INTERSTITIEL,
    AdManager.enums.adTypes.OUTSTREAM,
    AdManager.enums.adTypes.BANNER_SPONSORSHIP,
    AdManager.enums.adTypes.BANNER,
  ]).isRequired,
  isNoTablet: PropTypes.bool,
  isNoDesktop: PropTypes.bool,
  isNoMobile: PropTypes.bool,
};

export default AdPlacement;
