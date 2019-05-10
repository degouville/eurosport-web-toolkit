import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, object, boolean, number } from '@storybook/addon-knobs';
import { AdInit, AdManager, AdPlacement, Button } from '../..';
import withReload from '../../hocs/withReload';
import { HP_MAIN } from './AdManager/page-types';
import { MPU } from './AdManager/ad-types';

const AdWithReload = withReload(AdPlacement);

const indexStories = storiesOf('Components|Advertisement', module).addParameters({
  backgrounds: { disable: true },
});

AdManager.defaultSlotsConfig.desktop[HP_MAIN][MPU].count = 6;

indexStories.add('ADS integration', () => (
  <>
    <Button type="primary" onClick={() => AdManager.manageAds.refreshAdSlot(document.querySelector('.ad').id)}>
      refresh 1st desktop MPU AD
    </Button>
    <AdInit
      domain="fr"
      pageType={select('pageType', Object.values(AdManager.enums.pageTypes), AdManager.enums.pageTypes.HP_MAIN)}
      personalizeAds={boolean('personalizeAds', false)}
      advertisementSlotId={number('advertisementSlotId', 21725585473)}
      slotsConfig={object('slotsConfig', AdManager.defaultSlotsConfig)}
      keyValues={object('keyValues', { sport: 57 })}
    />
    <p>desktop ads:</p>
    1: <AdPlacement adType={AdManager.enums.adTypes.MPU} isNoMobile isNoTablet />
    2: <AdPlacement adType={AdManager.enums.adTypes.MPU} isNoMobile isNoTablet />
    3: <AdPlacement adType={AdManager.enums.adTypes.MPU} isNoMobile isNoTablet />
    <p>reloaded ads: </p>
    1:
    <AdWithReload
      adType={AdManager.enums.adTypes.MPU}
      refreshHandler={AdManager.manageAds.refreshAdSlot}
      reloadInterval={10000}
      isNoMobile
      isNoTablet
    />
    2:
    <AdWithReload
      adType={AdManager.enums.adTypes.MPU}
      refreshHandler={AdManager.manageAds.refreshAdSlot}
      reloadInterval={10000}
      isNoMobile
      isNoTablet
    />
    3:
    <AdWithReload
      adType={AdManager.enums.adTypes.MPU}
      refreshHandler={AdManager.manageAds.refreshAdSlot}
      reloadInterval={10000}
      isNoMobile
      isNoTablet
    />
    extra desktop ad - out of homepage config: 4:
    <AdPlacement adType={AdManager.enums.adTypes.MPU} isNoMobile isNoTablet />
    <br />
    <p>mobile ads:</p>
    1: <AdPlacement adType={AdManager.enums.adTypes.MPU} isNoDesktop isNoTablet />
    2: <AdPlacement adType={AdManager.enums.adTypes.MPU} isNoDesktop isNoTablet />
    3: <AdPlacement adType={AdManager.enums.adTypes.MPU} isNoDesktop isNoTablet />
    extra tablet ad - out of page slot configs 4:
    <AdPlacement adType={AdManager.enums.adTypes.MPU} isNoDesktop isNoTablet />
    <br />
    <p>tablet ads:</p>
    1: <AdPlacement adType={AdManager.enums.adTypes.MPU} isNoMobile isNoDesktop />
    2: <AdPlacement adType={AdManager.enums.adTypes.MPU} isNoMobile isNoDesktop />
    3: <AdPlacement adType={AdManager.enums.adTypes.MPU} isNoMobile isNoDesktop />
    extra tablet ad - out of page slot configs 4:
    <AdPlacement adType={AdManager.enums.adTypes.MPU} isNoMobile isNoDesktop />
  </>
));
